import "./styles.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import { useSpring, config, animated } from "@react-spring/three";

const Card = (props) => {
  const { position, rotation, opacity } = useSpring({
    position:
      props.item === 1
        ? props.hovered
          ? [-1.2, 0, 3]
          : props.position
        : props.item === 2
        ? props.hovered
          ? [0, 0, 3]
          : props.position
        : props.hovered
        ? [1.2, 0, 3]
        : props.position,
    rotation: props.hovered ? [-0.1, 0, 0] : props.rotation,
    opacity: props.hovered ? 1 : 0.5,
    config: config.wobbly
  });

  return (
    <animated.mesh position={position} rotation={rotation} castShadow>
      <planeGeometry args={[1, 1.3]} doubleSide={true} />
      <animated.meshStandardMaterial
        color="blue"
        transparent
        opacity={opacity}
        attach="material"
      />
    </animated.mesh>
  );
};

export default function App() {
  const [hovered, setHovered] = useState(false);
  return (
    <Canvas className="canvas">
      <ambientLight />
      <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
      <OrbitControls />
      <perspectiveCamera position={[0, 0.5, 0]} rotation={[0.2, 0, 0]}>
        <group
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <Card
            position={[0, 0.2, 3]}
            rotation={[-0.7, 0, -1]}
            item={1}
            hovered={hovered}
          />
          <Card
            position={[0, 0.4, 3]}
            rotation={[-0.7, 0, -1]}
            item={2}
            hovered={hovered}
          />
          <Card
            position={[0, 0.0, 3]}
            rotation={[-0.7, 0, -1]}
            item={3}
            hovered={hovered}
          />
        </group>
      </perspectiveCamera>
    </Canvas>
  );
}
