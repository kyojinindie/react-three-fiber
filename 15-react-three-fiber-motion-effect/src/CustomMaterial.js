import { ShaderMaterial, Vector2 } from "three";
import { extend } from "@react-three/fiber";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

class CustomMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: null },
        uFrequency: { value: new Vector2(10, 5) },
        uHover: { value: false }
      }
    });
  }

  set map(value) {
    this.uniforms.uTexture.value = value;
  }
}

extend({ CustomMaterial });
