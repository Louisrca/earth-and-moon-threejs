import { useGLTF } from "@react-three/drei";

export default function BlenderModel({ position = [0, -4, 0], scale = 0.5 }) {
  const { scene } = useGLTF("/assets/FinalBaseMesh.glb");

  return <primitive object={scene} position={position} scale={scale} />;
}
