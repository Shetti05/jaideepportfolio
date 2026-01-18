import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, Suspense } from "react";
import { Award, X, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { CertificatesScene } from "./Scene3D";

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  image: string;
  verifyUrl?: string;
  category: "cloud" | "programming" | "data" | "devops" | "networking";
}

const certificates: Certificate[] = [
  // Top 5 - Most Important Certifications
  {
    name: "OCI 2025 Certified DevOps Professional",
    issuer: "Oracle",
    date: "September 2025",
    image: "/certificates/oci-devops-professional.jpg",
    category: "devops",
  },
  {
    name: "Java Certified Foundations Associate",
    issuer: "Oracle",
    date: "August 2025",
    image: "/certificates/java-certified-foundations-associate.jpg",
    category: "programming",
  },
  {
    name: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    date: "July 2025",
    image: "/certificates/microsoft-azure-fundamentals.jpg",
    verifyUrl: "https://verify.certiport.com",
    category: "cloud",
  },
  {
    name: "OCI 2025 Certified Foundations Associate",
    issuer: "Oracle",
    date: "August 2025",
    image: "/certificates/oci-foundations-associate.jpg",
    category: "cloud",
  },
  {
    name: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services",
    date: "March 2025",
    image: "/certificates/aws-cloud-technical-essentials.jpg",
    verifyUrl: "https://coursera.org/verify/1KTP31F9N1OS",
    category: "cloud",
  },
  // Remaining Certifications
  {
    name: "Oracle Data Platform 2025 Foundations",
    issuer: "Oracle",
    date: "August 2025",
    image: "/certificates/oracle-data-platform-foundations.jpg",
    category: "data",
  },
  {
    name: "Regression Analysis: Complex Data",
    issuer: "Google",
    date: "October 2025",
    image: "/certificates/regression-analysis-google.jpg",
    verifyUrl: "https://coursera.org/verify/WPRIOI5P9M4O",
    category: "data",
  },
  {
    name: "Bits and Bytes of Computer Networking",
    issuer: "Google",
    date: "November 2024",
    image: "/certificates/bits-bytes-networking-google.jpg",
    verifyUrl: "https://coursera.org/verify/DSAT5PB79X76",
    category: "networking",
  },
  {
    name: "Essentials with Azure Fundamentals",
    issuer: "Microsoft",
    date: "July 2025",
    image: "/certificates/azure-fundamentals-essentials.jpg",
    verifyUrl: "https://coursera.org/verify/DQTL30FRDAZ1",
    category: "cloud",
  },
  {
    name: "DevOps on AWS: Code, Build, and Test",
    issuer: "Amazon Web Services",
    date: "July 2025",
    image: "/certificates/devops-aws-code-build-test.jpg",
    verifyUrl: "https://coursera.org/verify/70VY2RJI1KGG",
    category: "devops",
  },
  {
    name: "AI Principles with Edge Computing",
    issuer: "L&T EduTech",
    date: "October 2025",
    image: "/certificates/ai-principles-edge-computing.jpg",
    verifyUrl: "https://coursera.org/verify/3W41WGF9VRB8",
    category: "cloud",
  },
  {
    name: "Data Warehouse Fundamentals",
    issuer: "IBM",
    date: "October 2025",
    image: "/certificates/data-warehouse-fundamentals.jpg",
    verifyUrl: "https://coursera.org/verify/TUELSEOECZYS",
    category: "data",
  },
  {
    name: "Cloud Computing Primer: SaaS",
    issuer: "Codio",
    date: "March 2025",
    image: "/certificates/cloud-computing-saas.jpg",
    verifyUrl: "https://coursera.org/verify/NJCL3FSO180S",
    category: "cloud",
  },
  {
    name: "Introduction to Computers",
    issuer: "Microsoft",
    date: "July 2025",
    image: "/certificates/introduction-to-computers.jpg",
    verifyUrl: "https://coursera.org/verify/JG7N96JW7B8U",
    category: "programming",
  },
  {
    name: "Introduction to OOP with Java",
    issuer: "LearnQuest",
    date: "October 2024",
    image: "/certificates/intro-oop-java.jpg",
    verifyUrl: "https://coursera.org/verify/2JOO9PQB31LX",
    category: "programming",
  },
  {
    name: "Introduction to Machine Learning",
    issuer: "NPTEL / IIT Kharagpur",
    date: "Sep 2025",
    image: "/certificates/intro-machine-learning-nptel.jpg",
    category: "data",
  },
];

const categoryColors = {
  cloud: "from-cyan-500 to-blue-600",
  programming: "from-orange-500 to-red-500",
  data: "from-green-500 to-emerald-600",
  devops: "from-purple-500 to-pink-500",
  networking: "from-yellow-500 to-amber-600",
};

const categoryLabels = {
  cloud: "Cloud",
  programming: "Programming",
  data: "Data",
  devops: "DevOps",
  networking: "Networking",
};

const INITIAL_VISIBLE_COUNT = 5;

const Certificates = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCert, setExpandedCert] = useState<Certificate | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleCertificates = showAll 
    ? certificates 
    : certificates.slice(0, INITIAL_VISIBLE_COUNT);
  
  const hiddenCount = certificates.length - INITIAL_VISIBLE_COUNT;

  return (
    <section id="certificates" className="py-24 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <CertificatesScene />
        </Suspense>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background z-[1]" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse z-[1]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse z-[1]" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm font-medium text-primary mb-4">
            <Award className="w-4 h-4" />
            Verified Credentials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            My <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {certificates.length} professional certifications from industry leaders. Hover over any certificate to view the full credential.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid gap-4">
          <AnimatePresence mode="popLayout">
            {visibleCertificates.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                layout
                className="group relative"
              >
                <div 
                  className="glass rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer
                             border border-white/5 hover:border-primary/30 transition-all duration-300
                             hover:shadow-lg hover:shadow-primary/10"
                  onClick={() => setExpandedCert(cert)}
                >
                  {/* Left side - Certificate info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Category indicator */}
                    <div className={`w-1.5 h-12 rounded-full bg-gradient-to-b ${categoryColors[cert.category]}`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full bg-gradient-to-r ${categoryColors[cert.category]} text-white font-medium`}>
                          {categoryLabels[cert.category]}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {cert.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} • {cert.date}
                      </p>
                    </div>
                  </div>

                  {/* Right side - Thumbnail */}
                  <motion.div 
                    className="relative w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden flex-shrink-0
                               border-2 border-white/10 group-hover:border-primary/50 transition-all duration-300
                               shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img 
                      src={cert.image} 
                      alt={cert.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Hover overlay with magnifying glass effect */}
                    <motion.div 
                      className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <ExternalLink className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More / Show Less Button */}
        {hiddenCount > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex justify-center mt-8"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-3 glass rounded-full
                       border border-white/10 hover:border-primary/50 transition-all duration-300
                       hover:shadow-lg hover:shadow-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                {showAll ? "Show Less" : `See ${hiddenCount} More Certificates`}
              </span>
              <motion.div
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {showAll ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary" />
                )}
              </motion.div>
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Expanded Certificate Modal */}
      <AnimatePresence>
        {expandedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setExpandedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              style={{ perspective: "1000px" }}
            >
              {/* Close button */}
              <button
                onClick={() => setExpandedCert(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center
                         hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Certificate image */}
              <motion.div
                className="rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border-2 border-white/10"
                whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 212, 255, 0.3)" }}
              >
                <img 
                  src={expandedCert.image} 
                  alt={expandedCert.name}
                  className="w-full h-auto"
                />
              </motion.div>

              {/* Certificate info bar */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 glass rounded-xl p-4 flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold text-lg text-foreground">{expandedCert.name}</h3>
                  <p className="text-sm text-muted-foreground">{expandedCert.issuer} • {expandedCert.date}</p>
                </div>
                {expandedCert.verifyUrl && (
                  <a
                    href={expandedCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground
                             hover:bg-primary/90 transition-colors font-medium text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Verify Certificate
                  </a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
