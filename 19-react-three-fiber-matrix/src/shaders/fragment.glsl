//from: https://www.shadertoy.com/view/ldccW4#

uniform sampler2D uChannel0;
uniform sampler2D uChannel1;
uniform vec2 uChannelResolution;
uniform float uResolution;
uniform float uTime;
varying vec2 vUv;

float text(vec2 fragCoord)
{
    vec2 uv = mod(fragCoord.xy, 16.)*.0625;
    vec2 block = fragCoord*.0625 - uv;
    uv = uv*.8+.1; // scale the letters up a bit
    uv += floor(texture2D(uChannel1, block/uChannelResolution.xy + uTime*.002).xy * 16.); // randomize letters
    uv *= .0625; // bring back into 0-1 range
    //uv.x = -uv.x; // flip letters horizontally
    return texture2D(uChannel0, uv).r;
}

vec3 rain(vec2 fragCoord)
{
	fragCoord.x -= mod(fragCoord.x, 16.);
    //fragCoord.y -= mod(fragCoord.y, 16.);
    
    float offset=sin(fragCoord.x*15.);
    float speed=cos(fragCoord.x*3.)*.3+.7;
   
    float y = fract(fragCoord.y/uResolution + uTime*speed + offset);
    return vec3(.1,1,.35) / (y*20.);
}

void main()
{
    gl_FragColor = vec4(text(gl_FragCoord.xy)*rain(gl_FragCoord.xy),1.0);
}