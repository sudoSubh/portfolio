"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";
import { useRef } from "react";

const EXPERIENCE = [
  {
    role: "Agentic AI - Project Based Learning Participant",
    company: "IBM",
    period: "July 2025 – August 2025",
    bullets: [
      "Built a Financial Literacy AI Agent using LangGraph and Gemini API with NLP-driven query analysis for budgeting, scam prevention, and UPI guidance.",
      "Developed agentic AI workflows in Python integrating LLM-powered response generation and financial calculators.",
      "Deployed an interactive Streamlit app with Plotly visualizations and a RAG-based retrieval pipeline from RBI sources."
    ],
    skills: ["LangGraph", "Gemini API", "Python", "Streamlit", "RAG Pipelines", "NLP"],
  },
  {
    role: "Data Analytics Summer Intern",
    company: "IBM",
    period: "June 2024 – August 2024",
    bullets: [
      "Analyzed 100K+ real-world wildfire records using Python and machine learning techniques.",
      "Identified 5+ high-impact environmental risk factors influencing wildfire spread.",
      "Built interactive dashboards that improved data-driven decision accuracy by 30%."
    ],
    skills: ["Python", "Machine Learning", "Data Analytics", "Plotly", "Dashboards"],
  },
];

function ExperienceCard({ experience }: { experience: (typeof EXPERIENCE)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative pl-12 pb-16"
    >
      <div className="mb-1 text-xl font-bold">{experience.role}</div>
      <div className="mb-2 flex items-center gap-2">
        <span className="font-medium text-blue-500">{experience.company}</span>
        <span className="text-sm text-muted-foreground">• {experience.period}</span>
      </div>
      <ul className="mb-4 space-y-1 text-muted-foreground max-w-2xl">
        {experience.bullets.map((point, i) => (
          <li key={i} className="flex items-start gap-2 leading-relaxed">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            {point}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {experience.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs font-medium text-black/80 dark:border-white/20 dark:bg-white/5 dark:text-white/90"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.005,
  });

  const positionY = useTransform(smoothProgress, (value) => `${value * 100}%`);

  return (
    <section id="experience" className="w-full py-24 bg-background overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl font-extrabold tracking-tight">
  <span className="text-blue-600 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-blue-200 dark:to-blue-600">
    Professional Journey
  </span>
</h2>
        </motion.div>

        <div className="max-w-7xl mx-auto relative" ref={containerRef}>
          
          <div className="absolute left-0 top-2 h-full w-full pointer-events-none">
            <div className="absolute left-[4px] h-full w-[2px] -translate-x-1/2 bg-blue-500/10" />
            
            <motion.div
              style={{ scaleY: smoothProgress, originY: 0 }}
              className="absolute left-[4px] h-full w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-600 to-blue-400 z-10 rounded-b-full"
            />

            <motion.div
              style={{ top: positionY }}
              className="absolute left-[4px] z-20 -translate-x-1/2 -translate-y-1/2"
            >
              <div 
                className="w-4 h-4 bg-blue-500 rounded-full rounded-tl-none rotate-45 shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-300/20"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #60a5fa, #2563eb)'
                }}
              />
            </motion.div>
          </div>

          <div className="relative z-10 ml-8">
            {EXPERIENCE.map((exp, idx) => (
              <ExperienceCard key={`${exp.company}-${idx}`} experience={exp} />
            ))}

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-12 pt-4"
            >
              <div className="flex items-center mb-3">
                <FaGraduationCap className="mr-3 text-2xl text-blue-500/80" />
                <h3 className="text-2xl font-bold text-foreground">Education</h3>
              </div>
              <div className="mb-2">
                <p className="text-lg font-semibold">Odisha University of Technology and Research (OUTR)</p>
                <p className="text-muted-foreground">B.Tech in Computer Science and Engineering</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                <span className="font-mono">2023 – Present</span>
                <span className="px-3 py-1 rounded-full bg-black/5 border border-black/10 text-black font-semibold text-xs dark:bg-white/5 dark:border-white/20 dark:text-white">
                  CGPA: 8.6
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}