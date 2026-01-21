import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Icosahedron, OrbitControls, ContactShadows, Environment, MeshTransmissionMaterial, Image, useTexture } from "@react-three/drei";
import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import * as THREE from "three";

const FloatingSphere = ({ position, color, size = 1, speed = 1 }: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05 * speed;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[size, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
};

const FloatingTorus = ({ position, color }: {
  position: [number, number, number];
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5}>
      <Torus ref={meshRef} args={[1, 0.25, 16, 32]} position={position}>
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.8}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.1}
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </Torus>
    </Float>
  );
};

const FloatingBox = ({ position, color }: {
  position: [number, number, number];
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Box ref={meshRef} args={[0.8, 0.8, 0.8]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={1}
          emissive={color}
          emissiveIntensity={0.4}
          envMapIntensity={1.5}
        />
      </Box>
    </Float>
  );
};

const FloatingIcosahedron = ({ position, color }: {
  position: [number, number, number];
  color: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={1.5} floatIntensity={1.8}>
      <Icosahedron ref={meshRef} args={[0.7, 1]} position={position}>
        <meshStandardMaterial
          color={color}
          roughness={0}
          metalness={1}
          emissive={color}
          emissiveIntensity={0.5}
          wireframe
        />
      </Icosahedron>
    </Float>
  );
};

const Particles = ({ count = 100 }: { count?: number }) => {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

export const FloatingLogo = ({ position, url, size = 1, speed = 1 }: {
  position: [number, number, number];
  url: string;
  size?: number;
  speed?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');
    loader.load(
      url,
      (tex) => setTexture(tex),
      undefined,
      () => {
        console.warn(`Failed to load texture: ${url}`);
        setError(true);
      }
    );
  }, [url]);

  useFrame((state, delta) => {
    if (meshRef.current && texture) {
      // Smoothly look at the camera
      const targetQuaternion = new THREE.Quaternion();
      const originalRotation = meshRef.current.rotation.clone();

      // Calculate target rotation to face camera
      meshRef.current.lookAt(state.camera.position);
      targetQuaternion.copy(meshRef.current.quaternion);

      // Restore and slerp
      meshRef.current.rotation.copy(originalRotation);
      meshRef.current.quaternion.slerp(targetQuaternion, 0.1);

      // Maintain slow rotation around Y
      meshRef.current.rotation.y += speed * delta * 0.3;
    }
  });

  if (error || !texture) return null;

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          toneMapped={false}
          emissive="#ffffff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

export const HeroScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        powerPreference: "high-performance"
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#030712"]} />
        <fog attach="fog" args={["#030712", 5, 20]} />

        <ambientLight intensity={0.3} />
        <spotLight position={[10, 10, 10]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} color="#7c3aed" intensity={1.5} />
        <pointLight position={[10, 10, 10]} color="#00d4ff" intensity={1.5} />
        <pointLight position={[0, 5, 5]} color="#00d4ff" intensity={1} />

        <FloatingSphere position={[-3, 1, -2]} color="#00d4ff" size={0.8} />
        <FloatingSphere position={[3.5, -1, -1]} color="#7c3aed" size={0.6} />
        <FloatingTorus position={[2.5, 2, -3]} color="#00d4ff" />
        <FloatingBox position={[-2.5, -2, -2]} color="#7c3aed" />
        <FloatingIcosahedron position={[4, 0, -4]} color="#00d4ff" />
        <FloatingIcosahedron position={[-4, 1.5, -3]} color="#7c3aed" />

        {/* Floating Tech Logos - Hero Section */}
        <FloatingLogo position={[-6, 3, -6]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" size={1.8} speed={0.8} />
        <FloatingLogo position={[6, -3, -6]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" size={1.5} speed={1} />
        <FloatingLogo position={[0, -5, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" size={2.5} speed={0.6} />
        <FloatingLogo position={[-5, -2, -7]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" size={1.4} speed={0.9} />
        <FloatingLogo position={[5, 4, -7]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" size={1.6} speed={0.7} />
        <FloatingLogo position={[-7, -4, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" size={1.3} speed={0.85} />
        <FloatingLogo position={[7, 1, -9]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" size={1.2} speed={0.75} />

        <Particles count={200} />

        <ContactShadows
          position={[0, -4, 0]}
          opacity={0.5}
          scale={20}
          blur={2.5}
          far={4.5}
        />

        <Environment preset="city" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
};

export const SkillsScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        powerPreference: "high-performance"
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#030712"]} />

        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1.5} />
        <pointLight position={[-5, 5, 5]} color="#00d4ff" intensity={1.2} />
        <pointLight position={[5, -5, 5]} color="#7c3aed" intensity={1.2} />

        <FloatingSphere position={[-4, 2, -3]} color="#00d4ff" size={0.5} />
        <FloatingSphere position={[4, -2, -2]} color="#7c3aed" size={0.4} />
        <FloatingBox position={[3, 2, -4]} color="#00d4ff" />
        <FloatingIcosahedron position={[-3, -1, -3]} color="#7c3aed" />

        {/* Floating Tech Logos - Skills Section */}
        <FloatingLogo position={[-5, -3, -5]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" size={1.5} speed={0.7} />
        <FloatingLogo position={[5, 4, -6]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" size={1.8} speed={0.9} />
        <FloatingLogo position={[0, 3, -7]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" size={2} speed={0.5} />
        <FloatingLogo position={[-6, 0, -6]} url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" size={1.3} speed={0.8} />
        <FloatingLogo position={[6, -2, -7]} url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" size={2.2} speed={0.6} />
        <FloatingLogo position={[-4, 4, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" size={1.4} speed={0.8} />
        <FloatingLogo position={[4, -4, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" size={1.6} speed={0.7} />
        <FloatingLogo position={[0, -5, -9]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" size={1.5} speed={0.75} />
        <FloatingLogo position={[-7, 2, -7]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" size={1.2} speed={0.9} />
        <FloatingLogo position={[7, 1, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" size={1.4} speed={0.65} />

        <Particles count={120} />

        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};

export const ProjectsScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        powerPreference: "high-performance"
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#030712"]} />

        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1.5} />
        <pointLight position={[-5, -5, 5]} color="#7c3aed" intensity={1.2} />
        <pointLight position={[5, 5, -5]} color="#00d4ff" intensity={1.2} />

        <FloatingTorus position={[4, 1, -4]} color="#00d4ff" />
        <FloatingSphere position={[-4, -1, -3]} color="#7c3aed" size={0.6} />
        <FloatingIcosahedron position={[3, -2, -3]} color="#00d4ff" />
        <FloatingBox position={[-3, 2, -4]} color="#7c3aed" />

        {/* Floating Tech Logos - Projects Section */}
        <FloatingLogo position={[-6, 4, -7]} url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" size={2.5} speed={0.6} />
        <FloatingLogo position={[6, -4, -6]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" size={1.5} speed={0.9} />
        <FloatingLogo position={[0, -5, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" size={2} speed={0.7} />
        <FloatingLogo position={[-5, -1, -7]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" size={1.8} speed={0.8} />
        <FloatingLogo position={[5, 3, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" size={1.6} speed={0.75} />
        <FloatingLogo position={[-7, 1, -9]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" size={1.4} speed={0.85} />
        <FloatingLogo position={[7, -1, -7]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" size={1.5} speed={0.7} />
        <FloatingLogo position={[0, 4, -9]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg" size={1.3} speed={0.9} />

        <Particles count={120} />

        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

export const ContactScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        powerPreference: "high-performance"
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#030712"]} />

        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1.5} />
        <pointLight position={[0, 0, 5]} color="#00d4ff" intensity={1.5} />
        <pointLight position={[0, -3, 0]} color="#7c3aed" intensity={1} />

        <FloatingSphere position={[-3, 1, -2]} color="#00d4ff" size={0.5} speed={0.5} />
        <FloatingSphere position={[3, -1, -2]} color="#7c3aed" size={0.4} speed={0.5} />
        <FloatingTorus position={[0, 2, -4]} color="#00d4ff" />

        {/* Floating Tech Logos - Contact Section */}
        <FloatingLogo position={[-4, -3, -5]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" size={1.2} speed={0.8} />
        <FloatingLogo position={[4, 3, -5]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" size={1.2} speed={0.7} />
        <FloatingLogo position={[0, -4, -6]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" size={1.5} speed={0.9} />
        <FloatingLogo position={[-5, 2, -6]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" size={1.3} speed={0.75} />
        <FloatingLogo position={[5, -2, -7]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" size={1.1} speed={0.85} />
        <FloatingLogo position={[-3, 4, -7]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" size={1.4} speed={0.65} />

        <Particles count={100} />

        <Environment preset="dawn" />
      </Suspense>
    </Canvas>
  );
};

export const AboutScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#030712"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#00d4ff" intensity={1} />
        <pointLight position={[-5, -5, 5]} color="#7c3aed" intensity={1} />

        <FloatingLogo position={[-6, 2, -5]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" size={1.5} speed={0.7} />
        <FloatingLogo position={[6, -2, -5]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg" size={1.5} speed={0.8} />
        <FloatingLogo position={[0, 4, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" size={2.5} speed={0.6} />
        <FloatingLogo position={[-4, -4, -6]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" size={1.8} speed={0.9} />

        <Particles count={80} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};

export const CertificatesScene = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#030712"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} color="#7c3aed" intensity={1} />
        <pointLight position={[-5, -5, 5]} color="#00d4ff" intensity={1} />

        <FloatingLogo position={[-7, 3, -6]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" size={1.2} speed={0.8} />
        <FloatingLogo position={[7, -3, -6]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg" size={1.5} speed={0.7} />
        <FloatingLogo position={[-3, -5, -8]} url="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" size={1.3} speed={0.9} />

        <Particles count={60} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
};
