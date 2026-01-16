import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, Suspense } from "react";
import { ExternalLink, Github, Cpu, Database, Mic, Leaf } from "lucide-react";
import InteractiveCard from "./InteractiveCard";
import { ProjectsScene } from "./Scene3D";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Smart Trans Bin",
      description: "IoT-powered smart garbage bin with fill-level monitoring, automatic lid opening, and real-time data transmission for efficient waste management.",
      tech: ["Arduino", "IoT Sensors", "Embedded C"],
      icon: Cpu,
      color: "from-cyan-500 to-blue-500",
      featured: true,
    },
    {
      title: "Banking Management System",
      description: "Full-featured banking application with account management, transactions, and secure authentication using Java and MySQL database.",
      tech: ["Java", "JDBC", "MySQL"],
      icon: Database,
      color: "from-violet-500 to-purple-500",
      featured: true,
    },
    {
      title: "Voice-Controlled Wheelchair",
      description: "Assistive technology project enabling mobility-impaired individuals to control wheelchair movement through voice commands.",
      tech: ["Arduino", "Voice Recognition", "Motor Driver"],
      icon: Mic,
      color: "from-emerald-500 to-teal-500",
      featured: false,
    },
    {
      title: "Farm360: AI Cloud ERP",
      description: "AI-powered comprehensive farm management system using NSGA-II optimization for dairy and agricultural operations. Currently in development.",
      tech: ["AI/ML", "Cloud", "NSGA-II"],
      icon: Leaf,
      color: "from-orange-500 to-amber-500",
      featured: true,
      ongoing: true,
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ProjectsScene />
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
            Featured Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical projects spanning IoT, software development, and AI-powered solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8" style={{ perspective: "1000px" }}>
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <InteractiveCard 
                className="h-full" 
                glowColor={index % 2 === 0 ? "primary" : "secondary"}
              >
                <div className={`group relative glass-strong rounded-2xl overflow-hidden h-full ${
                  project.featured ? "md:col-span-1" : ""
                }`}>
                  {/* Gradient Top Border */}
                  <motion.div 
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color}`}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  />
                  
                  {/* Ongoing Badge */}
                  {project.ongoing && (
                    <motion.div 
                      className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium z-10"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🚀 In Progress
                    </motion.div>
                  )}

                  <div className="p-8">
                    {/* Icon with 3D rotation */}
                    <motion.div 
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${project.color} flex items-center justify-center mb-6`}
                      whileHover={{ 
                        rotateY: 180,
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.5 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <project.icon className="text-white" size={32} />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold font-display mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack with staggered animation */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.5 + index * 0.1 + techIndex * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className="px-3 py-1 rounded-full bg-muted/80 text-muted-foreground text-xs font-medium backdrop-blur-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05, rotateZ: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg glass text-sm font-medium hover:border-primary/50 transition-all"
                      >
                        <Github size={16} />
                        Code
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, rotateZ: 2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-all"
                      >
                        <ExternalLink size={16} />
                        Demo
                      </motion.button>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div 
                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-r ${project.color} blur-2xl -z-10`}
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  />
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
