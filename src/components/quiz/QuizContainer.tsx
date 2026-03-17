import { useState, useCallback, useEffect, useRef, useMemo } from "react";

import { quizSteps } from "@/lib/quiz-data";
import { supabase } from "@/integrations/supabase/client";
import { useFbCookies } from "@/hooks/use-fb-cookies";
import QuizSidebar from "./QuizSidebar";
import QuizStepView from "./QuizStepView";
import bgHero from "@/assets/bg-hero.jpg";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface QuizContainerProps {
  initialStep?: number;
}

const RENDER_WINDOW = 1; // Render current ± 1 steps

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

  // Determine which steps to render (current ± RENDER_WINDOW)
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
  const saveLead = useCallback((updatedAnswers: Record<number, string>, step: number) => {
    const leadPayload = {
      name: updatedAnswers[2] || "",
      email: updatedAnswers[3] || "",
      phone: updatedAnswers[4] || "",
      current_step: step,
      answers: {
        "5": updatedAnswers[5] || "",
        "6": updatedAnswers[6] || "",
        "7": updatedAnswers[7] || "",
        "9": updatedAnswers[9] || "",
      },
    };

    // Save to DB
    supabase.functions.invoke("save-lead", {
      body: { session_id: sessionIdRef.current, ...leadPayload },
    }).then(({ error }) => {
      if (error) console.error(`save-lead error (step ${step}):`, error);
    }).catch((err) => console.error(`Failed to save lead (step ${step}):`, err));

    // Sync to Google Sheets (upsert by email)
    if (updatedAnswers[2] || updatedAnswers[3]) {
      supabase.functions.invoke("send-to-google-sheets", {
        body: leadPayload,
      }).then(({ error }) => {
        if (error) console.error(`Google Sheets error (step ${step}):`, error);
      }).catch((err) => console.error(`Failed to sync Sheets (step ${step}):`, err));
    }
  }, []);

  // First-party Meta cookies (generated manually if Pixel didn't create them)
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
          name: answers[2] || "",
          email: answers[3] || "",
          phone: answers[4] || "",
          client_ua: navigator.userAgent,
          external_id: externalIdRef.current,
          fbc: fbc || "",
          fbp: fbp || "",
          answers: {
            "5": answers[5] || "",
            "6": answers[6] || "",
            "7": answers[7] || "",
            "9": answers[9] || "",
          },
        },
      });
      if (error) console.error(`Meta CAPI [${eventName}] error:`, error);
      else console.log(`Meta CAPI [${eventName}] sent successfully`);
    } catch (err) {
      console.error(`Failed to send Meta CAPI [${eventName}]:`, err);
    }
  }, [answers, firePixelEvent, fbc, fbp]);

  // Send Lead to RD Station immediately when user submits WhatsApp (step 4 click)
  const sentLeadRef = useRef(false);

  const handleAnswer = useCallback((value: string) => {
    setAnswers((prev) => {
      const updated = { ...prev, [currentStep]: value };

      // Save lead to DB on every answer (progressive upsert)
      saveLead(updated, currentStep);

      // Send to RD Station + Meta Lead event on step 4 (WhatsApp)
      if (currentStep === 4 && !sentLeadRef.current) {
        sentLeadRef.current = true;
        sendMetaEvent("Lead");

        supabase.functions.invoke("send-to-rdstation", {
          body: {
            name: updated[2] || "",
            email: updated[3] || "",
            phone: updated[4] || "",
            answers: { "5": "", "6": "", "7": "", "9": "" },
          },
        }).then(({ error }) => {
          if (error) console.error("RD Station early send error:", error);
        }).catch((err) => console.error("Failed to send early lead to RD Station:", err));
      }

      return updated;
    });
  }, [currentStep, sendMetaEvent, saveLead]);

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


  // Update lead on RD Station with complete answers + CompleteRegistration to Meta at result step (11)
  const sentToRdRef = useRef(false);
  useEffect(() => {
    if (currentStep === 11 && !sentToRdRef.current && answers[2] && answers[3]) {
      sentToRdRef.current = true;

      const leadPayload = {
        name: answers[2] || "",
        email: answers[3] || "",
        phone: answers[4] || "",
        answers: {
          "5": answers[5] || "",
          "6": answers[6] || "",
          "7": answers[7] || "",
          "9": answers[9] || "",
        },
      };

      // RD Station - update with complete quiz answers
      supabase.functions.invoke("send-to-rdstation", {
        body: leadPayload,
      }).then(({ error }) => {
        if (error) console.error("RD Station update error:", error);
      }).catch((err) => console.error("Failed to update lead on RD Station:", err));

      // Meta CAPI - CompleteRegistration
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
      {/* Dark base — always present */}
      <div className="fixed inset-0 bg-background" />


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
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  isFirst={step.id === 1}
                  isLast={step.id === quizSteps.length}
                  isActive={step.id === currentStep}
                />
              ) : (
                // Empty placeholder — same height, no content rendered
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
