import "./styles.css";
import * as THREE from "three";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import img from "./img2.png";
import { Suspense, useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const Kyojin = () => {
  const mesh = useRef();
  const [texture] = useLoader(THREE.TextureLoader, [img]);
  useFrame(({ clock }) => {
    mesh.current.position.y = Math.sin(clock.getElapsedTime()) * 0.3;
  });
  return (
    <mesh ref={mesh}>
      <planeGeometry args={[2, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

export default function App() {
  return (
    <Canvas className="canvas">
      <perspectiveCamera
        fov={75}
        aspect={sizes.width / sizes.height}
        position={[0, 0, 3]}
        near={0.1}
        far={100}
      >
        <Suspense fallback={null}>
          <Kyojin />
        </Suspense>
      </perspectiveCamera>
      <OrbitControls />
    </Canvas>
  );
}
