"use client";

import { motion, Variants } from "framer-motion";
import { FaBrain, FaCode, FaDatabase, FaJava } from "react-icons/fa";
import {
  SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs,
  SiNodedotjs, SiTailwindcss, SiMongodb, SiCplusplus, SiExpress,
  SiSocketdotio, SiGit, SiStreamlit, SiGooglecloud, SiDocker,
  SiPlotly
} from "react-icons/si";
import { BsLightningChargeFill } from "react-icons/bs";
import React from "react";

const SKILLS = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "default" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "default" },
  { name: "Socket.io", icon: SiSocketdotio, color: "default" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
  { name: "Plotly", icon: SiPlotly, color: "#3F4F75" },
  { name: "LangGraph (AI)", icon: FaBrain, color: "#FF6F00" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Cloud Deploy", icon: SiGooglecloud, color: "#4285F4" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const SkillCard = React.memo(({ skill }: { skill: typeof SKILLS[0] }) => {
  const IconComponent = skill.icon;
  const isDefaultColor = skill.color === "default";
  
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.04,
        y: -4,
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      className="group relative flex flex-col items-center p-6 bg-accent/5 rounded-xl border border-transparent hover:border-primary/20 hover:bg-accent/10 transition-colors cursor-default"
    >
      <div 
        className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-background border shadow-sm group-hover:shadow-md transition-all duration-300"
        style={{ borderColor: isDefaultColor ? "" : `${skill.color}40`}}
      >
        <IconComponent
          className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
          style={{
            color: isDefaultColor ? "currentColor" : skill.color,
          }}
        />
      </div>
      <h3 className="text-lg font-semibold text-center">{skill.name}</h3>
    </motion.div>
  );
});
SkillCard.displayName = "SkillCard";

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-12 overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
        <h2 className="text-4xl sm:text-4xl font-extrabold tracking-tight">
  <span className="text-blue-600 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-blue-200 dark:to-blue-600">
            Skills & Technologies
            </span>
            </h2>
          

         
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {SKILLS.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaCode className="w-6 h-6 text-primary" />,
                title: "Full-Stack Dev",
                desc: "Building responsive, modern, and performant web applications with Node.js, React, and robust API layers.",
              },
              {
                icon: <FaBrain className="w-6 h-6 text-primary" />,
                title: "Agentic AI & ML",
                desc: "Developing LLM-powered agentic workflows (LangGraph, Gemini API), RAG retrieval pipelines, and interactive AI agents.",
              },
              {
                icon: <FaDatabase className="w-6 h-6 text-primary" />,
                title: "Real-time Systems",
                desc: "Engineering highly concurrent backend services, WebSocket communication, and responsive real-time interfaces.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                className="bg-accent/5 p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:bg-accent/10 transition-colors cursor-default shadow-sm"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}