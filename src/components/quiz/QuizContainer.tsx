import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { ChevronLeft } from "lucide-react";
import { quizSteps } from "@/lib/quiz-data";
import { supabase } from "@/integrations/supabase/client";
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

  const handleBack = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const handleNext = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const handleAnswer = useCallback((value: string) => {
    setAnswers((prev) => ({ ...prev, [currentStep]: value }));
  }, [currentStep]);

  // Stable external ID for Meta CAPI session tracking
  const externalIdRef = useRef(crypto.randomUUID());

  // Helper to fire Meta Pixel client-side
  const firePixelEvent = useCallback((eventName: string) => {
    if (typeof window.fbq === "function") {
      window.fbq("track", eventName);
      console.log(`Meta Pixel [${eventName}] fired client-side`);
    }
  }, []);

  // Helper to send Meta CAPI events (server-side) + Pixel (client-side)
  const sendMetaEvent = useCallback(async (eventName: string) => {
    // Client-side pixel (for Pixel Helper visibility)
    firePixelEvent(eventName);

    // Server-side CAPI
    try {
      const { error } = await supabase.functions.invoke("send-to-meta-capi", {
        body: {
          event_name: eventName,
          name: answers[2] || "",
          email: answers[3] || "",
          phone: answers[4] || "",
          client_ua: navigator.userAgent,
          external_id: externalIdRef.current,
          answers: {
            "5": answers[5] || "",
            "6": answers[6] || "",
            "7": answers[7] || "",
            "8": answers[8] || "",
            "10": answers[10] || "",
            "11": answers[11] || "",
          },
        },
      });
      if (error) console.error(`Meta CAPI [${eventName}] error:`, error);
      else console.log(`Meta CAPI [${eventName}] sent successfully`);
    } catch (err) {
      console.error(`Failed to send Meta CAPI [${eventName}]:`, err);
    }
  }, [answers, firePixelEvent]);

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

  // Send Lead event after WhatsApp capture (step 5 means step 4 was just completed)
  const sentLeadRef = useRef(false);
  useEffect(() => {
    if (currentStep === 5 && !sentLeadRef.current && answers[4]) {
      sentLeadRef.current = true;
      sendMetaEvent("Lead");
    }
  }, [currentStep, answers, sendMetaEvent]);

  // Send lead to RD Station + CompleteRegistration to Meta at result step (13)
  const sentToRdRef = useRef(false);
  useEffect(() => {
    if (currentStep === 13 && !sentToRdRef.current) {
      sentToRdRef.current = true;

      // RD Station
      supabase.functions.invoke("send-to-rdstation", {
        body: {
          name: answers[2] || "",
          email: answers[3] || "",
          phone: answers[4] || "",
          answers: {
            "5": answers[5] || "",
            "6": answers[6] || "",
            "7": answers[7] || "",
            "8": answers[8] || "",
            "10": answers[10] || "",
            "11": answers[11] || "",
          },
        },
      }).then(({ error }) => {
        if (error) console.error("RD Station send error:", error);
        else console.log("Lead sent to RD Station successfully");
      }).catch((err) => console.error("Failed to send lead to RD Station:", err));

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
      {/* Background image — only visible on step 1 */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700"
        style={{
          backgroundImage: `url(${bgHero})`,
          opacity: currentStep === 1 ? 1 : 0,
        }}
      />
      {/* Dark base for other steps */}
      <div
        className="fixed inset-0 bg-background transition-opacity duration-700"
        style={{ opacity: currentStep === 1 ? 0 : 1 }}
      />

      <QuizSidebar currentStep={currentStep} answeredSteps={answeredSteps} />

      {/* Back button */}
      {currentStep > 1 && (
        <button
          onClick={handleBack}
          className="fixed top-5 left-5 z-50 p-2 text-primary/70 hover:text-primary transition-colors duration-200"
          aria-label="Voltar"
        >
          <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
      )}

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
