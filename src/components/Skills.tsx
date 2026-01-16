import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, Suspense } from "react";
import InteractiveCard from "./InteractiveCard";
import { SkillsScene } from "./Scene3D";

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "from-orange-500 to-red-500" },
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "from-blue-500 to-yellow-400" },
        { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "from-yellow-400 to-yellow-600" },
        { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", color: "from-blue-400 to-blue-600" },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "from-cyan-400 to-blue-500" },
        { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", color: "from-orange-500 to-orange-600" },
        { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", color: "from-blue-500 to-blue-600" },
        { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", color: "from-teal-400 to-cyan-500" },
      ],
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "from-green-500 to-green-700" },
        { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "from-blue-500 to-orange-400" },
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "from-green-500 to-green-600" },
      ],
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", color: "from-blue-500 to-cyan-400" },
        { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "from-orange-400 to-yellow-500" },
        { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "from-orange-500 to-red-500" },
        { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", color: "from-yellow-500 to-orange-500" },
      ],
    },
  ];

  const certifications = [
    { name: "Java Foundations Associate", org: "Oracle", year: "2025", color: "primary", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
    { name: "Azure Fundamentals", org: "Microsoft", year: "2025", color: "secondary", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "OCI Foundations Associate", org: "Oracle", year: "2025", color: "primary", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
    { name: "AWS Cloud Essentials", org: "Coursera", year: "2025", color: "primary", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <SkillsScene />
        </Suspense>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-background/80 via-background/60 to-background/80" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 glass rounded-full text-sm font-medium text-primary mb-4">
            Skills & Expertise
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Technologies I <span className="text-gradient">Master</span>
          </h2>
        </motion.div>

        {/* Skills Grid with Icon Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16" style={{ perspective: "1000px" }}>
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <InteractiveCard className="h-full" glowColor={catIndex % 2 === 0 ? "primary" : "secondary"}>
                <div className="glass-strong rounded-2xl p-6 h-full">
                  <h3 className="text-xl font-semibold font-display mb-6 text-primary flex items-center gap-3">
                    <motion.span 
                      className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-secondary"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {category.skills.map((skill, skillIndex) => {
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.4, delay: 0.3 + catIndex * 0.1 + skillIndex * 0.1 }}
                          whileHover={{ 
                            scale: 1.1, 
                            y: -5,
                            transition: { duration: 0.2 }
                          }}
                          className="group relative"
                        >
                          <div className="glass rounded-xl p-4 flex flex-col items-center gap-3 cursor-default border border-white/5 hover:border-primary/30 transition-all duration-300">
                            {/* Real technology logo */}
                            <motion.div 
                              className="w-16 h-16 rounded-xl bg-white/10 p-2 flex items-center justify-center shadow-lg backdrop-blur-sm"
                              whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                              transition={{ duration: 0.4 }}
                            >
                              <img 
                                src={skill.logo} 
                                alt={skill.name} 
                                className="w-full h-full object-contain drop-shadow-lg"
                              />
                            </motion.div>
                            
                            {/* Skill name */}
                            <span className="text-sm font-medium text-center group-hover:text-primary transition-colors">
                              {skill.name}
                            </span>
                            
                            {/* Animated glow effect on hover */}
                            <motion.div
                              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>

        {/* Certifications with 3D hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold font-display text-center mb-8">
            Certifications
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ perspective: "1000px" }}>
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9, rotateY: -30 }}
                animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 10,
                  rotateX: -5,
                  boxShadow: cert.color === "primary" 
                    ? "0 20px 40px rgba(0,212,255,0.3)" 
                    : "0 20px 40px rgba(124,58,237,0.3)"
                }}
                style={{ transformStyle: "preserve-3d" }}
                className={`glass rounded-xl p-5 text-center cursor-default border-l-4 ${
                  cert.color === "primary" ? "border-l-primary" : "border-l-secondary"
                }`}
              >
                <motion.div 
                  className="w-12 h-12 mx-auto mb-3 flex items-center justify-center"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img 
                    src={cert.logo} 
                    alt={cert.org} 
                    className="w-full h-full object-contain drop-shadow-lg"
                  />
                </motion.div>
                <h4 className="font-semibold text-sm mb-1">{cert.name}</h4>
                <p className="text-xs text-muted-foreground">{cert.org} • {cert.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
