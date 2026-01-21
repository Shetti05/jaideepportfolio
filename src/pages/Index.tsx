import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StarBackground from "@/components/StarBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-transparent relative select-none">
      <StarBackground />
      <Navbar />
      <Hero />
      <div className="relative z-10 space-y-0">
        <About />
        <Skills />
        <Certificates />
        <Projects />
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
