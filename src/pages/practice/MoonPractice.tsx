import { JSX, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

type Mesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
type MoonPracticeProps = {
  position: [number, number, number];
  imagePath: string;
  props?: JSX.IntrinsicElements["mesh"];
  scale?: number;
  speed?: number;
};

function MoonPractice({
  props,
  imagePath,
  position,
  scale,
  speed,
}: MoonPracticeProps) {
  const meshRef = useRef<Mesh>(null);

  const [, setHover] = useState(false);
  const [active, setActive] = useState(false);
  console.log("🚀 ~ active:", active);

  const texture = useLoader(THREE.TextureLoader, imagePath);
  useFrame((state, delta) => {
    console.log("🚀 ~ useFrame ~ state:", state);
    if (meshRef.current && speed) {
      meshRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      position={position}
      scale={active ? scale && scale * 1 : scale && scale * 0.5}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function RotatingGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const earthGroupRef = useRef<THREE.Group>(null);
  const moonGroupRef = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    console.log("🚀 ~ useFrame ~ state:", state);
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += delta * 0.1; // Rotation de la Terre autour du Soleil
    }
    if (moonGroupRef.current) {
      moonGroupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Terre */}
      <MoonPractice
        position={[0, 0, 0]}
        imagePath="/image-sun.png"
        scale={5}
        speed={0}
      />

      <group ref={earthGroupRef}>
        {/* Terre */}
        <MoonPractice
          position={[6, 0, 0]} // Position de la Terre par rapport au Soleil
          imagePath="/image-earth.png"
          scale={1}
          speed={0.2}
        />

        {/* Groupe pour la Lune */}
        <group ref={moonGroupRef} position={[6, 0, 0]}>
          {/* Lune */}
          <MoonPractice
            position={[1, 0, 0]} // Position de la Lune par rapport à la Terre
            imagePath="/image-moon.png"
            scale={0.2}
          />
        </group>
      </group>
    </group>
  );
}

export default function Moon() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{
          position: [0, 0, 10], // Éloigne la caméra sur l'axe Z
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <RotatingGroup />
      </Canvas>
    </div>
  );
}
