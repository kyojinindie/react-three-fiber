import "./styles.css";
import React from "react";
import { Canvas } from "@react-three/fiber";

const sizes = {
  width: window.innerWidth,
  heigth: window.innerHeight
};

const Box = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial wireframe color="hotpink" />
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
        <Box />
      </perspectiveCamera>
      <ambientLight />
    </Canvas>
  );
}
