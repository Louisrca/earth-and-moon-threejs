import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Stars({ count = 8000 }) {
  const groupRef = useRef<THREE.Group>(null);
  const stars = useMemo(() => {
    const starArray = new Array(count).fill(0).map(() => {
      const position = [
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
      ];

      const size = Math.random() * 0.5 + 0.1;

      const intensity = Math.random() * 0.5 + 0.5;

      return {
        position: position as [number, number, number],
        size,
        intensity,
        pulseSpeed: Math.random() * 0.5 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });
    return starArray;
  }, [count]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (groupRef.current) {
      stars.forEach((star, i) => {
        const group = groupRef.current?.children[i] as THREE.Group;
        if (group) {
          const mesh = group.children[0] as THREE.Mesh;
          if (mesh && mesh.material instanceof THREE.MeshStandardMaterial) {
            const pulse =
              Math.sin(time * star.pulseSpeed + star.pulsePhase) * 0.3 + 0.7;
            mesh.material.emissiveIntensity = star.intensity * pulse;
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {stars.map((star, index) => (
        <group key={index}>
          <mesh
            key={`star-${index}`}
            castShadow={false}
            receiveShadow={false}
            position={star.position}
            scale={[star.size, star.size, star.size]}
          >
            <sphereGeometry args={[1, 16, 16]} />{" "}
            <meshStandardMaterial
              color="white"
              emissive="white"
              emissiveIntensity={star.intensity}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
