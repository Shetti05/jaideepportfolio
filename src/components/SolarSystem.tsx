import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Html, Text, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { FloatingLogo } from "./Scene3D";

// Tech Stack Data
const TECH_GROUPS = [
    // Inner Orbit: Web & Frontend (Fast)
    {
        radius: 6,
        speed: 0.1,
        items: [
            { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
            { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
            { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
            { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
            { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
            { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
            { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
            { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
            { name: "Redux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
            { name: "Sass", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
        ]
    },
    // Middle Orbit: Backend & Apps (Medium)
    {
        radius: 9,
        speed: 0.06,
        items: [
            { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
            { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
            { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
            { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
            { name: "Arduino", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
            { name: "RaspberryPi", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
            { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
            { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
            { name: "Firebase", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
            { name: "Flutter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
        ]
    },
    // Outer Orbit: Cloud, DevOps & Tools (Slow)
    {
        radius: 12,
        speed: 0.03,
        items: [
            { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
            { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
            { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
            { name: "Terraform", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
            { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
            { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
            { name: "Jenkins", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
            { name: "Nginx", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
            { name: "Azure", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
            { name: "GCP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" },
        ]
    }
];

const TechIcon = ({
    position,
    url,
    name,
    orbitSpeed = 1
}: {
    position: [number, number, number];
    url: string;
    name: string;
    orbitSpeed?: number;
}) => {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);

    const [error, setError] = useState(false);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin('anonymous');
        loader.load(
            url,
            (tex) => setTexture(tex),
            undefined,
            () => setError(true) // Handle loading errors
        );
    }, [url]);

    useFrame((state, delta) => {
        if (meshRef.current && texture) {
            // Smoothly look at the camera
            const targetQuaternion = new THREE.Quaternion();
            const originalRotation = meshRef.current.rotation.clone();
            meshRef.current.lookAt(state.camera.position);
            targetQuaternion.copy(meshRef.current.quaternion);
            meshRef.current.rotation.copy(originalRotation);

            meshRef.current.quaternion.slerp(targetQuaternion, 0.1);
        }
    });

    if (error || !texture) return null;

    return (
        <group
            ref={meshRef}
            position={position}
        >
            <mesh
                onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
            >
                <planeGeometry args={[0.8, 0.8]} />
                <meshStandardMaterial
                    map={texture}
                    transparent={true}
                    alphaTest={0.5}
                    emissive={hovered ? "#00ffff" : "#000000"}
                    emissiveIntensity={hovered ? 0.8 : 0}
                    toneMapped={false}
                />
            </mesh>

            {/* Name Tag (Always visible or hover only? Let's keep hover for clean look) */}
            <Html
                position={[0, -0.6, 0]}
                center
                style={{
                    opacity: hovered ? 1 : 0,
                    transition: 'opacity 0.2s',
                    pointerEvents: 'none'
                }}
            >
                <div className="bg-black/90 text-cyan-400 px-2 py-1 rounded text-[10px] whitespace-nowrap border border-cyan-500/30 backdrop-blur-md shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                    {name}
                </div>
            </Html>
        </group>
    );
};

const OrbitRing = ({ radius, speed }: { radius: number, speed: number }) => {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z = state.clock.getElapsedTime() * speed * 0.1;
            ref.current.rotation.x = Math.PI / 2; // Lie flat
        }
    });

    return (
        <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[radius - 0.02, radius + 0.02, 128]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} side={THREE.DoubleSide} />
        </mesh>
    );
};

const OrbitGroup = ({
    items,
    radius,
    speed
}: {
    items: { name: string; url: string }[];
    radius: number;
    speed: number;
}) => {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            // Rotate the entire orbit group Y-axis
            groupRef.current.rotation.y = state.clock.getElapsedTime() * speed * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            <OrbitRing radius={radius} speed={speed} />
            {items.map((item, i) => {
                // Distribute items evenly along the circle
                const angle = (i / items.length) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;

                return (
                    <TechIcon
                        key={item.name}
                        position={[x, 0, z]}
                        url={item.url}
                        name={item.name}
                    />
                );
            })}
        </group>
    );
};

export const SolarSystem = () => {
    return (
        <Canvas
            camera={{ position: [0, 8, 22], fov: 50 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            gl={{
                alpha: true,
                antialias: true,
                powerPreference: "high-performance",
                precision: "lowp" // Lower precision for performance on integrated GPUs
            }}
            dpr={[1, 1.5]} // Limit high DPI overhead
            performance={{ min: 0.5 }} // Allow framedrops to maintain interactivity
        >
            <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
                <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />

                {/* Tilt the whole system slightly for a better cinematic view */}
                <group rotation={[0, 0, Math.PI / 12]} position={[5, 2, 0]}> {/* Shifted Right & Up */}
                    {TECH_GROUPS.map((group, i) => (
                        <OrbitGroup
                            key={i}
                            items={group.items}
                            radius={group.radius}
                            speed={group.speed}
                        />
                    ))}
                </group>

                {/* Floating Tech Logos - Hero Background */}
                <FloatingLogo position={[-12, 5, -10]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" size={2.5} speed={0.8} />
                <FloatingLogo position={[12, -5, -10]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" size={2} speed={1} />
                <FloatingLogo position={[0, -10, -15]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" size={3.5} speed={0.6} />
                <FloatingLogo position={[-10, -5, -12]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" size={2} speed={0.9} />
                <FloatingLogo position={[10, 8, -12]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" size={2.2} speed={0.7} />
                <FloatingLogo position={[-15, -8, -15]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" size={1.8} speed={0.85} />
                <FloatingLogo position={[15, 2, -18]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" size={1.5} speed={0.75} />

                {/* Background Stars - Subtle deep space feel */}
                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />

                {/* Allow subtle rotation control but disable Zoom/Pan to break the illusion */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2} // Restrict vertical movement to keep view stable
                    minPolarAngle={Math.PI / 3}
                />
            </Suspense>
        </Canvas>
    );
};
