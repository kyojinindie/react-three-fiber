import "./styles.css";
import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Block } from "./block";
import { Html } from "@react-three/drei";
import state from "./store";

const Plane = () => {
  return (
    <mesh>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial color="#009681" />
    </mesh>
  );
};

const Content = ({ text }) => {
  return (
    <group>
      <Plane />
      <Html center>{text}</Html>
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
        <ambientLight />
        <Block state={state} factor={1.5} offset={0}>
          <Content text={"hello"} />
        </Block>
        <Block state={state} factor={1.5} offset={40}>
          <Content text={"from"} />
        </Block>
        <Block state={state} factor={1.5} offset={80}>
          <Content text={"kyojinIndie"} />
        </Block>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ height: `${state.pages * 100}vh` }} />
      </div>
    </>
  );
}
