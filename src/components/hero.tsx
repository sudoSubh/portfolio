"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Download, Mail, MapPin, Code } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { RiNextjsFill, RiReactjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiMongodb } from "react-icons/si";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { CanvasText } from "@/components/ui/canvas-text";
import { useEffect, useState } from "react";

export default function Hero() {
  const roles = ["Full-Stack & AI/ML Developer", "Backend Engineer"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-24 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] rounded-full" />
      <div className="absolute bottom-0 left-0 -z-10 h-[200px] w-[200px] sm:h-[300px] sm:w-[300px] rounded-full" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 sm:space-y-8 md:col-span-2 order-1"
        >
          <div className="space-y-3 sm:space-y-4">
            <div className="pb-0.6">
            <CanvasText
          text="Subhasish Behera"
          className="text-5xl sm:text-6xl font-bold"
          backgroundClassName="bg-blue-600 dark:bg-blue-700"
          colors={[
            "rgba(0, 153, 255, 1)",
            "rgba(0, 153, 255, 0.9)",
            "rgba(0, 153, 255, 0.8)",
            "rgba(0, 153, 255, 0.7)",
            "rgba(0, 153, 255, 0.6)",
            "rgba(0, 153, 255, 0.5)",
            "rgba(0, 153, 255, 0.4)",
            "rgba(0, 153, 255, 0.3)",
            "rgba(0, 153, 255, 0.2)",
            "rgba(0, 153, 255, 0.1)",
          ]}
          lineGap={4}
          animationDuration={20}
        />
        </div>
            <div className="h-7 sm:h-8 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roles[roleIndex]}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground flex items-center gap-2 sm:gap-3"
                >
                  <span className="h-[2px] w-6 sm:w-8 bg-primary/50 rounded-full hidden sm:block" />
                  {roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="h-4 w-4 flex-shrink-0" />
              <a href="mailto:beherasubhasish2005@gmail.com" className="break-all sm:break-normal">
                beherasubhasish2005@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span>Bhubaneswar, India</span>
            </div>
          </div>

          <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed">
            Full-Stack & Backend Developer with deep expertise in AI/ML and Agentic AI, specializing in building scalable microservices, real-time systems, and LLM-powered agentic workflows.
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-0">
            <Link href="/resume_SUBHASISH_BEHERA.pdf" target="_blank" download>
              <Button
                size="sm"
                className="text-xs sm:text-sm bg-blue-600 hover:bg-purple-600 text-white rounded-full px-2.5 [@media(min-width:400px)]:px-4 py-2 transition-colors duration-500"
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4 [@media(min-width:400px)]:mr-2" />
                <span className="hidden [@media(min-width:400px)]:inline">Resume</span>
              </Button>
            </Link>

            <Link href="https://github.com/sudoSubh/" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm px-2.5 sm:px-4"
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link href="mailto:beherasubhasish2005@gmail.com" target="_blank">
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm px-2.5 sm:px-4"
              >
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/subhasish-behera-865842319/"
              target="_blank"
            >
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-sm px-2.5 sm:px-4"
              >
                <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Tech Stack Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center order-2"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm aspect-square p-4 sm:p-6">
            <motion.div
              className="absolute inset-4 sm:inset-6 rounded-xl -z-10"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.02, 1.02, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="absolute inset-4 sm:inset-6 flex flex-col gap-2 sm:gap-3 md:gap-4 -z-10">
              {/* Top Row */}
              <div className="flex gap-2 sm:gap-3 md:gap-4 flex-1">
                <motion.div
                  className="flex-1 rounded-lg sm:rounded-xl p-2 sm:p-4 md:p-6 flex items-center justify-center bg-gradient-to-br from-blue-200 to-white dark:from-blue-900 dark:to-gray-800 shadow-md transition-all hover:shadow-purple-500/50"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#087ea4]"
                  >
                    <RiReactjsFill />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="flex-1 rounded-lg sm:rounded-xl p-2 sm:p-4 md:p-6 flex items-center justify-center bg-gradient-to-br from-gray-200 to-white dark:from-gray-800 dark:to-gray-700 shadow-md transition-all hover:shadow-purple-500/50"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
                    <RiNextjsFill />
                  </div>
                </motion.div>
              </div>

              {/* Bottom Row */}
              <div className="flex gap-2 sm:gap-3 md:gap-4 flex-1">
                <motion.div
                  className="flex-1 rounded-lg sm:rounded-xl p-2 sm:p-4 md:p-6 flex items-center justify-center bg-gradient-to-br from-green-100 to-white dark:from-green-900 dark:to-gray-800 shadow-md transition-all hover:shadow-purple-500/50"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-green-600"
                  >
                    <SiMongodb />
                  </motion.div>
                </motion.div>
                <motion.div
                  className="flex-1 rounded-lg sm:rounded-xl p-2 sm:p-4 md:p-6 flex items-center justify-center bg-gradient-to-br from-sky-100 to-white dark:from-sky-900 dark:to-gray-800 shadow-md transition-all hover:shadow-purple-500/50"
                  animate={{
                    boxShadow: [
                      "0 0 0 0px rgba(56, 189, 248, 0.2)",
                      "0 0 0 10px rgba(56, 189, 248, 0.15)",
                      "0 0 0 0px rgba(56, 189, 248, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-sky-500">
                    <RiTailwindCssFill />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Corner Badges */}
            {[
              {
                text: "ReactJs",
                top: "-top-1 sm:-top-2 md:-top-3",
                left: "-left-1 sm:-left-2 md:-left-3",
                delay: 0.1,
              },
              {
                text: "Tailwind CSS",
                bottom: "-bottom-1 sm:-bottom-2 md:-bottom-3",
                right: "-right-1 sm:-right-2 md:-right-3",
                delay: 0.2,
              },
              {
                text: "Next.js",
                top: "-top-1 sm:-top-2 md:-top-3",
                right: "-right-1 sm:-right-2 md:-right-3",
                delay: 0.3,
              },
              {
                text: "MongoDB",
                bottom: "-bottom-1 sm:-bottom-2 md:-bottom-3",
                left: "-left-1 sm:-left-2 md:-left-3",
                delay: 0.4,
              },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  scale: 1.1,
                }}
                className={`absolute ${badge.top || ""} ${badge.bottom || ""} ${
                  badge.left || ""
                } ${badge.right || ""}
                  z-30 cursor-default rounded-full border bg-background 
                  px-2 py-0.5 text-[10px] sm:px-3 sm:py-1 sm:text-xs md:px-4 md:py-1.5 md:text-sm 
                  font-semibold shadow-lg
                  transition-all duration-300
                  border-gray-200 dark:border-gray-700
                  hover:bg-purple-600 hover:text-white hover:border-purple-400
                  hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]
                  dark:hover:bg-purple-500`}
                animate={{
                  ...(badge.left || badge.right
                    ? { x: [0, badge.left ? -5 : 5, 0] }
                    : { y: [0, badge.top ? -5 : 5, 0] }),
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: badge.delay,
                }}
              >
                {badge.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}