import { JSX, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

type Mesh = THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial>;
type MoonPracticeProps = {
  position: [number, number, number];
  imagePath: string;
  props?: JSX.IntrinsicElements["mesh"];
  scale?: number;
  speed?: number;
  totalRotation?: boolean;
  onPlanetClick?: (position: [number, number, number], scale: number) => void;
};

export default function Planet({
  props,
  imagePath,
  position,
  scale,
  speed,
  totalRotation,
  onPlanetClick,
}: MoonPracticeProps) {
  const meshRef = useRef<Mesh>(null);

  const texture = useLoader(THREE.TextureLoader, imagePath);
  useFrame((state, delta) => {
    console.log("🚀 ~ useFrame ~ state:", state);
    if (meshRef.current && speed) {
      meshRef.current.rotation.y += delta * speed;
    }
    if (meshRef.current && totalRotation && speed) {
      meshRef.current.rotation.x += delta * speed;
    }
  });

  const handleClick = () => {
    if (onPlanetClick && scale) {
      onPlanetClick(position, scale);
    }
  };

  return (
    <mesh
      {...props}
      ref={meshRef}
      position={position}
      castShadow
      receiveShadow
      scale={scale}
      onClick={handleClick}
    >
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        lightMap={imagePath == "/image-sun.png" ? texture : undefined}
        lightMapIntensity={imagePath == "/image-sun.png" ? 4 : 0}
      />
    </mesh>
  );
}
