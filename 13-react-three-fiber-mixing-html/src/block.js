import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import store from "./store";
import { useRef, useContext, createContext } from "react";

const offsetContext = createContext(0);

const Block = ({ state, children, factor, offset }) => {
  console.log(state);

  const { sectionHeight } = useBlock();
  const ref = useRef();
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
    <offsetContext.Provider value={offset}>
      <group position={[0, -sectionHeight * offset * factor, 0]}>
        <group ref={ref}>{children}</group>
      </group>
    </offsetContext.Provider>
  );
};

const useBlock = () => {
  const { sections, pages, zoom } = store;
  const { size, viewport } = useThree();
  const offset = useContext(offsetContext);
  const viewportWidth = viewport.width;
  const viewportHeight = viewport.height;
  const canvasWidth = viewportWidth / zoom;
  const canvasHeight = viewportHeight / zoom;
  const mobile = size.width < 700;
  const margin = canvasWidth * (mobile ? 0.2 : 0.1);
  const contentMaxWidth = canvasWidth * (mobile ? 0.8 : 0.6);
  const sectionHeight = canvasHeight * ((pages - 1) / (sections - 1));
  return {
    viewport,
    offset,
    viewportWidth,
    viewportHeight,
    canvasWidth,
    canvasHeight,
    mobile,
    margin,
    contentMaxWidth,
    sectionHeight
  };
};

export { Block, useBlock };
