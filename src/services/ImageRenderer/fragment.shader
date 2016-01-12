precision mediump float;

// our texture
uniform sampler2D u_image;
uniform float u_darker;
uniform float u_lighter;
uniform float u_contrast;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {
  vec4 color = texture2D(u_image, v_texCoord);
  color.rgb = color.rgb * (1.0 - u_darker);
  color.rgb = 1.0 - (1.0 - color.rgb) * (1.0 - u_lighter);
  color.rgb = (color.rgb - 0.5) * u_contrast + 0.5;
  gl_FragColor = color;
}