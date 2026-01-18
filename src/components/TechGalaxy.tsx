import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Stars, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";

// Logo Data with URLs
const LOGOS = [
    // Web Dev
    { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },

    // Cloud & DevOps
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Jenkins", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
    { name: "Terraform", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg" },
    { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },

    // IoT
    { name: "Raspberry Pi", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg" },
    { name: "Arduino", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" },
    { name: "MQTT", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mqtt/mqtt-original.svg" }, // Fallback or find specific icon if available, generic connect otherwise
];

const TechIcon = ({
    position,
    url,
    name
}: {
    position: [number, number, number];
    url: string;
    name: string;
}) => {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);



    // Load texture manually to handle loading states/errors gracefully if needed
    useEffect(() => {
        new THREE.TextureLoader().load(url, (tex) => {
            setTexture(tex);
        });
    }, [url]);

    useFrame((state) => {
        if (meshRef.current) {
            // Billboard effect: make the icon always face the camera
            meshRef.current.lookAt(state.camera.position);
        }
    });

    if (!texture) return null;

    return (
        <Float floatIntensity={2} rotationIntensity={0} speed={2}>
            <group
                ref={meshRef}
                position={position}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
            >
                <mesh>
                    <planeGeometry args={[0.8, 0.8]} />
                    <meshStandardMaterial
                        map={texture}
                        transparent={true}
                        alphaTest={0.5}
                        // Glow effect on hover
                        emissive={hovered ? "#00ffff" : "#000000"}
                        emissiveIntensity={hovered ? 0.5 : 0}
                        toneMapped={false}
                    />
                </mesh>

                {/* Helper Name Tag appearing on Hover */}
                {hovered && (
                    <Html position={[0, -0.6, 0]} center distanceFactor={8}>
                        <div className="bg-black/80 text-cyan-400 px-2 py-1 rounded text-xs whitespace-nowrap border border-cyan-500/30 backdrop-blur-md">
                            {name}
                        </div>
                    </Html>
                )}
            </group>
        </Float>
    );
};

export const TechGalaxy = () => {
    // Generate spherical positions
    const icons = useMemo(() => {
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        return LOGOS.map((logo, i) => {
            const y = 1 - (i / (LOGOS.length - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);

            const theta = phi * i;

            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            // Scale the sphere radius
            const R = 3.5;
            return {
                ...logo,
                position: [x * R, y * R, z * R] as [number, number, number]
            };
        });
    }, []);

    return (
        <div className="w-full h-[500px] lg:h-[600px] relative z-10">
            <Canvas camera={{ position: [0, 0, 7], fov: 60 }} gl={{ alpha: true, antialias: true }}>
                {/* Lights */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#22d3ee" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a855f7" />

                {/* Content */}
                <group rotation={[0, 0, Math.PI / 6]}> {/* Slight tilt */}
                    {icons.map((icon, idx) => (
                        <TechIcon
                            key={idx}
                            position={icon.position}
                            url={icon.url}
                            name={icon.name}
                        />
                    ))}

                    {/* Central Core - Optional */}
                    <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                        <mesh>
                            <icosahedronGeometry args={[1, 0]} />
                            <meshStandardMaterial
                                color="#020617"
                                wireframe
                                emissive="#22d3ee"
                                emissiveIntensity={0.8}
                            />
                        </mesh>
                    </Float>
                </group>

                {/* Controls */}
                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.8}
                    enablePan={false}
                />

                {/* Stars Background specifically for this widget area */}
                {/* We can disable this if we want to see the main background instead */}
                {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
            </Canvas>
        </div>
    );
};
