import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, rotateX: -30 }}
      animate={{ y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-strong py-3" : "py-5"
      }`}
      style={{ perspective: "1000px" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo with 3D effect */}
          <motion.a
            href="#"
            whileHover={{ scale: 1.1, rotateY: 15 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold font-display"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="text-gradient">J</span>aideep
            <motion.span 
              className="text-primary inline-block"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              .
            </motion.span>
          </motion.a>

          {/* Desktop Nav with 3D hover */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -20, rotateX: -30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -3,
                  color: "hsl(186, 100%, 50%)"
                }}
                className="text-sm font-medium text-muted-foreground transition-colors relative group"
              >
                {link.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ 
                scale: 1.1, 
                boxShadow: "0 0 30px rgba(0,212,255,0.5)",
                rotateY: 10
              }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-cyan-400 text-primary-foreground text-sm font-semibold transition-all"
              style={{ transformStyle: "preserve-3d" }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg glass"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ x: -20, opacity: 0 }}
                animate={isMobileMenuOpen ? { x: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10, color: "hsl(186, 100%, 50%)" }}
                className="block text-sm font-medium text-muted-foreground transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              whileHover={{ scale: 1.05 }}
              className="inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-primary to-cyan-400 text-primary-foreground text-sm font-semibold"
            >
              Hire Me
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
