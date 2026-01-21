import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const StarBackground = () => {
    const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();
    const yTranslate = useTransform(scrollYProgress, [0, 1], [0, -200]);

    useEffect(() => {
        const generateStars = () => {
            const starCount = 150;
            const newStars = Array.from({ length: starCount }).map((_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 2 + 1,
                duration: Math.random() * 3 + 2,
            }));
            setStars(newStars);
        };

        generateStars();
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#030712]">
            <motion.div
                ref={containerRef}
                style={{ y: yTranslate }}
                className="absolute inset-0 w-full h-[120%]"
            >
                {stars.map((star) => (
                    <motion.div
                        key={star.id}
                        className="absolute rounded-full bg-white"
                        style={{
                            left: `${star.x}%`,
                            top: `${star.y}%`,
                            width: star.size,
                            height: star.size,
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: star.duration,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5,
                        }}
                    />
                ))}
            </motion.div>

            {/* Subtle Nebula Glares */}
            <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] bg-primary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vh] bg-secondary/5 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDelay: "2s" }} />
        </div>
    );
};

export default StarBackground;
