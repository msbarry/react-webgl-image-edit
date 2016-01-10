
import React, { Component } from 'react';

const pixelRatio = window.devicePixelRatio || 1;

class Webgl extends Component {
  componentDidMount() {
    const { canvas } = this.refs;
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      this._gl = gl;
      this.initCanvas();
    } catch (e) {
      console.error(e);
    }
  }

  componentDidUpdate(prevProps) {
    const gl = this._gl;
    if (prevProps.width !== this.props.width || prevProps.height !== this.props.height) {
      gl.viewport(0, 0, this.props.width * pixelRatio, this.props.height * pixelRatio);
    }
    if (prevProps.opacity !== this.props.opacity) {
      gl.clearColor(0.0, 0.0, 0.0, this.props.opacity);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
  }
  // TODO
  // - attribute shader
  // - vertex shader
  // - attributes
  // - constants

  initCanvas() {
    const gl = this._gl;
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, this.props.opacity);
    // Enable depth testing
    gl.enable(gl.DEPTH_TEST);
    // Near things obscure far things
    gl.depthFunc(gl.LEQUAL);
    // Clear the color as well as the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  render() {
    const {
      width,
      height
    } = this.props;

    return (
      <canvas
        width={width * pixelRatio}
        height={height * pixelRatio}
        ref="canvas"
        style={{
          width,
          height
        }}
      />
    );
  }
}

export default Webgl;
