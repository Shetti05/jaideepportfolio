import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, Suspense } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, ExternalLink } from "lucide-react";
import InteractiveCard from "./InteractiveCard";
import { ContactScene } from "./Scene3D";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => setIsSending(false), 2000);
    console.log(formData);
  };

  const contactInfo = [
    { icon: Mail, label: "Email1", value: "Jaideepshetti55@gmail.com", href: "mailto:Jaideepshetti55@gmail.com" },
     { icon: Mail, label: "Email2", value: "officialjaideep05@gmail.com", href: "mailto:officialjaideep05@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91-7899338305", href: "tel:+917899338305" },
    { icon: MapPin, label: "Location", value: "Bengaluru, Karnataka", href: null },
  ];

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
    { icon: ExternalLink, label: "LeetCode", href: "https://leetcode.com" },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <ContactScene />
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
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12" style={{ perspective: "1000px" }}>
          {/* Contact Form with 3D effect */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotateY: 15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InteractiveCard glowColor="primary">
              <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="John Doe"
                    required
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 20px rgba(0,212,255,0.2)" }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="john@example.com"
                    required
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 20px rgba(0,212,255,0.2)" }}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <motion.textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                    required
                    whileFocus={{ scale: 1.01, boxShadow: "0 0 20px rgba(0,212,255,0.2)" }}
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isSending}
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,212,255,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-cyan-400 text-primary-foreground font-semibold flex items-center justify-center gap-2 transition-all relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-primary"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    <motion.span
                      animate={isSending ? { rotate: 360 } : {}}
                      transition={{ duration: 1, repeat: isSending ? Infinity : 0 }}
                    >
                      <Send size={18} />
                    </motion.span>
                    {isSending ? "Sending..." : "Send Message"}
                  </span>
                </motion.button>
              </form>
            </InteractiveCard>
          </motion.div>

          {/* Contact Info with 3D cards */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Cards with 3D hover */}
            {contactInfo.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,212,255,0.2)"
                }}
                style={{ transformStyle: "preserve-3d" }}
                className="glass-strong rounded-xl p-5 transition-all cursor-pointer"
              >
                {item.href ? (
                  <a href={item.href} className="flex items-center gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0"
                      whileHover={{ rotateY: 180, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <item.icon className="text-primary" size={22} />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium hover:text-primary transition-colors">{item.value}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0"
                      whileHover={{ rotateY: 180, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <item.icon className="text-secondary" size={22} />
                    </motion.div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Social Links with 3D effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="glass-strong rounded-xl p-6"
              style={{ perspective: "500px" }}
            >
              <h3 className="font-semibold mb-4">Connect on Social</h3>
              <div className="flex gap-4">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      rotateY: 20,
                      rotateX: -10,
                      boxShadow: "0 15px 30px rgba(0,212,255,0.3)"
                    }}
                    initial={{ opacity: 0, rotateY: -30 }}
                    animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-12 h-12 rounded-xl glass flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Note with 3D entrance */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
              whileHover={{ scale: 1.02, rotateX: -5 }}
              className="glass rounded-xl p-6 border-l-4 border-l-primary"
            >
              <motion.p 
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 1 }}
              >
                💡 <span className="text-foreground font-medium">Pro tip:</span> I typically respond within 24 hours. For urgent matters, feel free to reach out via phone!
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
