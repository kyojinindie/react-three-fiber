import { ShaderMaterial, Vector2 } from "three";
import { extend } from "@react-three/fiber";

class CustomMaterial extends ShaderMaterial {
  constructor() {
    super({
      vertexShader: `precision mediump float;
      uniform float uTime;
      uniform vec2 uFrequency;
      varying vec2 vUv;
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.z += sin(modelPosition.x * uFrequency.x + uTime) * 0.1;
        modelPosition.z += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        vUv = uv;
        gl_Position = projectedPosition;
        
      }`,
      fragmentShader: `precision mediump float;
      uniform sampler2D uTexture;
      varying vec2 vUv;
      void main() {
        vec4 textureColor = texture2D(uTexture,vUv);
        gl_FragColor = textureColor;
      }`,
      uniforms: {
        uTime: { value: 0.0 },
        uFrequency: { value: new Vector2(10, 5) },
        uTexture: { value: null }
      }
    });
  }

  set map(value) {
    //this.uniforms.hasTexture.value = !!value;
    this.uniforms.uTexture.value = value;
  }
}

extend({ CustomMaterial });
