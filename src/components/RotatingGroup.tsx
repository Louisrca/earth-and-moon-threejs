import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import Planet from "./Planet";

export default function RotatingGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const earthGroupRef = useRef<THREE.Group>(null);
  const moonGroupRef = useRef<THREE.Group>(null);

  const earthScale = 1;
  const moonScale = 0.27;
  const sunScale = 11;

  const moonDistance = 2.5;

  useFrame((state, delta) => {
    console.log("🚀 ~ useFrame ~ state:", state);
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
    if (earthGroupRef.current) {
      earthGroupRef.current.rotation.y += delta * 0.05;
    }
    if (moonGroupRef.current) {
      moonGroupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <>
      <group ref={groupRef} position={[0, 0, 0]}>
        <Planet
          position={[0, 0, 0]}
          imagePath="/image-sun.png"
          scale={sunScale}
          speed={0}
        />

        <group ref={earthGroupRef} position={[35, 0, 0]}>
          <group position={[6, 0, 0]} rotation={[0, 0, Math.PI * 0.13]}>
            <Planet
              position={[0, 0, 0]}
              imagePath="/image-earth.png"
              scale={earthScale}
              speed={0.2}
              totalRotation={false}
            />
          </group>

          <group ref={moonGroupRef} position={[6, 0, 0]}>
            <Planet
              position={[moonDistance, 0, 0]}
              imagePath="/image-moon.png"
              scale={moonScale}
            />
          </group>
        </group>
      </group>
    </>
  );
}
