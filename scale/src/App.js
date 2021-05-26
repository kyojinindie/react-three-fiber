import "./styles.css";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated, config } from "react-spring/three";

const sizes = {
  width: window.innerWidth,
  heigth: window.innerHeight
};

const Box = () => {
  const [isClicked, setClicked] = useState(false);
  const { scale } = useSpring({
    scale: isClicked ? 2 : 1,
    config: config.wobbly
  });
  console.log(scale);
  return (
    <animated.mesh scale={scale} onClick={(event) => setClicked(!isClicked)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="hotpink" />
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
      <axesHelper />
    </Canvas>
  );
}
