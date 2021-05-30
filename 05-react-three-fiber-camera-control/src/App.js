import "./styles.css";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const cursor = {
  x: 0,
  y: 0
};

const mesh = {
  position: null
};

const Box = () => {
  const box = useRef();
  mesh.position = box;
  return (
    <mesh ref={box}>
      <meshStandardMaterial color="hotpink" />
      <boxGeometry args={[1, 1, 1, 5, 5, 5]} />
    </mesh>
  );
};

const Camera = () => {
  const camera = useRef();

  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.height - 0.5;
  });
  useFrame(() => {
    if (camera.current && mesh.position.current) {
      camera.current.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
      camera.current.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
      camera.current.position.y = cursor.y * 3;

      camera.current.lookAt(mesh.position.current.position);
    }
  });
  return (
    <perspectiveCamera
      ref={camera}
      fov={75}
      aspect={sizes.width / sizes.height}
      near={0.1}
      far={100}
    >
      <Box />
    </perspectiveCamera>
  );
};

export default function App() {
  return (
    <Canvas className="canvas">
      <Camera />
      <ambientLight />
    </Canvas>
  );
}
