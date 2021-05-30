import "./styles.css";
import React, { useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useSpring, animated, config } from "@react-spring/three";

extend({ OrbitControls });

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();
  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Box = () => {
  const [hovered, setHovered] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const props = useSpring({
    scale: isClicked ? [2, 2, 2] : [1, 1, 1],
    color: hovered ? "hotpink" : "blue"
  });

  return (
    <animated.mesh
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!isClicked)}
      scale={props.scale}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <animated.meshStandardMaterial attach="material" color={props.color} />
    </animated.mesh>
  );
};

export default function App() {
  return (
    <Canvas className="canvas">
      <perspectiveCamera
        fov={75}
        aspect={sizes.width / sizes.height}
        near={0.1}
        far={100}
        position={[0, 0, 3]}
      />
      <ambientLight />
      <Controls />
      <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
      <Box />
    </Canvas>
  );
}
