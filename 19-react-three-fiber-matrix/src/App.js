import "./styles.css";
import { Suspense, useRef } from "react";
import * as TRHEE from "three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import channel0 from "./channels/channel0.png";
import channel1 from "./channels/channel1.png";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const Box = () => {
  const [texture0, texture1] = useLoader(TRHEE.TextureLoader, [
    channel0,
    channel1
  ]);
  const material = useRef();
  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial
        ref={material}
        attach="material"
        uniforms={{
          uTime: { value: 0.0 },
          uChannel0: { value: texture0 },
          uChannel1: { value: texture1 },
          uChannelResolution: { value: new TRHEE.Vector2(194.0, 137.0) },
          uResolution: { value: 350.0 }
        }}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </mesh>
  );
};

export default function App() {
  return (
    <Canvas camera={{ fov: 75, position: [0, 0, 0 - 1.5] }}>
      <ambientLight />
      <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
      <Suspense fallback={null}>
        <Box />
      </Suspense>
      <OrbitControls
        autoRotate
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
      />
    </Canvas>
  );
}
