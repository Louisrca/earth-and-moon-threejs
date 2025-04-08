import { Canvas } from "@react-three/fiber";
import RotatingGroup from "../../components/RotatingGroup";
import { OrbitControls } from "@react-three/drei";
import SettingsModal from "../../components/SettingsModal";

export default function SolarSystem() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{
          position: [0, 0, 60],
          fov: 100,
        }}
      >
        <pointLight decay={0} intensity={Math.PI} />
        <RotatingGroup />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={1.0}
          maxDistance={500}
          minDistance={1}
        />
      </Canvas>
      <SettingsModal />
    </div>
  );
}
