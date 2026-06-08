"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useSpring, MotionProps } from "framer-motion";
import React from "react";

interface ScrollProgressProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, ...props }, ref) => {
  const { scrollYProgress } = useScroll();

 
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.005,
  });

  return (
    <motion.div
  ref={ref}
  className={cn(
    "fixed inset-x-0 top-0 h-[3px] transform origin-left",
    "bg-gradient-to-r from-[#A97CF8] via-[#F38CB8] to-[#FDCC92]",
    "shadow-[0_0_8px_rgba(249,115,255,0.6)]",
    "z-[9999]", 
    className
  )}
  style={{ scaleX }}
  {...props}
/>

  );
});

ScrollProgress.displayName = "ScrollProgress";
