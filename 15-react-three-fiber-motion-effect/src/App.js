import "./styles.css";
import { useRef, Suspense, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import img from "./img.jpg";
import "./CustomMaterial";

const Plane = () => {
  const material = useRef();
  const [hovered, setHovered] = useState(false);
  const [map] = useLoader(THREE.TextureLoader, [img]);
  useFrame(({ clock }) => {
    if (material.current && hovered) {
      material.current.uniforms.uHover.value = hovered;
      material.current.uniforms.uTime.value = clock.getElapsedTime();
    } else {
      material.current.uniforms.uHover.value = hovered;
    }
  });
  return (
    <mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <customMaterial ref={material} map={map} />
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
