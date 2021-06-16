import "./styles.css";
import { Canvas, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls, Loader } from "@react-three/drei";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import { Suspense, useRef } from "react";
import "./materials/CustomMaterial";
import { useSpring, animated, config } from "@react-spring/three";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { positions1, positions2, positions3 } from "./data";

const Plane = ({ init, data, map }) => {
  const n = useRef(0);

  const { position } = useSpring({
    //loop: () => 3 > n.current++,
    from: { position: init },
    to: data,
    config: { duration: 100 },
    delay: 5000
  });

  //uniforms-blur-value={blur}
  return (
    <animated.mesh position={position}>
      <planeGeometry args={[3, 4]} />
      <animated.shaderMaterial
        attach="material"
        uniforms={{
          u_map: { value: map },
          blur: { value: 0.1 },
          gamma: { value: 0.5 }
        }}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </animated.mesh>
  );
};

const Content = () => {
  const [texture1, texture2, texture3] = useLoader(THREE.TextureLoader, [
    img1,
    img2,
    img3
  ]);
  const data1 = positions1();
  const data2 = positions2();
  const data3 = positions3();

  return (
    <>
      <Plane init={[0, 0, 1]} data={data1} map={texture1} />
      <Plane init={[-4, 0, 0]} data={data2} map={texture2} />
      <Plane init={[4, 0, 0]} data={data3} map={texture3} />
    </>
  );
};

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight />
        <OrbitControls />

        <Suspense fallback={null}>
          <Content />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}
