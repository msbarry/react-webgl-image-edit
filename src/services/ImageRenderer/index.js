export default class ImageRenderer {
  constructor(image) {
    this.image = image;
  }

  render() {
    return this.image;
  }
}


// import React, { Component } from 'react';
// import fragmentShader from 'raw!./fragment.shader';
// import vertexShader from 'raw!./vertex.shader';

// const pixelRatio = window.devicePixelRatio || 1;

// function shaderProgram(gl, vs, fs) {
//   const prog = gl.createProgram();
//   const addshader = (type, source) => {
//     const s = gl.createShader((type === 'vertex') ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
//     gl.shaderSource(s, source);
//     gl.compileShader(s);
//     if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
//       throw new Error(`Could not compile ${type} shader: ${gl.getShaderInfoLog(s)}`);
//     }
//     gl.attachShader(prog, s);
//   };
//   addshader('vertex', vs);
//   addshader('fragment', fs);
//   gl.linkProgram(prog);
//   if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
//     throw new Error('Could not link the shader program!');
//   }
//   return prog;
// }


// function setRectangle(gl, x, y, width, height) {
//   const x1 = x;
//   const x2 = x + width;
//   const y1 = y;
//   const y2 = y + height;
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//     x1, y1,
//     x2, y1,
//     x1, y2,
//     x1, y2,
//     x2, y1,
//     x2, y2]), gl.STATIC_DRAW);
// }


// class Webgl extends Component {
//   componentDidMount() {
//     const { canvas, copyCanvas } = this.refs;
//     try {
//       const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
//       this.destContext = copyCanvas.getContext('2d');
//       this._gl = gl;
//       const program = shaderProgram(gl, vertexShader, fragmentShader);
//       gl.useProgram(program);
//       const positionLocation = gl.getAttribLocation(program, 'a_position');
//       const texCoordLocation = gl.getAttribLocation(program, 'a_texCoord');
//       const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
//       this.setPosition = () => {
//         gl.enableVertexAttribArray(positionLocation);
//         gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
//       };
//       this.setTexCoord = () => {
//         gl.enableVertexAttribArray(texCoordLocation);
//         gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);
//       };
//       this.setResolution = (width, height) => gl.uniform2f(resolutionLocation, width, height);
//       this.componentDidUpdate({});
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   componentDidUpdate(prevProps) {
//     const gl = this._gl;
//     const { canvas } = this.refs;
//     const { image } = this.props;
//     if (!gl) {
//       return;
//     }
//     gl.viewport(0, 0, canvas.width, canvas.height);
//     if (!image) {
//       // Set clear color to black, fully opaque
//       gl.clearColor(0.0, 0.0, 0.0, 1.0);
//       // Enable depth testing
//       gl.enable(gl.DEPTH_TEST);
//       // Near things obscure far things
//       gl.depthFunc(gl.LEQUAL);
//       // Clear the color as well as the depth buffer.
//       gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//       return;
//     }

//     // look up where the vertex data needs to go.

//     // provide texture coordinates for the rectangle.
//     const texCoordBuffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
//     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
//       0.0, 0.0,
//       1.0, 0.0,
//       0.0, 1.0,
//       0.0, 1.0,
//       1.0, 0.0,
//       1.0, 1.0]), gl.STATIC_DRAW);
//     this.setTexCoord();

//     // Create a texture.
//     if (image !== prevProps.image) {
//       const texture = gl.createTexture();
//       gl.bindTexture(gl.TEXTURE_2D, texture);

//       // Set the parameters so we can render any size image.
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
//       gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

//       // Upload the image into the texture.
//       gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
//     }

//     // lookup uniforms

//     // set the resolution
//     this.setResolution(canvas.width, canvas.height);

//     // Create a buffer for the position of the rectangle corners.
//     const buffer = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
//     this.setPosition();

//     // Set a rectangle the same size as the image.
//     setRectangle(gl, 0, 0, canvas.width, canvas.height);

//     // Draw the rectangle.
//     gl.drawArrays(gl.TRIANGLES, 0, 6);
//     this.destContext.drawImage(canvas, 0, 0);
//   }

//   render() {
//     const { maxWidth, image } = this.props;
//     let width = 400;
//     let height = 300;
//     if (image) {
//       const aspectRatio = image.height / image.width;
//       width = Math.min(image.width, maxWidth);
//       height = aspectRatio * width;
//     }

//     return (
//       <div>
//         <canvas
//           width={width * pixelRatio}
//           height={height * pixelRatio}
//           ref="canvas"
//           style={{
//             width,
//             height,
//             border: '1px solid red',
//             display: 'none'
//           }}
//         />
//         <canvas
//           width={width * pixelRatio}
//           height={height * pixelRatio}
//           ref="copyCanvas"
//           style={{
//             width,
//             height,
//             border: '1px solid red'
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default Webgl;
