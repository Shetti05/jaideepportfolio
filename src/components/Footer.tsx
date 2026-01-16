import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-muted-foreground flex items-center gap-1"
          >
            Made with <Heart size={14} className="text-primary" /> by Jaideep Shetti
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm text-muted-foreground"
          >
            © 2025 All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
