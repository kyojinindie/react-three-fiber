import "./styles.css";
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated, config } from "react-spring/three";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const Box = () => {
  const { x, y, z } = useSpring({
    x: 0,
    y: 0,
    z: 0,
    loop: { reverse: true },
    config: config.wobbly
  });
  useEffect(() => {
    x.start({ from: { x: 0 }, to: { x: 1 } });
  });
  return (
    <animated.mesh position={x}>
      <meshStandardMaterial color="hotpink" />
      <boxGeometry args={[1, 1, 1]} />
    </animated.mesh>
  );
};

export default function App() {
  return (
    <Canvas className="canvas">
      <perspectiveCamera
        fov={75}
        aspect={sizes.width / sizes.height}
        position={[0, 0, -1]}
        near={0.1}
        far={100}
      >
        <Box />
      </perspectiveCamera>
      <ambientLight />
    </Canvas>
  );
}
