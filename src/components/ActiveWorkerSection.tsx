"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
  avatar?: string;
}

interface SlideData {
  title: string;
  description: string;
  statusText: string;
  statusColor: string;
  textColor: string;
  image: string;
}

const SLIDES: SlideData[] = [
  {
    title: "Always On. Always Replying",
    description:
      "Your AI stays active even when your team is offline, replying instantly to customer questions and capturing leads automatically.",
    statusText: "24/7 Active Digital Worker",
    statusColor: "bg-[#98E891]",
    textColor: "text-neutral-black",
    image: "/ActiveWorkerSection/active-digital-worker.avif",
  },
  {
    title: "Every Conversation Becomes an Opportunity.",
    description:
      "Aioncy automatically captures lead information, customer intent, and inquiries without missing a single conversation.",
    statusText: "Lead Capture That Never Sleeps",
    statusColor: "bg-[#A153FF]",
    textColor: "text-white",
    image: "/ActiveWorkerSection/lead-capture.avif",
  },
  {
    title: "Answers in Seconds, Not Hours.",
    description:
      "From pricing to services, your AI responds instantly with accurate business information across every channel.",
    statusText: "Instant FAQ & Product Replies",
    statusColor: "bg-[#98E891]",
    textColor: "text-neutral-black",
    image: "/ActiveWorkerSection/zero-delay-support.avif",
  },
  {
    title: "AI When Possible. Human When Necessary.",
    description:
      "When conversations become complex or customers request support, Aioncy smoothly transfers chats to your team.",
    statusText: "Human Handover When Needed",
    statusColor: "bg-[#A153FF]",
    textColor: "text-white",
    image: "/ActiveWorkerSection/autopilot-scheduler.avif",
  },
  {
    title: "Turn Website Visitors Into Appointments.",
    description:
      "Your website AI widget can qualify leads, collect details, and even schedule bookings automatically.",
    statusText: "Smart Booking Assistant",
    statusColor: "bg-[#98E891]",
    textColor: "text-neutral-black",
    image: "/ActiveWorkerSection/brand-personality.avif",
  },
  {
    title: "Everything In One Intelligent Workspace.",
    description:
      "Monitor conversations, leads, tickets, and AI performance from a single clean dashboard built for modern businesses.",
    statusText: "Unified Inbox",
    statusColor: "bg-[#A153FF]",
    textColor: "text-white",
    image: "/ActiveWorkerSection/extra-slide.avif",
  },
];

const SLIDE_COUNT = SLIDES.length;
// 100vh pinned panel + (n-1) viewport-heights of scroll to advance slides
const RUNWAY_VH = 100 + (SLIDE_COUNT - 1) * 50;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function SlidePhone({ slide }: { slide: SlideData }) {
  return (
    <div className="w-full flex-shrink-0 flex flex-col items-center justify-center mb-20 lg:mb-0">
      <div className="w-full max-w-[300px] lg:max-w-none lg:w-[350px] h-[506px] lg:h-[592px] rounded-[18px] border-[#0A0A0C] bg-[#0A0A0C] overflow-hidden relative flex flex-col">
        <div className="flex-1 relative flex flex-col justify-end overflow-hidden">
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover rounded-[4px]"
            />
          </div>
        </div>
      </div>

      <div
        className={`w-full max-w-[300px] lg:max-w-none lg:w-[350px] h-[56px] flex items-center  ${slide.statusColor} ${slide.textColor} text-center css-body--lg-500 px-4 rounded-b-xl mt-4`}
      >
        {slide.statusText}
      </div>
    </div>
  );
}

export default function ActiveWorkerSection() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSnappingRef = useRef(false);
  const lastWheelTime = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const getScrollMetrics = useCallback(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    if (!wrapper || !sticky) return null;

    const panelHeight = sticky.offsetHeight;
    const scrollableDistance = wrapper.offsetHeight - panelHeight;
    if (scrollableDistance <= 0) return null;

    const rect = wrapper.getBoundingClientRect();
    const scrolled = clamp(-rect.top, 0, scrollableDistance);
    const segment = scrollableDistance / (SLIDE_COUNT - 1);
    const index = clamp(Math.round(scrolled / segment), 0, SLIDE_COUNT - 1);

    return { scrolled, segment, index, wrapperTop: wrapper.offsetTop };
  }, []);

  const snapToSlide = useCallback(
    (index: number, smooth = true) => {
      const wrapper = wrapperRef.current;
      const metrics = getScrollMetrics();
      if (!wrapper || !metrics || isSnappingRef.current) return;

      const rect = wrapper.getBoundingClientRect();
      const isPinned =
        rect.top <= 0 && rect.bottom > (stickyRef.current?.offsetHeight ?? 0);
      if (!isPinned) return;

      const target = metrics.wrapperTop + index * metrics.segment;
      if (Math.abs(window.scrollY - target) < 2) return;

      isSnappingRef.current = true;
      window.scrollTo({ top: target, behavior: smooth ? "smooth" : "auto" });

      window.setTimeout(
        () => {
          isSnappingRef.current = false;
        },
        smooth ? 400 : 0,
      );
    },
    [getScrollMetrics],
  );

  const updateFromScroll = useCallback(() => {
    const metrics = getScrollMetrics();
    if (!metrics) {
      if (!isSnappingRef.current) setActiveIndex(0);
      return;
    }

    if (!isSnappingRef.current) {
      setActiveIndex(metrics.index);
    }

    if (isSnappingRef.current) return;

    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(() => {
      snapToSlide(metrics.index);
    }, 80);
  }, [getScrollMetrics, snapToSlide]);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateFromScroll);
    };

    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateFromScroll]);

  const scrollToSlide = useCallback(
    (index: number) => {
      setActiveIndex(index);
      snapToSlide(index);
    },
    [snapToSlide],
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) return; // Allow pinch-to-zoom

      const wrapper = wrapperRef.current;
      const sticky = stickyRef.current;
      if (!wrapper || !sticky) return;

      const rect = wrapper.getBoundingClientRect();
      const stickyHeight = sticky.offsetHeight;
      const maxScroll = wrapper.offsetHeight - stickyHeight;
      const scrolledIntoWrapper = -rect.top;

      const isPinned = rect.top <= 1 && rect.bottom >= stickyHeight - 1;
      if (!isPinned) return;

      if (scrolledIntoWrapper <= 2 && e.deltaY < 0) return;
      if (scrolledIntoWrapper >= maxScroll - 2 && e.deltaY > 0) return;

      e.preventDefault();

      if (isSnappingRef.current) return;

      const now = Date.now();
      if (now - lastWheelTime.current < 600) return;

      if (Math.abs(e.deltaY) < 15) return;

      lastWheelTime.current = now;

      if (e.deltaY > 0) {
        if (activeIndex < SLIDE_COUNT - 1) scrollToSlide(activeIndex + 1);
      } else {
        if (activeIndex > 0) scrollToSlide(activeIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, scrollToSlide]);

  const translatePercent = (activeIndex / SLIDE_COUNT) * 100;
  const slideTransition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <>
      {/* MOBILE LAYOUT (Sequential Stack) */}
      <div className="w-full bg-utility-bluishpurple text-white px-6 py-20 flex lg:hidden flex-col items-center gap-3 lg:gap-20 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-aioncy/10 blur-[80px] rounded-full pointer-events-none" />

        {SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center gap-10 text-center w-full relative z-10"
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-[32px] font-extrabold leading-[1.12] tracking-tight text-white">
                {slide.title}
              </h2>
              <p className="css-body--lg-400 max-w-sm mx-auto">
                {slide.description}
              </p>
            </div>

            <SlidePhone slide={slide} />
          </div>
        ))}

        <div className="mt-[-80px] lg:mt-0 w-full flex items-center gap-4 mt-2 max-w-[300px] relative z-10">
          <Button className="flex-1">Test the AI</Button>
          <Button variant="secondary" className="flex-1 text-neutral-black">
            Join Early
          </Button>
        </div>
      </div>

      {/* DESKTOP LAYOUT (Sticky Slider) */}
      <div
        ref={wrapperRef}
        style={{ height: `${RUNWAY_VH}vh` }}
        className="hidden lg:block w-full relative shrink-0"
      >
        <div
          ref={stickyRef}
          className="sticky top-0 z-30 w-full h-[100vh] min-h-[100vh] max-h-[100vh] overflow-hidden"
        >
          <section className="w-full h-[100vh] bg-utility-bluishpurple text-white relative overflow-visible flex items-center justify-center">
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-aioncy/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full css-container h-full relative z-10 grid grid-cols-1 lg:grid-cols-2 flex-col lg:flex-row items-center">
              <div className="h-full flex-1 flex flex-col items-start gap-6 text-left self-center justify-center">
                <div className="w-full h-[506px] lg:h-[592px] flex items-center justify-between flex-col">
                  <div className="flex gap-1.5 w-[142px] h-[3px] mb-12 shrink-0 mx-auto ">
                    {SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSlide(idx)}
                        className="h-full flex-1 rounded-full bg-white/25 overflow-hidden relative cursor-pointer border-none outline-none"
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        <div
                          className="h-full bg-white transition-all duration-300"
                          style={{
                            width: idx <= activeIndex ? "100%" : "0%",
                          }}
                        />
                      </button>
                    ))}
                  </div>

                  <div className="w-full h-[220px] overflow-hidden mx-auto">
                    <div
                      className="will-change-transform"
                      style={{
                        transform: `translate3d(0, -${translatePercent}%, 0)`,
                        transition: slideTransition,
                      }}
                    >
                      {SLIDES.map((slide) => (
                        <div
                          key={slide.title}
                          className="h-[400px] flex flex-col gap-4 text-center max-w-[580px] mx-auto text-align"
                        >
                          <h2 className="css-heading--h2 tracking-tight text-white">
                            {slide.title}
                          </h2>
                          <p className="max-w-[440px] mx-auto css-body--lg-400">
                            {slide.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-[13px] h-12 mt-8 shrink-0 mx-auto w-full">
                    <Button className="flex-1 h-full">Test the AI</Button>
                    <Button variant="secondary" className="flex-1 h-full">
                      Join Early
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 h-[100vh] overflow-visible self-center">
                <div
                  className="will-change-transform"
                  style={{
                    transform: `translate3d(0, -${translatePercent}%, 0)`,
                    transition: slideTransition,
                  }}
                >
                  {SLIDES.map((slide) => (
                    <div
                      key={slide.title}
                      className="h-[100vh] flex items-center justify-center"
                    >
                      <SlidePhone slide={slide} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
