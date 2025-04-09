import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function Stars({
  count = 3000,
  minDistance = 300,
  maxDistance = 1000,
}) {
  const groupRef = useRef<THREE.Group>(null);
  const starTexture = useLoader(THREE.TextureLoader, "/image-stars.png");

  const stars = useMemo(() => {
    const starArray = new Array(count).fill(0).map(() => {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;

      const distance =
        minDistance + Math.random() * (maxDistance - minDistance);

      const x = distance * Math.sin(theta) * Math.cos(phi);
      const y = distance * Math.sin(theta) * Math.sin(phi);
      const z = distance * Math.cos(theta);

      const size = 0.3;

      const intensity = Math.random() * 5 + 10;

      return {
        position: [x, y, z] as [number, number, number],
        size,
        intensity,
        pulseSpeed: Math.random() * 0.5 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,

        color: new THREE.Color(
          0.5 + Math.random() * 0.75,
          0.5 + Math.random() * 0.75,
          0.5 + Math.random() * 0.5
        ),
      };
    });
    return starArray;
  }, [count, minDistance, maxDistance]);

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
    <>
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
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial
                emissive={star.color}
                emissiveIntensity={star.intensity}
                toneMapped={false}
                map={starTexture}
                color={star.color}
              />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}
