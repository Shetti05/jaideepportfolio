import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, Stars, CatmullRomLine } from "@react-three/drei";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect, Suspense } from "react";
import { FloatingLogo } from "./Scene3D";

// Reuse the skill data structure but flattened for the DNA helix
const SKILLS_DATA = [
    { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "C", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "MySQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Azure", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
    { name: "AWS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Linux", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    // Repeats or extras to make the helix longer
    { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Kubernetes", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
    { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
];

const DNAIcon = ({ position, url, name }: { position: [number, number, number], url: string, name: string }) => {
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const [hovered, setHovered] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.setCrossOrigin('anonymous');
        loader.load(
            url,
            (tex) => setTexture(tex),
            undefined,
            () => setError(true)
        );
    }, [url]);

    if (error || !texture) return null;

    return (
        <group position={position}>
            <mesh
                onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
                lookAt={() => new THREE.Vector3(0, 0, 100)} // Approximate lookAt camera
            >
                <planeGeometry args={[0.6, 0.6]} />
                <meshStandardMaterial
                    map={texture}
                    transparent
                    alphaTest={0.5}
                    side={THREE.DoubleSide}
                    emissive={hovered ? "#00ffff" : "#000000"}
                    emissiveIntensity={hovered ? 0.5 : 0}
                    toneMapped={false}
                />
            </mesh>
            {hovered && (
                <Html position={[0, -0.5, 0]} center>
                    <div className="bg-black/90 text-cyan-400 px-2 py-1 rounded text-[10px] border border-cyan-500/30 whitespace-nowrap">
                        {name}
                    </div>
                </Html>
            )}
        </group>
    );
};

const HelixStrand = () => {
    const groupRef = useRef<THREE.Group>(null);

    // Constants for DNA shape
    const radius = 2.5;
    const height = 15;
    const turns = 2.5;
    const pointsCount = SKILLS_DATA.length;

    const points = useMemo(() => {
        return SKILLS_DATA.map((_, i) => {
            const t = i / (pointsCount - 1);
            const angle = t * Math.PI * 2 * turns;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (t - 0.5) * height; // Center vertically
            return new THREE.Vector3(x, y, z);
        });
    }, []);

    // Second strand (180 degrees offset)
    const points2 = useMemo(() => {
        return SKILLS_DATA.map((_, i) => {
            const t = i / (pointsCount - 1);
            const angle = t * Math.PI * 2 * turns + Math.PI; // Offset by PI
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (t - 0.5) * height;
            return new THREE.Vector3(x, y, z);
        });
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2; // Slow rotation
            groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1; // Gentle Sway
        }
    });

    return (
        <group ref={groupRef}>
            {/* Strand Lines - Thicker and Brighter */}
            {/* @ts-ignore */}
            <CatmullRomLine points={points} color="#00ffff" lineWidth={0.3} segments={100} opacity={0.6} transparent />
            {/* @ts-ignore */}
            <CatmullRomLine points={points2} color="#a855f7" lineWidth={0.3} segments={100} opacity={0.6} transparent />

            {/* Rungs connecting the strands */}
            {points.map((p1, i) => {
                const p2 = points2[i];

                // connecting line
                // const center = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
                return (
                    <line key={`rung-${i}`}>
                        <bufferGeometry>
                            <float32BufferAttribute attach="attributes-position" count={2} array={new Float32Array([p1.x, p1.y, p1.z, p2.x, p2.y, p2.z])} itemSize={3} />
                        </bufferGeometry>
                        <lineBasicMaterial color="#ffffff" opacity={0.4} transparent />
                    </line>
                )
            })}

            {/* Icons on Strand 1 */}
            {points.map((p, i) => (
                <DNAIcon key={`s1-${i}`} position={[p.x, p.y, p.z]} url={SKILLS_DATA[i].url} name={SKILLS_DATA[i].name} />
            ))}

            {/* Icons on Strand 2 (Reuse data or flip logic, using same data for density) */}
            {points2.map((p, i) => (
                <DNAIcon key={`s2-${i}`} position={[p.x, p.y, p.z]} url={SKILLS_DATA[(SKILLS_DATA.length - 1) - i].url} name={SKILLS_DATA[(SKILLS_DATA.length - 1) - i].name} />
            ))}
        </group>
    );
};

export const SkillsDNA = () => {
    return (
        <Canvas
            camera={{ position: [0, 0, 12], fov: 45 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            gl={{ alpha: true, antialias: true }}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />

                {/* Tilt it slightly */}
                <group rotation={[0, 0, Math.PI / 6]}>
                    <HelixStrand />
                </group>

                {/* Background Tech Logos - Skills DNA (From User Request) */}
                <FloatingLogo position={[-8, 4, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" size={2} speed={0.7} />
                <FloatingLogo position={[8, -4, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" size={2.2} speed={0.9} />
                <FloatingLogo position={[0, 6, -10]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" size={2.5} speed={0.5} />
                <FloatingLogo position={[-10, 0, -10]} url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" size={1.8} speed={0.8} />
                <FloatingLogo position={[10, 2, -12]} url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" size={2.8} speed={0.6} />
                <FloatingLogo position={[-6, -6, -12]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" size={1.8} speed={0.8} />
                <FloatingLogo position={[6, 6, -12]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" size={2} speed={0.7} />
                <FloatingLogo position={[0, -8, -15]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" size={2} speed={0.75} />
                <FloatingLogo position={[-12, 3, -15]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" size={1.5} speed={0.9} />
                <FloatingLogo position={[12, -2, -15]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" size={1.8} speed={0.65} />

                <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
            </Suspense>
        </Canvas>
    );
};
