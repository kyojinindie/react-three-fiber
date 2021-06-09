import "./styles.css";
import * as THREE from "three";
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import state from "./store";

const Dodecahedron = () => {
  const mesh = useRef();
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.01;
    }
  });
  return (
    <mesh ref={mesh}>
      <dodecahedronGeometry args={[2, 0]} />
      <meshStandardMaterial color="#009681" />
    </mesh>
  );
};

const Block = ({ state, children, factor, offset }) => {
  const { sectionHeight } = useBlock();
  const ref = useRef();
  console.log(state);
  useFrame(() => {
    const curY = ref.current.position.y;
    const curTop = state.top.current;
    ref.current.position.y = THREE.MathUtils.lerp(
      curY,
      (curTop / state.zoom) * factor,
      0.1
    );
  });
  return (
    <group position={[0, -sectionHeight * factor * offset, 0]}>
      <group ref={ref}>{children}</group>
    </group>
  );
};

export default function App() {
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({ target: scrollArea.current }), []);
  return (
    <>
      <Canvas
        linear
        orthographic
        camera={{ zoom: state.zoom, position: [0, 0, 500] }}
      >
        <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
        <ambientLight />
        <Block state={state} factor={1.5} offset={0}>
          <Dodecahedron />
        </Block>
        <Block state={state} factor={1.5} offset={1}>
          <Dodecahedron />
        </Block>
        <Block state={state} factor={1.5} offset={2}>
          <Dodecahedron />
        </Block>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}

const useBlock = () => {
  const { sections, pages } = state;
  const { viewport } = useThree();
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const canvasWidth = viewportWidth;
  const canvasHeight = viewportHeight;
  const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1));
  return {
    viewport,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    sectionHeight
  };
};
