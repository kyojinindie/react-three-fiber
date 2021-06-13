import "./styles.css";
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useSpring, animated, config } from "react-spring/three";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const Box = () => {
  const [isClicked, setClicked] = useState(false);
  const { position } = useSpring({
    position: isClicked ? [3, 0, 0] : [0, 0, 0],
    config: config.wobbly
  });
  return (
    <animated.mesh
      position={position}
      onClick={(event) => setClicked(!isClicked)}
    >
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

