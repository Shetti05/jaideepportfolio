import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download, Sparkles, Zap, Code2 } from "lucide-react";
import { Suspense } from "react";
import profileImg from "@/assets/profile.jpg";
import { HeroScene } from "./Scene3D";

// Floating particle component
const FloatingParticle = ({ delay, duration, x, y, size }: { delay: number; duration: number; x: string; y: string; size: number }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-primary to-secondary"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, -15, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated ring component
const AnimatedRing = ({ size, delay, reverse }: { size: number; delay: number; reverse?: boolean }) => (
  <motion.div
    className="absolute rounded-full border-2 border-primary/20"
    style={{ width: size, height: size, left: '50%', top: '50%', marginLeft: -size/2, marginTop: -size/2 }}
    animate={{
      rotate: reverse ? -360 : 360,
      scale: [1, 1.05, 1],
    }}
    transition={{
      rotate: { duration: 20 + delay * 5, repeat: Infinity, ease: "linear" },
      scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay },
    }}
  />
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-background" />}>
          <HeroScene />
        </Suspense>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <FloatingParticle delay={0} duration={4} x="10%" y="20%" size={6} />
        <FloatingParticle delay={0.5} duration={5} x="85%" y="30%" size={8} />
        <FloatingParticle delay={1} duration={4.5} x="70%" y="70%" size={5} />
        <FloatingParticle delay={1.5} duration={5.5} x="20%" y="80%" size={7} />
        <FloatingParticle delay={2} duration={4} x="50%" y="10%" size={4} />
        <FloatingParticle delay={0.8} duration={6} x="90%" y="60%" size={6} />
        <FloatingParticle delay={1.2} duration={5} x="5%" y="50%" size={5} />
        <FloatingParticle delay={2.5} duration={4.5} x="40%" y="85%" size={8} />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none" style={{ 
        background: 'radial-gradient(ellipse at center, transparent 0%, hsl(222 47% 6% / 0.6) 60%, hsl(222 47% 6% / 0.95) 100%)' 
      }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Image with Enhanced 3D Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, type: "spring" }}
            className="relative"
            style={{ perspective: "1000px" }}
          >
            {/* Animated Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatedRing size={280} delay={0} />
              <AnimatedRing size={320} delay={1} reverse />
              <AnimatedRing size={360} delay={2} />
            </div>

            <motion.div
              className="relative"
              whileHover={{ 
                rotateY: 15, 
                rotateX: -10,
                scale: 1.05,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glow effect */}
              <motion.div 
                className="absolute -inset-3 rounded-full bg-gradient-to-r from-primary via-secondary to-primary blur-xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Profile image */}
              <img
                src={profileImg}
                alt="Jaideep Shetti"
                className="relative w-52 h-52 md:w-72 md:h-72 rounded-full object-cover border-4 border-primary/50 shadow-2xl"
                style={{ transform: "translateZ(50px)" }}
              />
              
              {/* Animated border overlay */}
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-transparent"
                style={{
                  background: 'linear-gradient(45deg, transparent 30%, rgba(0,212,255,0.5) 50%, transparent 70%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Floating icons */}
            <motion.div
              className="absolute -bottom-2 -right-2 w-16 h-16 rounded-2xl glass flex items-center justify-center shadow-lg"
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Code2 className="w-8 h-8 text-primary" />
            </motion.div>
            
            <motion.div
              className="absolute -top-2 -left-2 w-14 h-14 rounded-2xl glass flex items-center justify-center shadow-lg"
              animate={{ 
                y: [0, 8, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Zap className="w-7 h-7 text-secondary" />
            </motion.div>
            
            <motion.div
              className="absolute top-1/2 -right-8 w-12 h-12 rounded-xl glass flex items-center justify-center shadow-lg"
              animate={{ 
                x: [0, 5, 0],
                y: [0, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -30 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.span 
                className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium text-primary mb-6 backdrop-blur-xl"
                animate={{ boxShadow: ["0 0 20px rgba(0,212,255,0.2)", "0 0 30px rgba(0,212,255,0.4)", "0 0 20px rgba(0,212,255,0.2)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  animate={{ rotate: [0, 20, -20, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  👋
                </motion.span>
                Welcome to my portfolio
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-4"
            >
              I'm <motion.span 
                className="text-gradient glow-text inline-block"
                animate={{ 
                  textShadow: [
                    "0 0 20px rgba(0,212,255,0.5)",
                    "0 0 40px rgba(0,212,255,0.8)",
                    "0 0 20px rgba(0,212,255,0.5)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Jaideep Shetti
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8"
            >
              A passionate <span className="text-primary font-semibold">Full Stack Developer</span> & 
              <span className="text-secondary font-semibold"> Cloud Enthusiast</span> building innovative 
              solutions with modern technologies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10"
            >
              <motion.a
                href="#projects"
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-cyan-400 text-primary-foreground font-semibold overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0,212,255,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-primary"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <motion.a
                href="/cv.pdf"
                download="Jaideep_Shetti_CV.pdf"
                className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-secondary to-purple-500 text-white font-semibold overflow-hidden flex items-center gap-2"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(124,58,237,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                <span>Download CV</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-secondary"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <motion.a
                href="#contact"
                className="px-8 py-4 rounded-xl glass hover:border-primary/50 font-semibold"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,58,237,0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {[
                { icon: Github, href: "https://github.com", label: "GitHub", color: "hover:text-white" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn", color: "hover:text-blue-400" },
                { icon: Mail, href: "mailto:Jaideepshetti55@gmail.com", label: "Email", color: "hover:text-red-400" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 rounded-xl glass flex items-center justify-center text-muted-foreground ${social.color} transition-all`}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.15,
                    boxShadow: "0 15px 40px rgba(0,212,255,0.4)",
                    rotateY: 15
                  }}
                  initial={{ opacity: 0, y: 20, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <social.icon size={22} />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator with 3D effect */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.a 
          href="#about" 
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-sm">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={20} />
          </motion.div>
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
