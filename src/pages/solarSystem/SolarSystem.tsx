import { Canvas } from "@react-three/fiber";
import RotatingGroup from "../../components/RotatingGroup";
import { OrbitControls } from "@react-three/drei";
import SettingsModal from "../../components/SettingsModal";
import Stars from "../../components/Stars";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BlendFunction, KernelSize } from "postprocessing";

export default function SolarSystem() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{
          position: [0, 0, 60],
          fov: 100,
        }}
      >
        <Stars count={3000} />
        <pointLight decay={0} intensity={3.5} />
        <RotatingGroup />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={1.0}
          maxDistance={500}
          minDistance={1}
        />
        <EffectComposer>
          <Bloom
            intensity={0.25}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.5}
            kernelSize={KernelSize.HUGE}
            mipmapBlur={true}
            blendFunction={BlendFunction.SCREEN}
          />
        </EffectComposer>
      </Canvas>

      <SettingsModal />
    </div>
  );
}
