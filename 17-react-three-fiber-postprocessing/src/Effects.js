import { useMemo } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { AfterimagePass } from "three/examples/jsm/postprocessing/AfterimagePass";

export default function Effects() {
  const { gl, scene, camera } = useThree();
  const composer = useMemo(() => {
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, camera));
    const afterimagePass = new AfterimagePass();
    composer.addPass(afterimagePass);
    return composer;
  }, []);
  return useFrame((_, delta) => composer.render(delta), 1);
}
