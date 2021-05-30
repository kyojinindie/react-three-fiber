import "./styles.css";
import React, { useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Sphere = () => {
  return (
    <points>
      <sphereGeometry args={[1, 32, 32]} />
      <pointsMaterial size={0.02} sizeAttenuation />
    </points>
  );
};

export default function App() {
  return (
    <Canvas className="canvas">
      <perspectiveCamera
        fov={75}
        aspect={sizes.width / sizes.height}
        position={[0, 1, 2]}
        near={0.1}
        far={100}
      >
        <Sphere />
      </perspectiveCamera>
      <Controls />
    </Canvas>
  );
}
