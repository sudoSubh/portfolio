"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import { AuroraText } from "@/components/magicui/aurora-text";

function HoverScrollImage({ src, alt, isZoomed }: { src: string; alt: string; isZoomed?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [duration, setDuration] = useState(3000);
  const [isScrollable, setIsScrollable] = useState(false);

  const checkHeight = () => {
    if (containerRef.current && imageRef.current) {
      const containerW = containerRef.current.clientWidth;
      const containerH = containerRef.current.clientHeight;
      const img = imageRef.current;
      if (img.naturalWidth && img.naturalHeight) {
        const scale = isZoomed ? 1.5 : 1.0;
        const renderedH = (img.naturalHeight / img.naturalWidth) * (containerW * scale);
        setIsScrollable(renderedH > containerH);
      }
    }
  };

  useEffect(() => {
    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, [src]);

  const handleMouseEnter = () => {
    if (containerRef.current && imageRef.current) {
      const containerW = containerRef.current.clientWidth;
      const containerH = containerRef.current.clientHeight;
      const img = imageRef.current;
      if (img.naturalWidth && img.naturalHeight) {
        const scale = isZoomed ? 1.5 : 1.0;
        const renderedH = (img.naturalHeight / img.naturalWidth) * (containerW * scale);
        if (renderedH > containerH) {
          const scrollAmount = renderedH - containerH;
          setTranslateY(-scrollAmount);
          // Dynamic scroll speed (approx 150px/sec)
          setDuration(Math.max(1200, (scrollAmount / 150) * 1000));
        }
      }
    }
  };

  const handleMouseLeave = () => {
    setTranslateY(0);
    setDuration(1000); // fast reverse speed
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full overflow-hidden bg-black/5 dark:bg-white/5 flex items-center justify-center"
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={checkHeight}
        style={
          isScrollable
            ? {
                transform: isZoomed
                  ? `translateX(-50%) translateY(${translateY}px)`
                  : `translateY(${translateY}px)`,
                transition: `transform ${duration}ms ease-in-out`,
              }
            : {}
        }
        className={
          isScrollable
            ? isZoomed
              ? "absolute top-0 left-1/2 w-[150%] max-w-none h-auto object-cover"
              : "absolute top-0 left-0 w-full h-auto object-cover"
            : "w-full h-full object-contain"
        }
      />
    </div>
  );
}

function ProjectImages({ images, title, isZoomed }: { images: string[]; title: string; isZoomed?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No Image</span>
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full group/slider bg-black/5 dark:bg-white/5">
      <HoverScrollImage src={images[currentIndex]} alt={`${title} - Image ${currentIndex + 1}`} isZoomed={isZoomed} />

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 hover:bg-background shadow-md border text-foreground opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 hover:bg-background shadow-md border text-foreground opacity-0 group-hover/slider:opacity-100 transition-opacity duration-200 z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  idx === currentIndex ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/50 hover:bg-muted-foreground/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const projects = [
  {
    logo: "/mockai.jpg",
    title: "Mock.AI - AI-Powered Interview Platform",
    description:
      "A 3-service microservices platform built for voice-enabled AI interviews. Features dynamic resume parsing, speech-to-text voice conversations, and real-time evaluation. Secured 4th place at HackOdisha.",
    images: ["/mockai.jpg"],
    tags: ["React 19", "Node.js", "Express", "Python", "Flask", "Gemini 1.5 Flash", "Speech-to-Text", "MongoDB"],
    demoUrl: "https://prepverse-ai.onrender.com",
    githubUrl: "https://github.com/sudoSubh/Mock.Ai",
    features: [
      "Built resume parsing pipeline using PyMuPDF + Gemini 1.5 Flash, processing 500+ PDFs into structured JSON",
      "Engineered voice-interactive interviews with speech-to-text + Edge-TTS across 3 interview modes",
      "Cut interview evaluation time by 45% via real-time LLM scoring endpoint for technical accuracy and communication",
      "Implemented secure authentication across all services using Google OAuth + JWT with MongoDB persistence"
    ],
  },
  {
    logo: "/instastay.png",
    title: "Instastay - Hotel Booking System",
    description:
      "A full-stack hotel booking system featuring AI-powered travel assistance, React performance optimization, and highly secure authentication.",
    images: ["/instastay.png"],
    tags: ["React", "Node.js", "Express", "AI Assistant", "CI/CD", "MongoDB", "Tailwind CSS"],
    demoUrl: "https://instastay.vercel.app",
    githubUrl: "https://github.com/sudoSubh/INSTASTAY",
    features: [
      "Architected full-stack hotel booking system with AI-powered travel assistance",
      "Improved booking flow performance by 40% through React optimization and API response tuning",
      "Implemented secure authentication supporting 1K+ simulated users",
      "Deployed application using automated CI/CD pipelines on cloud infrastructure"
    ],
  },
  {
    logo: "/whiteboard_landing.png",
    title: "Collaborative Whiteboard",
    description:
      "A real-time whiteboard drawing and messaging platform for high-concurrency group sessions with sub-60ms synchronization latency.",
    images: ["/whiteboard_landing.png", "/whiteboard_canvas.png"],
    tags: ["Node.js", "Express", "Socket.io", "HTML5 Canvas", "JavaScript"],
    demoUrl: "https://collaborative-whiteboard-liart.vercel.app",
    githubUrl: "https://github.com/sudoSubh/Collaborative-whiteboard",
    features: [
      "Built a real-time whiteboard for 50+ concurrent users using Socket.io and Node.js",
      "Designed secure room-based sessions handling 1K+ events per minute on backend",
      "Implemented drawing tools and live chat via HTML5 Canvas, boosting collaboration by 40%"
    ],
  },
  {
    logo: "/finlit.png",
    title: "FinLit - Financial Literacy AI Agent",
    description:
      "An intelligent Financial Literacy AI Agent using LangGraph, Gemini API, and Plotly, designed for budgeting, scam prevention, and UPI guidance.",
    images: ["/finlit.png"],
    tags: ["Python", "LangGraph", "Gemini API", "Streamlit", "Plotly", "RAG Pipelines", "NLP"],
    demoUrl: "https://github.com/sudoSubh/FinLit",
    githubUrl: "https://github.com/sudoSubh/FinLit",
    features: [
      "Built an AI agent using LangGraph and Gemini API with NLP-driven query analysis",
      "Developed agentic workflows in Python integrating LLM-powered response generation and financial calculators",
      "Deployed an interactive Streamlit app with Plotly visualizations and a RAG-based retrieval pipeline from RBI sources"
    ],
  },
  {
    logo: "/healai.png",
    title: "HealAi - AI-Powered Healthcare Ecosystem",
    description:
      "A medical command center combining Generative AI (Gemini 1.5 Pro) with localized verified clinics data, clinical OCR report analysis, and multilingual patient engagement.",
    images: ["/healai.png"],
    tags: ["React", "TypeScript", "Framer Motion", "Gemini 1.5 Pro", "Supabase", "OCR Engine", "Tailwind CSS"],
    demoUrl: "https://heal-ai-eight.vercel.app/",
    githubUrl: "https://github.com/sudoSubh/HealAi",
    features: [
      "Context-aware AI Medical Assistant supporting multilingual communications in 50+ languages",
      "Intelligence-driven Symptom Checker with emergency classification and condition probability matching",
      "OCR medical report analysis extracting key metrics and translating complex terms into patient-friendly summaries",
      "Verified local healthcare hub with a direct directions routing system to verified medical rooms"
    ],
  },
  {
    logo: "/ebms_3.png",
    title: "EBMS - E-Book Management System",
    description:
      "A full-stack library management system featuring admin/student dashboards, automated Cloudinary book cover uploads, fine tracking and SMTP Nodemailer notifications.",
    images: ["/ebms_3.png", "/ebms_1.png", "/ebms_2.png", "/ebms_4.png", "/ebms_5.png"],
    tags: ["React", "Vite", "Node.js", "Express", "MongoDB", "Supabase", "Cloudinary", "Nodemailer"],
    demoUrl: "https://ebms-2.vercel.app",
    githubUrl: "https://github.com/sudoSubh/EBMS2",
    features: [
      "Dual Dashboard layouts separating student catalog queries from admin inventory actions",
      "Automated loan parameter calculation and email status notifications via SMTP Nodemailer",
      "Cloudinary integration optimizing file storage for catalog covers and user invoices",
      "Connected to Supabase auth and MongoDB Atlas database systems for secure session management"
    ],
  }
];
export default function Projects() {
  return (
    <section id="projects" className="py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
      
        <div>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold uppercase tracking-wider text-primary mb-2  relative inline-block"
          >
            Featured Work
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary/60 to-purple-600/60 rounded-full"
            />
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-4xl sm:text-4xl font-extrabold tracking-tight"
          >
            <span className="text-blue-600 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-blue-200 dark:to-blue-600">
              Recent Projects
            </span>
          </motion.h2>
        </div>

        {/* Projects List */}
        <div className="grid gap-10 mt-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.25) }}
              className="grid md:grid-cols-2 gap-6 border rounded-xl overflow-hidden group"
            >
              <div className="overflow-hidden relative h-[300px] sm:h-[350px] md:h-[450px] w-full border-b md:border-b-0 md:border-r">
                <ProjectImages images={project.images} title={project.title} isZoomed={(project as any).isZoomed} />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-muted-foreground">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Key Features:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {project.features.map((feature, idx) => (
                      <li key={idx} className="text-sm">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button size="sm">
                    <Link
                      href={project.demoUrl}
                      className="flex items-center"
                      target="_blank"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" /> Live
                    </Link>
                  </Button>
                  {project.githubUrl && (
                    <Button size="sm" variant="outline">
                      <Link
                        href={project.githubUrl}
                        className="flex items-center"
                        target="_blank"
                      >
                        <Github className="mr-2 h-4 w-4" /> Code
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10 text-center"
        >
          {/* <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 rounded-lg text-sm font-medium bg-primary/10 text-primary 
                hover:bg-primary/20 transition-all duration-300 border border-primary/10 
                hover:border-primary/30 shadow-sm hover:shadow-md flex items-center gap-2 mx-auto"
            >
              View All Projects <BsArrowRight />
            </motion.button>
          </Link> */}
        </motion.div>
      </motion.div>
    </section>
  );
}
