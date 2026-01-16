import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Code2 } from "lucide-react";
import InteractiveCard from "./InteractiveCard";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "5+", label: "Certifications" },
    { value: "4+", label: "Projects" },
    { value: "7.3", label: "CGPA" },
    { value: "2027", label: "Graduation" },
  ];

  const infoCards = [
    {
      icon: GraduationCap,
      title: "B.Tech in Information Technology",
      subtitle: "Alliance University, Bengaluru",
      extra: "Expected Graduation: 2027",
      color: "primary"
    },
    {
      icon: MapPin,
      title: "Based in Karnataka, India",
      subtitle: "Open to remote opportunities and collaborations worldwide",
      color: "secondary"
    },
    {
      icon: Code2,
      title: "Cloud & DevOps enthusiast",
      subtitle: "Specializing in React, Node.js, Java, and Cloud Technologies",
      color: "primary"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-secondary/5 blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -20, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-primary mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Turning Ideas Into <span className="text-gradient">Reality</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center" style={{ perspective: "1000px" }}>
          {/* Left - Info Cards with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {infoCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: -30, rotateY: -15 }}
                animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <InteractiveCard glowColor={card.color}>
                  <div className="glass-strong rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <motion.div 
                        className={`w-12 h-12 rounded-xl ${card.color === 'primary' ? 'bg-primary/20' : 'bg-secondary/20'} flex items-center justify-center shrink-0`}
                        whileHover={{ rotateY: 180, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <card.icon className={card.color === 'primary' ? 'text-primary' : 'text-secondary'} size={24} />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{card.title}</h3>
                        <p className="text-muted-foreground text-sm">{card.subtitle}</p>
                        {card.extra && (
                          <p className="text-primary text-sm mt-1">{card.extra}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </InteractiveCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Right - Description & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-8"
          >
            <motion.p 
              className="text-muted-foreground leading-relaxed text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              I'm a dedicated IT student with a passion for creating innovative solutions. 
              With certifications from <span className="text-primary font-medium">Oracle</span>, 
              <span className="text-secondary font-medium"> Microsoft</span>, and 
              <span className="text-primary font-medium"> AWS</span>, I bring a strong foundation 
              in both development and cloud technologies.
            </motion.p>
            <motion.p 
              className="text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              My journey spans from building IoT-powered systems like Smart Trans Bin 
              to developing AI-powered agricultural solutions. I thrive on challenges 
              and continuously push myself to learn and grow.
            </motion.p>

            {/* Stats Grid with 3D cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8" style={{ perspective: "800px" }}>
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, rotateX: -30 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.1, 
                    rotateY: 10,
                    rotateX: -5,
                    boxShadow: "0 20px 40px rgba(0,212,255,0.3)"
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="glass rounded-xl p-4 text-center transition-all cursor-default"
                >
                  <motion.div 
                    className="text-2xl md:text-3xl font-bold text-gradient"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ type: "spring", delay: 0.6 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
