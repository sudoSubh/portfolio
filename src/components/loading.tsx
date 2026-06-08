"use client";

import { motion, Variants } from "framer-motion";

export default function Loading({ onFinish }: { onFinish: () => void }) {
  const text = "Subhasish.";

  
  const container: Variants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };


  const letter: Variants = {
    hidden: { opacity: 0, color: "#ffffff00", scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      color: "#ffffff",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <motion.h1
        className="text-5xl font-bold flex gap-1"
        variants={container}
        initial="hidden"
        animate="show"
        onAnimationComplete={onFinish}
      >
        {text.split("").map((char, i) => (
          <motion.span key={i} variants={letter}>
            {char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}
