import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const SmoothCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // More responsive spring configuration
    const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const checkTouch = () => {
            setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
        };
        checkTouch();

        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!isVisible) setIsVisible(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                target.closest('button') ||
                target.closest('a') ||
                target.closest('[role="button"]') ||
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsHovering(!!isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [mouseX, mouseY, isVisible, isTouchDevice]);

    if (isTouchDevice) return null;

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300"
            style={{ opacity: isVisible ? 1 : 0 }}
        >
            {/* Main Outer Ring */}
            <motion.div
                className="absolute top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-primary/50 rounded-full will-change-transform"
                style={{
                    x: springX,
                    y: springY,
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(34, 211, 238, 0.15)" : "rgba(34, 211, 238, 0.05)",
                    borderColor: isHovering ? "rgba(34, 211, 238, 1)" : "rgba(34, 211, 238, 0.5)",
                }}
                transition={{
                    scale: { type: "spring", stiffness: 400, damping: 25 },
                    backgroundColor: { duration: 0.2 },
                }}
            />
            {/* Center Dot */}
            <motion.div
                className="absolute top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-primary rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] will-change-transform"
                style={{
                    x: springX,
                    y: springY,
                    scale: isHovering ? 0.5 : 1,
                }}
            />
        </div>
    );
};

export default SmoothCursor;
