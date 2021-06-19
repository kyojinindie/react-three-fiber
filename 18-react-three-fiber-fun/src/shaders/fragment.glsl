precision mediump float;

varying vec2 vUv;
varying float vWave;
uniform sampler2D uMap;

void main() {
  float wave = vWave * 0.35;
  float r = texture2D(uMap, vUv).r;
  float g = texture2D(uMap, vUv ).g;
  float b = texture2D(uMap, vUv + wave).b;
  vec3 texture = vec3(r, g, b);
  gl_FragColor = vec4(texture, 1.);
}