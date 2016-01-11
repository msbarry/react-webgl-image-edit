
import fragmentShader from 'raw!./fragment.shader';
import vertexShader from 'raw!./vertex.shader';

function shaderProgram(gl, vs, fs) {
  const prog = gl.createProgram();
  const addshader = (type, source) => {
    const s = gl.createShader((type === 'vertex') ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      throw new Error(`Could not compile ${type} shader: ${gl.getShaderInfoLog(s)}`);
    }
    gl.attachShader(prog, s);
  };
  addshader('vertex', vs);
  addshader('fragment', fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error('Could not link the shader program!');
  }
  return prog;
}


function setRectangle(gl, x, y, width, height) {
  const x1 = x;
  const x2 = x + width;
  const y1 = y;
  const y2 = y + height;
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    x1, y1,
    x2, y1,
    x1, y2,
    x1, y2,
    x2, y1,
    x2, y2
  ]), gl.STATIC_DRAW);
}

export default class ImageRenderer {
  constructor(image) {
    this.image = image;
    this.height = image.height;
    this.width = image.width;
    const canvas = document.createElement('canvas');
    this.canvas = canvas;
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      this._gl = gl;

      // create all shaders and programs.
      const program = shaderProgram(gl, vertexShader, fragmentShader);
      gl.useProgram(program);
      const positionLocation = gl.getAttribLocation(program, 'a_position');
      const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
      this.setResolution = (width, height) => gl.uniform2f(resolutionLocation, width, height);

      // create buffers and upload vertex data
      const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(texCoordLocation);
      gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

      // create textures and upload texture data
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Set the parameters so we can render any size image.
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

      // Upload the image into the texture.
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    } catch (e) {
      console.error(e);
    }
  }

  render({ width, height }) {
    const gl = this._gl;
    this.canvas.width = width;
    this.canvas.height = height;
    // clear and set the viewport and other global state
    // (enable depth testing, turn on culling, etc..)
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.viewport(0, 0, width, height);
    // setup uniforms for the thing you want to draw
    this.setResolution(width, height);
    // call gl.uniformXXX for each uniform
    // call gl.activeTexture and gl.bindTexture to assign textures to texture units.
    setRectangle(gl, 0, 0, width, height);
    // call gl.drawArrays or gl.drawElements
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    return this.canvas;
  }
}
