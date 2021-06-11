import "./styles.css";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import "./CustomMaterial";
import img from "./bh.png";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

const Plane = () => {
  const material = useRef();
  const [texture] = useLoader(THREE.TextureLoader, [img]);

  useFrame(({ clock }) => {
    if (material.current) {
      material.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });
  return (
    <mesh>
      <planeGeometry args={[1, 1, 32, 32]} />
      <customMaterial ref={material} attach="material" map={texture} />
    </mesh>
  );
};

export default function App() {
  return (
    <Canvas camera={{ position: [0, 0, 1] }}>
      <ambientLight />
      <Suspense fallback={null}>
        <Plane />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
