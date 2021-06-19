import "./styles.css";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import Effects from "./Effects";

extend({
  EffectComposer,
  RenderPass,
  AfterimagePass
});

const Box = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.x = Math.cos(clock.getElapsedTime() / 1.5) * 2;
    ref.current.position.y = Math.sin(clock.getElapsedTime()) * 2;
    ref.current.rotation.x = clock.getElapsedTime();
    ref.current.rotation.y = clock.getElapsedTime() / 2;
  });
  return (
    <mesh ref={ref}>
      <boxBufferGeometry attach="geometry" args={[4, 4, 4, 2, 2, 2]} />
      <meshBasicMaterial color="hotpink" />
    </mesh>
  );
};

export default function App() {
  return (
    <Canvas>
      <Box />
      <Effects />
      <OrbitControls />
    </Canvas>
  );
}
