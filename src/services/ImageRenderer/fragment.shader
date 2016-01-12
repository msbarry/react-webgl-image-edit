precision mediump float;

// our texture
uniform sampler2D u_image;
uniform float u_hue;
uniform float u_saturation;
uniform float u_value;
uniform float u_red;
uniform float u_green;
uniform float u_blue;
uniform float u_contrast;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
  vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 clip(vec3 i) {
  return vec3(
    max(0.0, min(1.0, i.x)),
    max(0.0, min(1.0, i.y)),
    max(0.0, min(1.0, i.z))
  );
}

vec3 adjustVec(vec3 a, vec3 b) {
  return clip(a + b);
}

vec3 adjustHsv(vec3 c) {
  vec3 hsv = rgb2hsv(c);
  hsv.xyz = adjustVec(hsv, vec3(u_hue, u_saturation, u_value));
  return hsv2rgb(hsv);
}

void main() {
  vec4 color = texture2D(u_image, v_texCoord);

  color.rgb = adjustHsv(color.rgb);
  color.rgb = adjustVec(color.rgb, vec3(u_red, u_green, u_blue));

  // adjust contrast
  float ccf = 1.016 * (u_contrast + 1.0) / (1.016 - u_contrast);
  color.rgb = clip(ccf * (color.rgb - 0.5) + 0.5);


  gl_FragColor = color;
}
