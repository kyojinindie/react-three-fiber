import { ShaderMaterial } from "three";
import { extend } from "@react-three/fiber";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

class CustomMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_map: { value: null },
        blur: { value: 100 },
        gamma: { value: 0.5 }
      }
    });
  }

  set map(value) {
    this.uniforms.u_map.value = value;
  }

  set blur(value) {
    this.uniforms.blur.value = value;
  }

  set gamma(value) {
    this.uniforms.gamma.value = value;
  }
}

extend({ CustomMaterial });
