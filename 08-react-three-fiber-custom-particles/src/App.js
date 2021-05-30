import "./styles.css";
import React, { useMemo } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

const Box = () => {
  return (
    <mesh>
      <meshStandardMaterial color="hotpink" />
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
};

const Particles = () => {
  const count = 500;

  const [positions, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      sizes[i] = Math.random() < 0.03 ? 15 : 6;
    }

    return [positions, sizes];
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attachObject={["attributes", "position"]}
          count={positions.length / 3}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} />
    </points>
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
        <Particles />
      </perspectiveCamera>
      <ambientLight />
      <OrbitControls />
    </Canvas>
  );
}
