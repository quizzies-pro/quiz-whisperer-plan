import { useState, useCallback, useEffect, useRef, useMemo } from "react";

import { quizSteps } from "@/lib/quiz-data";
import { supabase } from "@/integrations/supabase/client";
import { useFbCookies } from "@/hooks/use-fb-cookies";
import QuizSidebar from "./QuizSidebar";
import QuizStepView from "./QuizStepView";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface QuizContainerProps {
  initialStep?: number;
}

const RENDER_WINDOW = 1;

const QuizContainer = ({ initialStep = 1 }: QuizContainerProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const getViewportHeight = () => Math.round(window.visualViewport?.height ?? window.innerHeight);
  const [stepHeight, setStepHeight] = useState(getViewportHeight);
  const stableHeightRef = useRef(getViewportHeight());

  // Keep step height stable on mobile (ignore virtual keyboard shrink)
  useEffect(() => {
    const applyHeight = (height: number) => {
      stableHeightRef.current = height;
      setStepHeight(height);
    };

    const handleResize = () => {
      const nextHeight = getViewportHeight();
      if (nextHeight >= stableHeightRef.current - 60) {
        applyHeight(nextHeight);
      }
    };

    const handleOrientationChange = () => {
      window.setTimeout(() => {
        applyHeight(getViewportHeight());
      }, 250);
    };

    const timeout = window.setTimeout(() => {
      applyHeight(getViewportHeight());
    }, 100);

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);
    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
  }, []);

  const answeredSteps = Object.keys(answers).map(Number);

  const visibleStepIds = useMemo(() => {
    const ids = new Set<number>();
    for (let i = currentStep - RENDER_WINDOW; i <= currentStep + RENDER_WINDOW; i++) {
      if (i >= 1 && i <= quizSteps.length) ids.add(i);
    }
    return ids;
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step < 1 || step > quizSteps.length || isTransitioning) return;
    setIsTransitioning(true);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setTimeout(() => {
      setCurrentStep(step);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  // Stable session ID for lead deduplication + Meta CAPI tracking
  const sessionIdRef = useRef(crypto.randomUUID());
  const externalIdRef = useRef(crypto.randomUUID());

  // Save lead to database + Google Sheets progressively
  // New mapping: name=step4, email=step5, phone=step6, investment=step8
  const saveLead = useCallback((updatedAnswers: Record<number, string>, step: number) => {
    const leadPayload = {
      name: updatedAnswers[4] || "",
      email: updatedAnswers[5] || "",
      phone: updatedAnswers[6] || "",
      current_step: step,
      answers: {
        "3": updatedAnswers[3] || "",  // interesse
        "8": updatedAnswers[8] || "",  // investimento
      },
    };

    // Save to DB
    supabase.functions.invoke("save-lead", {
      body: { session_id: sessionIdRef.current, ...leadPayload },
    }).then(({ error }) => {
      if (error) console.error(`save-lead error (step ${step}):`, error);
    }).catch((err) => console.error(`Failed to save lead (step ${step}):`, err));

    // Sync to Google Sheets (upsert by email)
    if (updatedAnswers[4] || updatedAnswers[5]) {
      supabase.functions.invoke("send-to-google-sheets", {
        body: leadPayload,
      }).then(({ error }) => {
        if (error) console.error(`Google Sheets error (step ${step}):`, error);
      }).catch((err) => console.error(`Failed to sync Sheets (step ${step}):`, err));
    }
  }, []);

  // First-party Meta cookies
  const { fbc, fbp } = useFbCookies();

  // Helper to fire Meta Pixel client-side with event_id for deduplication
  const firePixelEvent = useCallback((eventName: string, eventId: string) => {
    if (typeof window.fbq === "function") {
      window.fbq("track", eventName, {}, { eventID: eventId });
      console.log(`Meta Pixel [${eventName}] fired with eventID: ${eventId}`);
    }
  }, []);

  // Helper to send Meta CAPI events (server-side) + Pixel (client-side)
  const sendMetaEvent = useCallback(async (eventName: string) => {
    const eventId = crypto.randomUUID();
    firePixelEvent(eventName, eventId);
    try {
      const { error } = await supabase.functions.invoke("send-to-meta-capi", {
        body: {
          event_name: eventName,
          event_id: eventId,
          name: answers[4] || "",
          email: answers[5] || "",
          phone: answers[6] || "",
          client_ua: navigator.userAgent,
          external_id: externalIdRef.current,
          fbc: fbc || "",
          fbp: fbp || "",
          answers: {
            "3": answers[3] || "",
            "8": answers[8] || "",
          },
        },
      });
      if (error) console.error(`Meta CAPI [${eventName}] error:`, error);
      else console.log(`Meta CAPI [${eventName}] sent successfully`);
    } catch (err) {
      console.error(`Failed to send Meta CAPI [${eventName}]:`, err);
    }
  }, [answers, firePixelEvent, fbc, fbp]);

  // Send Lead on step 8 (investment selection) — this is when the user becomes a lead
  const sentLeadRef = useRef(false);

  const handleAnswer = useCallback((stepId: number, value: string) => {
    setAnswers((prev) => {
      const updated = { ...prev, [stepId]: value };

      // Save lead to DB on every answer (progressive upsert)
      saveLead(updated, stepId);

      // Send Lead event + RD Station + Google Sheets on step 8 (investment)
      if (stepId === 8 && !sentLeadRef.current) {
        sentLeadRef.current = true;
        sendMetaEvent("Lead");

        // Send to RD Station
        supabase.functions.invoke("send-to-rdstation", {
          body: {
            name: updated[4] || "",
            email: updated[5] || "",
            phone: updated[6] || "",
            answers: {
              "3": updated[3] || "",
              "8": updated[8] || "",
            },
          },
        }).then(({ error }) => {
          if (error) console.error("RD Station send error:", error);
        }).catch((err) => console.error("Failed to send lead to RD Station:", err));
      }

      return updated;
    });
  }, [sendMetaEvent, saveLead]);

  // Send PageView on initial load
  const sentPageViewRef = useRef(false);
  useEffect(() => {
    if (!sentPageViewRef.current) {
      sentPageViewRef.current = true;
      sendMetaEvent("PageView");
    }
  }, [sendMetaEvent]);

  // Send ViewContent on each step change (except step 1 which gets PageView)
  const lastTrackedStepRef = useRef(initialStep);
  useEffect(() => {
    if (currentStep !== lastTrackedStepRef.current && currentStep > 1) {
      lastTrackedStepRef.current = currentStep;
      sendMetaEvent("ViewContent");
    }
  }, [currentStep, sendMetaEvent]);

  // CompleteRegistration at result step (9)
  const sentCompleteRef = useRef(false);
  useEffect(() => {
    if (currentStep === 9 && !sentCompleteRef.current && answers[4] && answers[5]) {
      sentCompleteRef.current = true;
      sendMetaEvent("CompleteRegistration");
    }
  }, [currentStep, answers, sendMetaEvent]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const step = quizSteps.find((s) => s.id === currentStep);
        if (!step) return;
        if (step.type === "text") return;
        if (step.type === "vsl" || step.type === "welcome" || answers[currentStep]) {
          handleNext();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, answers, handleNext]);

  return (
    <div className="relative overflow-hidden" style={{ height: `${stepHeight}px` }}>
      {/* Dark base */}
      <div className="fixed inset-0 bg-background" />

      {/* Static quiz background — visible from step 2 onwards */}
      {currentStep >= 2 && (
        <>
          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none hidden sm:block z-[1]"
            style={{ backgroundImage: `url(https://res.cloudinary.com/dqsuj0pjy/image/upload/v1774313034/bg2bfoca_bin3ti.webp)` }}
          />
          <div
            className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none sm:hidden z-[1]"
            style={{ backgroundImage: `url(https://res.cloudinary.com/dqsuj0pjy/image/upload/v1774317562/Capa_para_Reels_Instagram_Minimalista_Simples_Cores_Neutras_1080_x_1921_px_nmdvaa.png)` }}
          />
        </>
      )}
      <QuizSidebar currentStep={currentStep} answeredSteps={answeredSteps} />

      <div className="relative z-10 h-full w-full overflow-hidden">
        <div
          className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateY(-${(currentStep - 1) * stepHeight}px)` }}
        >
          {quizSteps.map((step) => (
            <div key={step.id} style={{ height: `${stepHeight}px`, width: "100%", overflow: "hidden" }}>
              {visibleStepIds.has(step.id) ? (
                <QuizStepView
                  step={step}
                  answer={answers[step.id]}
                  answers={answers}
                  onAnswer={(value: string) => handleAnswer(step.id, value)}
                  onNext={handleNext}
                  isFirst={step.id === 1}
                  isLast={step.id === quizSteps.length}
                  isActive={step.id === currentStep}
                />
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
