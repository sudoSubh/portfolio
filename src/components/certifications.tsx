"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { 
  Award, 
  ExternalLink, 
  Network, 
  Shield, 
  Brain, 
  Database, 
  Terminal, 
  Briefcase, 
  Calendar,
  Loader2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  expiry?: string;
  link: string;
  category: string;
  imageUrl?: string;
}

const STATIC_CERTIFICATIONS: Certification[] = [
  {
    title: "SAP Certified - Back-End Developer - ABAP Cloud",
    issuer: "SAP",
    date: "June 04, 2026",
    expiry: "June 04, 2027",
    link: "https://www.credly.com/badges/5ac7ec31-7058-43d3-9b2f-afa10f121687",
    category: "Development"
  },
  {
    title: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco",
    date: "June 03, 2026",
    link: "https://www.credly.com/badges/f4b37898-a2d9-4bbc-a0a9-40225efc3509",
    category: "Security"
  },
  {
    title: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco",
    date: "May 29, 2026",
    link: "https://www.credly.com/badges/0412570a-9bc8-4ccf-aabf-73e6c73a6922",
    category: "Networking"
  },
  {
    title: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco",
    date: "May 29, 2026",
    link: "https://www.credly.com/badges/21154f62-78a1-4ce2-be6f-146e4a975330",
    category: "Networking"
  },
  {
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco",
    date: "May 29, 2026",
    link: "https://www.credly.com/badges/e4b41e3b-24a4-4cfd-8a12-b4b021ce4b08",
    category: "Networking"
  },
  {
    title: "Apply AI: Analyze Customer Reviews",
    issuer: "Cisco",
    date: "May 24, 2026",
    link: "https://www.credly.com/badges/5147f813-1ec3-44c0-8cae-d38c16ee8d4a",
    category: "AI / ML"
  },
  {
    title: "Introduction to Modern AI",
    issuer: "Cisco",
    date: "May 24, 2026",
    link: "https://www.credly.com/badges/de38beed-7574-4bfb-b5a8-fd34bc037ead",
    category: "AI / ML"
  },
  {
    title: "Introduction to Data Science",
    issuer: "Cisco",
    date: "May 24, 2026",
    link: "https://www.credly.com/badges/ea62c287-3457-4a88-b380-a9615cdb8023",
    category: "Data Science"
  },
  {
    title: "Python Essentials 2",
    issuer: "Cisco",
    date: "May 23, 2026",
    link: "https://www.credly.com/badges/64367367-6a4a-4792-9e00-b24af65e1300",
    category: "Development"
  },
  {
    title: "Python Essentials 1",
    issuer: "Cisco",
    date: "May 21, 2026",
    link: "https://www.credly.com/badges/f6f6491a-1c51-4b6e-acc4-a4b317d486e1",
    category: "Development"
  },
  {
    title: "Data Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "July 13, 2024",
    link: "https://www.credly.com/badges/8075e84e-4c31-46bb-a616-39ce557eb2bb",
    category: "Data Science"
  },
  {
    title: "Project Management Fundamentals",
    issuer: "IBM SkillsBuild",
    date: "July 10, 2024",
    link: "https://www.credly.com/badges/20d6a0fd-5f12-4f28-9eb3-bdd1386fbc62",
    category: "Management"
  }
];

const CATEGORIES = ["All", "Development", "Networking", "Security", "AI / ML", "Data Science", "Management"];

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>(STATIC_CERTIFICATIONS);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDesktop, setIsDesktop] = useState(false);

  const filteredCertifications = selectedCategory === "All"
    ? certifications
    : certifications.filter(cert => cert.category === selectedCategory);

  // Monitor screen size for responsive scroll strategy
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // Framer Motion scroll hook targeting the scroll container
  const targetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  const [xTranslation, setXTranslation] = useState(0);

  // Re-calculate the sliding range based on dimensions
  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth;
        const clientWidth = scrollRef.current.clientWidth;
        // Slide by the overflow width (negative value)
        const diff = scrollWidth - clientWidth;
        setXTranslation(diff > 0 ? -diff - 48 : 0);
      }
    };

    const timer = setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [filteredCertifications, loading, isDesktop]);

  const x = useTransform(scrollYProgress, [0, 1], [0, xTranslation]);

  // Button state triggers
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setPrevBtnEnabled(latest > 0.01);
    setNextBtnEnabled(latest < 0.99);
  });

  // Programmatic smooth scroll to trigger horizontal slide
  const scrollNext = () => {
    if (!targetRef.current) return;
    const offsetTop = targetRef.current.offsetTop;
    const scrollRange = targetRef.current.offsetHeight - window.innerHeight;
    const currentProgress = scrollYProgress.get();
    
    // Step forward by 1 card slot size fraction
    const step = 1 / Math.max(1, filteredCertifications.length - 2);
    const targetY = offsetTop + Math.min(1, currentProgress + step) * scrollRange;
    
    window.scrollTo({
      top: targetY + 10,
      behavior: "smooth"
    });
  };

  const scrollPrev = () => {
    if (!targetRef.current) return;
    const offsetTop = targetRef.current.offsetTop;
    const scrollRange = targetRef.current.offsetHeight - window.innerHeight;
    const currentProgress = scrollYProgress.get();
    
    // Step backward by 1 card slot size fraction
    const step = 1 / Math.max(1, filteredCertifications.length - 2);
    const targetY = offsetTop + Math.max(0, currentProgress - step) * scrollRange;
    
    window.scrollTo({
      top: targetY - 10,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    let active = true;
    const fetchCerts = async () => {
      try {
        const response = await fetch("/api/certifications");
        if (!response.ok) {
          throw new Error("Failed to load certifications");
        }
        const data = await response.json();
        if (active && data.data && Array.isArray(data.data)) {
          setCertifications(data.data);
        }
      } catch (error) {
        console.error("Failed to load real-time certifications, using fallbacks:", error);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchCerts();
    return () => {
      active = false;
    };
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Development":
        return <Terminal className="w-5 h-5 text-blue-500" />;
      case "Networking":
        return <Network className="w-5 h-5 text-indigo-500" />;
      case "Security":
        return <Shield className="w-5 h-5 text-emerald-500" />;
      case "AI / ML":
        return <Brain className="w-5 h-5 text-purple-500" />;
      case "Data Science":
        return <Database className="w-5 h-5 text-cyan-500" />;
      case "Management":
        return <Briefcase className="w-5 h-5 text-orange-500" />;
      default:
        return <Award className="w-5 h-5 text-primary" />;
    }
  };

  const getIssuerBadgeColor = (issuer: string) => {
    const lowerIssuer = issuer.toLowerCase();
    if (lowerIssuer.includes("cisco")) {
      return "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20";
    } else if (lowerIssuer.includes("sap")) {
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    } else if (lowerIssuer.includes("ibm")) {
      return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
    }
    return "bg-primary/10 text-primary border-primary/20";
  };

  const isScrollActive = isDesktop && filteredCertifications.length > 3;

  return (
    <section 
      id="certifications" 
      ref={targetRef} 
      className={`relative ${isScrollActive ? "h-[250vh]" : "py-12 max-w-7xl mx-auto overflow-hidden"}`}
    >
      <div className={isScrollActive ? "sticky top-0 h-screen flex flex-col justify-center overflow-hidden" : "w-full"}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-4 sm:px-6 max-w-7xl mx-auto w-full">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-sm font-semibold uppercase tracking-wider text-primary mb-2 relative inline-block"
            >
              Credentials
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
              className="text-4xl font-extrabold tracking-tight"
            >
              <span className="text-blue-600 dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-blue-200 dark:to-blue-600">
                Licenses & Certifications
              </span>
            </motion.h2>
          </div>

          <div className="flex items-center gap-3">
            {loading && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Syncing live...</span>
              </div>
            )}
            <motion.a
              href="https://www.credly.com/users/subhasish-behera.4bc5874f"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary border border-border bg-accent/5 hover:bg-accent/10 px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              <span>Verify on Credly</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b pb-4 border-border/50 px-4 sm:px-6 max-w-7xl mx-auto w-full">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative ${
                selectedCategory === category
                  ? "text-primary-foreground bg-primary shadow-sm"
                  : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Carousel Viewport Wrapper */}
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6">
          <div className={isScrollActive ? "overflow-hidden" : "overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory flex"}>
            <motion.div 
              ref={scrollRef}
              style={isScrollActive ? { x } : {}} 
              className="flex gap-6 py-4 max-w-max"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filteredCertifications.map((cert) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -10 }}
                    transition={{ duration: 0.3 }}
                    key={cert.title}
                    className="flex-shrink-0 w-[290px] sm:w-[360px] snap-center group/card relative flex flex-col justify-between p-6 bg-accent/5 dark:bg-white/[0.02] backdrop-blur-md rounded-2xl border border-border/50 hover:border-primary/30 hover:bg-accent/10 dark:hover:bg-white/[0.04] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_30px_rgba(59,130,246,0.1)] dark:hover:shadow-[0_12px_30px_rgba(59,130,246,0.05)] cursor-default select-none animate-in fade-in"
                  >
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover/card:from-primary/[0.03] group-hover/card:to-purple-500/[0.03] rounded-2xl transition-all duration-500" />
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-background border shadow-sm group-hover/card:scale-105 transition-transform duration-300 overflow-hidden border-border/70 group-hover/card:border-primary/30">
                          {cert.imageUrl ? (
                            <img 
                              src={cert.imageUrl} 
                              alt={`${cert.title} Badge`}
                              className="w-full h-full object-contain p-1"
                              draggable="false"
                            />
                          ) : (
                            getCategoryIcon(cert.category)
                          )}
                        </div>
                        <span className={`text-xs px-2.5 py-1 border rounded-full font-medium transition-all ${getIssuerBadgeColor(cert.issuer)}`}>
                          {cert.issuer}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-md sm:text-lg font-bold group-hover/card:text-primary transition-colors leading-snug line-clamp-2 h-[48px] sm:h-[54px] flex items-center">
                          {cert.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Issued: {cert.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/30 flex justify-between items-center">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
                        {cert.category}
                      </span>
                      
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer font-medium"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Navigation buttons scrolling window vertically */}
          {isScrollActive && (
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none flex justify-between px-2 sm:px-4">
              <button
                onClick={scrollPrev}
                disabled={!prevBtnEnabled}
                className={`pointer-events-auto w-10 h-10 rounded-full border bg-background/95 hover:bg-background shadow-md flex items-center justify-center transition-all ${
                  prevBtnEnabled 
                    ? "opacity-100 scale-100 hover:scale-105 cursor-pointer text-foreground shadow-lg" 
                    : "opacity-0 scale-95 pointer-events-none text-muted-foreground"
                }`}
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!nextBtnEnabled}
                className={`pointer-events-auto w-10 h-10 rounded-full border bg-background/95 hover:bg-background shadow-md flex items-center justify-center transition-all ${
                  nextBtnEnabled 
                    ? "opacity-100 scale-100 hover:scale-105 cursor-pointer text-foreground shadow-lg" 
                    : "opacity-0 scale-95 pointer-events-none text-muted-foreground"
                }`}
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Scroll progress bar indicator */}
        {isScrollActive && (
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 mt-8">
            <div className="h-[2px] bg-muted w-full rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
