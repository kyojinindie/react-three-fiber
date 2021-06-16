uniform sampler2D u_map;
  uniform float blur;
  uniform float gamma;
  varying vec2 vUv;

  float weight(float t, float log2radius, float gamma)
  {
      return exp(-gamma * pow(log2radius-t,2.));
  }

  vec4 sample_blured(sampler2D u_map, vec2 uv, float radius, float gamma)
  {
      vec4 pix = vec4(0.);
      float norm = 0.;

      float log2radius = log2(radius);

      //weighted integration over mipmap levels
      for(float i = 0.; i < 10.; i += 0.5)
      {
          float k = weight(i, log2radius, gamma);
          pix += k * texture(u_map, uv, i); 
          norm += k;
      }

      //nomalize, and a bit of brigtness hacking 
      return pix*pow(norm,-0.95);
      //return texture2D(u_map, uv, 7.7123);
  }

  void main() {
    vec3 color = sample_blured(u_map, vUv, blur, gamma).rgb;
    gl_FragColor = vec4(color, 1.);
  }