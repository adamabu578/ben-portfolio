"use client"

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion"
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Download, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useEffect, useState, useRef, useCallback } from "react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5, ease: "backOut" },
}

const slideInFromBottom = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const projects = [
  {
    id: 1,
    title: "Interactify CMS Dashboard",
    description: "dashboard provides a clean, user-friendly interface for tracking key metrics like user activity, campaign performance, and engagement analytics. It features charts and summary cards for quick insights and supports data-driven decision-making.",
    image: "/assets/Admin Home.svg",
    tags: ["UI/UX", "Mobile", "Figma"],
    link: "https://www.figma.com/design/Qwfov0us3w1WqHQZ2HtfW7/Portfolio?node-id=4-9178&p=f&t=A46qXQ8paBXPwXvB-0",
  },
  {
    id: 2,
    title: "Connectivity Solutions",
    description: "Cloud-based connectivity solution linking enterprise locations, IoT devices, SaaS applications, and external networks with secure, scalable routing.",
    image: "/assets/cloud.svg",
    tags: ["UI/UX", "Mobile", "Figma"],
    link: "https://www.figma.com/design/Qwfov0us3w1WqHQZ2HtfW7/Portfolio?node-id=4-14800&p=f&t=A46qXQ8paBXPwXvB-0",
  },
  {
    id: 3,
    title: "Rivas Web App",
    description: "Rivas is a sleek, responsive movie streaming site designed for a smooth and engaging user experience. It features categorized content, fast loading, and a modern UI, offering users an experience similar to Netflix.",
    image: "/assets/rivas.svg",
    tags: ["UI/UX", "Mobile", "Figma"],
    link: "https://www.figma.com/design/Qwfov0us3w1WqHQZ2HtfW7/Portfolio?node-id=0-1&p=f&t=A46qXQ8paBXPwXvB-0",
  },
  {
    id: 4,
    title: "E-Commerce web",
    description: "A clean user friendly e-commerce website with product listings, secure checkout, user authentication, and order management",
    image: "/assets/ecommerce.svg",
    tags: ["UI/UX", "Mobile", "Figma"],
    link: "https://www.figma.com/design/Qwfov0us3w1WqHQZ2HtfW7/Portfolio?node-id=6-20744&p=f&t=A46qXQ8paBXPwXvB-0",
  },
]

const skills = [
  { name: "UI/UX Design", level: 95, color: "from-pink-500 to-rose-500" },
  { name: "Figma", level: 90, color: "from-purple-500 to-indigo-500" },
  { name: "Adobe XD", level: 85, color: "from-blue-500 to-cyan-500" },
  { name: "Prototyping", level: 88, color: "from-emerald-500 to-teal-500" },
  { name: "User Research", level: 82, color: "from-yellow-500 to-orange-500" },
  { name: "Frontend Development", level: 75, color: "from-red-500 to-pink-500" },
]

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero") // Default to hero or first section
  const { scrollYProgress } = useScroll()
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -100])
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 })

  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  const navItems = [
    { name: "About", id: "about" },
    { name: "Work", id: "work" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" },
  ]

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY
    const viewportHeight = window.innerHeight
    let currentActive = "hero" // Default active section

    // Define a threshold for when a section becomes active
    // For example, when its top is within the top 30% of the viewport
    const activationThreshold = viewportHeight * 0.3

    // Iterate through all sections (including hero) to find the active one
    // Check from bottom to top to ensure the highest visible section is prioritized
    const sections = [
      { id: "contact", ref: contactRef },
      { id: "skills", ref: skillsRef },
      { id: "work", ref: workRef },
      { id: "about", ref: aboutRef },
      { id: "hero", ref: heroRef }, // Hero should be checked last as it's at the very top
    ]

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      if (section.ref.current) {
        const rect = section.ref.current.getBoundingClientRect()
        // A section is active if its top is above or at the threshold,
        // and its bottom is below the threshold.
        if (rect.top <= activationThreshold && rect.bottom > activationThreshold) {
          currentActive = section.id
          break // Found the active section, no need to check further
        }
      }
    }

    // Edge case: if at the very top, ensure hero is active
    if (scrollPosition === 0) {
      currentActive = "hero"
    }

    setActiveSection(currentActive)
  }, [])

  useEffect(() => {
    setIsLoaded(true)
    window.addEventListener("scroll", handleScroll)
    handleScroll() // Call on mount to set initial active section
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  return (
    <AnimatePresence>
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
        >
          {/* Scroll Progress Indicator */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 z-50 origin-left"
            style={{ scaleX: pathLength }}
          />

          {/* Colorful Floating Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full opacity-30"
            />
            <motion.div
              animate={{
                y: [0, 30, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full opacity-30"
            />
            <motion.div
              animate={{
                y: [0, -25, 0],
                x: [0, 10, 0],
              }}
              transition={{
                duration: 7,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute bottom-40 left-1/4 w-12 h-12 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full opacity-30"
            />
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 3,
              }}
              className="absolute top-1/2 right-1/4 w-14 h-14 bg-gradient-to-br from-cyan-300 to-blue-400 rounded-full opacity-25"
            />
          </div>

          {/* Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-40 border-b border-slate-200"
          >
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <motion.a
                href="#hero"
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent cursor-pointer"
              >
                Portfolio
              </motion.a>

              {/* Desktop Menu */}
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="hidden md:flex space-x-8"
              >
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    variants={fadeInUp}
                    href={`#${item.id}`}
                    whileHover={{
                      scale: 1.1,
                      color: "#3b82f6",
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`text-slate-600 hover:text-blue-500 transition-colors cursor-pointer font-medium ${
                      activeSection === item.id ? "text-blue-600 font-bold" : ""
                    }`}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isMobileMenuOpen ? (
                    <X className="h-6 w-6 text-slate-600" />
                  ) : (
                    <Menu className="h-6 w-6 text-slate-600" />
                  )}
                </motion.div>
              </motion.button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />

                  {/* Mobile Menu */}
                  <motion.div
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="fixed top-0 right-0 h-full w-80 bg-gradient-to-br from-white via-cyan-50 to-blue-50 shadow-2xl z-40 overflow-hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Mobile navigation menu"
                  >
                    {/* Mobile Menu Header */}
                    <div className="p-6 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
                      <div className="flex justify-between items-center">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                        >
                          Portfolio
                        </motion.div>
                        <motion.button
                          whileHover={{ scale: 1.1, rotate: 90 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                        >
                          <X className="h-5 w-5 text-slate-600" />
                        </motion.button>
                      </div>
                    </div>

                    {/* Mobile Menu Items */}
                    <nav className="p-6">
                      <ul className="space-y-2" role="list">
                        {navItems.map((item, index) => (
                          <motion.li
                            key={item.id}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                          >
                            <motion.a
                              href={`#${item.id}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              whileHover={{
                                scale: 1.05,
                                x: 10,
                                transition: { duration: 0.2 },
                              }}
                              whileTap={{ scale: 0.95 }}
                              className={`flex items-center space-x-3 px-4 py-3 text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer ${
                                activeSection === item.id ? "text-blue-600 font-bold bg-blue-50" : ""
                              }`}
                              role="menuitem"
                            >
                              <motion.div
                                whileHover={{ scale: 1.2 }}
                                className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                              />
                              <span>{item.name}</span>
                            </motion.a>
                          </motion.li>
                        ))}
                      </ul>
                    </nav>

                    {/* Mobile Menu Footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-blue-100/50 to-transparent">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                      >
                        <p className="text-sm text-slate-500 mb-4">Connect with me</p>
                        <div className="flex justify-center space-x-4">
                          {[
                            { icon: Github, href: "#", color: "hover:text-gray-700" },
                            { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                            { icon: Mail, href: "#", color: "hover:text-red-500" },
                          ].map((social, index) => (
                            <motion.a
                              key={index}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.6 + index * 0.1, ease: "backOut" }}
                              whileHover={{
                                scale: 1.2,
                                rotate: 10,
                                transition: { duration: 0.2 },
                              }}
                              whileTap={{ scale: 0.9 }}
                              href={social.href}
                              className={`p-3 bg-white rounded-full shadow-md ${social.color} transition-all duration-200`}
                            >
                              <social.icon className="h-5 w-5 text-slate-600" />
                            </motion.a>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-20 right-4 w-20 h-20 bg-gradient-to-br from-cyan-200 to-blue-300 rounded-full opacity-20" />
                    <div className="absolute bottom-32 left-4 w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full opacity-20" />
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.nav>

          {/* Hero Section - Skewed */}
          <section
            id="hero"
            ref={heroRef}
            className="pt-32 pb-20 px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100"
          >
            {/* Skewed Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 transform -skew-y-2 origin-top-left"></div>

            <motion.div style={{ y: yRange }} className="max-w-6xl mx-auto relative z-10">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="text-center">
                <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold text-slate-800 mb-6">
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Creative{" "}
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                  >
                    Designer
                  </motion.span>
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-xl text-slate-700 mb-8 max-w-2xl mx-auto">
                  I craft beautiful and functional digital experiences that users love. Specializing in UI/UX design and
                  frontend development.
                </motion.p>

                <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white group">
                      <a href="#work" className="flex items-center">
                        View My Work
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </motion.div>
                      </a>
                    </Button>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="group bg-white/80 border-purple-300 text-purple-700 hover:bg-purple-50"
                    >
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                      </motion.div>
                      Download Resume
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Animated Scroll Indicator */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ChevronDown className="h-6 w-6 text-blue-500" />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* About Section - Skewed */}
          <section
            id="about"
            ref={aboutRef}
            className="py-20 px-6 bg-gradient-to-br from-cyan-50 to-blue-50 relative overflow-hidden"
          >
            {/* Skewed Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 transform skew-y-1 origin-bottom-right"></div>

            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.h2
                    variants={fadeInLeft}
                    className="text-4xl font-bold text-blue-600 bg-clip-text text-transparent mb-6"
                  >
                    About Me
                  </motion.h2>
                  <motion.p variants={fadeInLeft} className="text-blue-700 mb-6 leading-relaxed">
                    I'm a passionate UI/UX designer with 3+ years of experience creating digital products that solve
                    real problems. I believe great design is invisible – it just works.
                  </motion.p>
                  <motion.p variants={fadeInLeft} className="text-blue-700 mb-8 leading-relaxed">
                    When I'm not designing, you can find me exploring new technologies, reading, or enjoying the beauty
                    of the outdoors. I draw a lot of my design inspiration from the world around me.
    
                  </motion.p>
                  <motion.div variants={fadeInLeft} className="flex space-x-4">
                    {[
                      { icon: Github, href: "#", color: "hover:text-gray-700" },
                      { icon: Linkedin, href: "#", color: "hover:text-blue-600" },
                      { icon: Mail, href: "#", color: "hover:text-red-500" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        whileHover={{
                          scale: 1.2,
                          rotate: 10,
                          transition: { duration: 0.2 },
                        }}
                        whileTap={{ scale: 0.9 }}
                        href={social.href}
                        className={`p-3 hover:bg-cyan-100 rounded-full text-gray-700 shadow-lg hover:shadow-xl transition-all`}
                      >
                        <social.icon className="h-5 w-5" />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "backOut" }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      rotate: 2,
                      transition: { duration: 0.3 },
                    }}
                    className="w-80 h-80 mx-auto bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center relative"
                  >
                    <motion.div
                      animate={{
                        boxShadow: ["0 0 0 0 rgba(34, 211, 238, 0.4)", "0 0 0 20px rgba(34, 211, 238, 0)"],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-72 h-72 bg-white rounded-full flex items-center justify-center"
                    >
                      <Image
                        src="/assets/ben.jpg"
                        alt="Profile"
                        width={250}
                        height={250}
                        className="rounded-full"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Work Section - Skewed */}
          <section id="work" ref={workRef} className="py-20 px-6 bg-slate-50 relative overflow-hidden">
            {/* Skewed Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-100/50 to-slate-200/50 transform -skew-y-1 origin-top-left"></div>

            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <motion.h2
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-slate-800 mb-4"
                >
                  Featured Work
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-slate-600 max-w-2xl mx-auto"
                >
                  Here are some of my recent projects that showcase my design process and problem-solving approach.
                </motion.p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                className="grid md:grid-cols-2 gap-8"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={scaleIn}
                    whileHover={{
                      y: -15,
                      rotateY: 5,
                      transition: { duration: 0.3 },
                    }}
                    className="group"
                  >
                    <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                      <div className="relative overflow-hidden">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }}>
                          <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            width={400}
                            height={300}
                            className="w-full h-64 object-cover"
                          />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="absolute inset-0 bg-black/20 flex items-end"
                        >
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="secondary"
                              size="sm"
                              className="m-4 bg-white/95 text-slate-800 hover:bg-white"
                              onClick={() => window.open(project.link, "_blank")}
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Project
                            </Button>
                          </motion.div>
                        </motion.div>
                      </div>
                      <CardContent className="p-6">
                        <motion.h3
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          className="text-xl font-semibold text-slate-800 mb-2"
                        >
                          {project.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                          viewport={{ once: true }}
                          className="text-slate-600 mb-4"
                        >
                          {project.description}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                          viewport={{ once: true }}
                          className="flex flex-wrap gap-2"
                        >
                          {project.tags.map((tag, tagIndex) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.1 + tagIndex * 0.05 + 0.3,
                                ease: "backOut",
                              }}
                              viewport={{ once: true }}
                              whileHover={{ scale: 1.1 }}
                              className={`px-3 py-1 bg-cyan-100 text-blue-600 rounded-full text-sm cursor-default shadow-md`}
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                          viewport={{ once: true }}
                          className="mt-4 pt-4 border-t border-slate-200"
                        >
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group"
                          >
                            <span>View Project</span>
                            <motion.div
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                          </motion.a>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Skills Section - Skewed */}
          <section id="skills" ref={skillsRef} className="py-20 px-6 bg-white relative overflow-hidden">
            {/* Skewed Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-slate-50/50 transform skew-y-2 origin-bottom-left"></div>

            <div className="max-w-6xl mx-auto relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <motion.h2
                  initial={{ opacity: 0, rotateX: -90 }}
                  whileInView={{ opacity: 1, rotateX: 0 }}
                  transition={{ duration: 0.6, ease: "backOut" }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-slate-800 mb-4"
                >
                  Skills & Expertise
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-slate-600 max-w-2xl mx-auto"
                >
                  I'm constantly learning and improving my skills to stay current with design trends and technologies.
                </motion.p>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-8"
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={slideInFromBottom}
                    whileHover={{ scale: 1.02 }}
                    className="space-y-2 p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg"
                  >
                    <div className="flex justify-between">
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="text-slate-800 font-semibold"
                      >
                        {skill.name}
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: "backOut" }}
                        viewport={{ once: true }}
                        className="text-slate-600 font-medium"
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: `${skill.level}%`, opacity: 1 }}
                        transition={{
                          duration: 1.5,
                          delay: index * 0.1 + 0.3,
                          ease: "easeOut",
                        }}
                        viewport={{ once: true }}
                        className={`bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full relative shadow-lg`}
                      >
                        <motion.div
                          animate={{
                            boxShadow: [
                              "0 0 5px rgba(236, 72, 153, 0.5)",
                              "0 0 20px rgba(236, 72, 153, 0.8)",
                              "0 0 5px rgba(236, 72, 153, 0.5)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className="absolute inset-0 rounded-full"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Contact Section - Skewed */}
          <section
            id="contact"
            ref={contactRef}
            className="py-20 px-6 bg-gradient-to-br from-blue-500 to-cyan-400 relative overflow-hidden"
          >
            {/* Skewed Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 transform -skew-y-3 origin-top-right"></div>

            {/* Animated Background Pattern */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.5,
                  }}
                  className={`absolute w-32 h-32 rounded-full bg-white`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "backOut" }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-blue-100 mb-6"
                >
                  Let's Work Together
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto"
                >
                  I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your
                  ideas to life.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "backOut" }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-blue-50 group shadow-xl"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Mail className="mr-2 h-5 w-5" />
                    </motion.div>
                    Get In Touch
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Footer - Skewed */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="py-8 px-6 bg-slate-800 text-center relative overflow-hidden"
          >
            {/* Skewed Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-700/20 to-slate-800/20 transform skew-y-1 origin-bottom-left"></div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-slate-400 relative z-10"
            >
              © 2025 Bencollins Azubuike. All rights reserved.
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="text-red-400"
              >
                
              </motion.span>
            </motion.p>
          </motion.footer>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
