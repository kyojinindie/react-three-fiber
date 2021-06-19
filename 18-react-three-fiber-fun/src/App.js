import "./styles.css";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Suspense, useRef, useState } from "react";
import { OrbitControls, Stars } from "@react-three/drei";
import { useSpring, a, config } from "@react-spring/three";
import TextC from "./text";
import img1 from "./images/img1.jpg";
import img2 from "./images/img2.jpg";
import img3 from "./images/img3.jpg";
import font from "./TheGoblickDemo-eZ3yB.ttf";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import Effects from "./effects/Effects";

const Content = () => {
  const [map1, map2, map3, map4] = useLoader(THREE.TextureLoader, [
    img1,
    img2,
    img3
  ]);
  //console.log(map4);
  return (
    <>
      <Photo position={[0, 0, 1]} map={map1} scale={[0.4, 0.6]} />
      <Photo position={[4, 1, 0]} map={map2} scale={[0.4, 0.6]} />
      <Photo position={[-4, 1, 0]} map={map3} scale={[0.4, 0.6]} />
      <TextC
        fontSize={1}
        font={font}
        position={[0, 1, 0]}
        content={"a blank canvas gives"}
        delay={1000}
        duration={5000}
        from={{ opacity: 1 }}
        to={{ opacity: 0 }}
      />
      <TextC
        fontSize={1}
        font={font}
        position={[0, 0, 0]}
        content={"you the ability"}
        delay={1000}
        duration={5000}
        from={{ opacity: 1 }}
        to={{ opacity: 0 }}
      />
      <TextC
        fontSize={1}
        font={font}
        position={[0, -1, 0]}
        content={"to create whatever you want"}
        delay={1000}
        duration={5000}
        from={{ opacity: 1 }}
        to={{ opacity: 0 }}
      />
      <TextC
        fontSize={1}
        font={font}
        position={[0, 1, 0]}
        content={"also you can play whit shaders"}
        delay={12000}
        duration={5000}
        from={{ opacity: 0 }}
        to={[{ opacity: 1 }, { opacity: 0 }]}
      />
      <TextC
        fontSize={1}
        font={font}
        position={[0, 0, 0]}
        content={"to get awesome effects"}
        delay={12000}
        duration={5000}
        from={{ opacity: 0 }}
        to={[{ opacity: 1 }, { opacity: 0 }]}
      />
      <TextC
        fontSize={1}
        font={font}
        position={[0, 1, 0]}
        content={"or maybe you are "}
        delay={24000}
        duration={5000}
        from={{ opacity: 0 }}
        to={[{ opacity: 1 }, { opacity: 0 }]}
      />
      <TextC
        fontSize={1}
        font={font}
        position={[0, 0, 0]}
        content={"imagining a cube"}
        delay={24000}
        duration={5000}
        from={{ opacity: 0 }}
        to={[{ opacity: 1 }, { opacity: 0 }]}
      />
      <Box delay={34000} />
    </>
  );
};

const Box = ({ delay }) => {
  const mesh = useRef();
  const { scale } = useSpring({
    from: { scale: 0 },
    to: { scale: 2 },
    config: config.wobbly,
    delay: delay
  });

  useFrame(({ clock }) => {
    mesh.current.position.x = Math.cos(clock.getElapsedTime() / 1.5) * 2;
    mesh.current.position.y = Math.sin(clock.getElapsedTime()) * 2;
    mesh.current.rotation.x = clock.getElapsedTime();
    mesh.current.rotation.y = clock.getElapsedTime() / 2;
  });
  return (
    <a.mesh ref={mesh} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </a.mesh>
  );
};

const Photo = ({ position, map }) => {
  const n = useRef(0);
  const material = useRef();
  const { scale } = useSpring({
    cancel: () => n.current++ > 3,
    loop: { reverse: true },
    from: { scale: 0 },
    to: { scale: 1 },
    config: config.wobbly,
    delay: 6000
  });

  useFrame(({ clock }) => {
    if (material.current) {
      if (n.current > 2) {
        material.current.uniforms.uShader.value = true;
      }
      material.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });
  return (
    <a.mesh position={position} scale={scale}>
      <a.planeGeometry args={[3, 5, 64, 64]} />
      <shaderMaterial
        attach="material"
        ref={material}
        uniforms={{
          uMap: { value: map },
          uTime: { value: 0 },
          uShader: { value: false }
        }}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
      />
    </a.mesh>
  );
};

export default function App() {
  const scene = useRef();
  return (
    <Canvas>
      <ambientLight />
      <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
      <OrbitControls />
      <Suspense fallback={null}>
        <Content />
      </Suspense>
      <Effects />
      <Stars />
    </Canvas>
  );
}
