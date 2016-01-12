
import React, { Component, PropTypes } from 'react';
import ImageRenderer from '~/src/services/ImageRenderer';

const pixelRatio = (window.devicePixelRatio || 1) * 2;

export default class ModifiedImage extends Component {
  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  getDimensions() {
    const { maxWidth = 400, image } = this.props;
    let width = maxWidth;
    let height = width * 0.75;
    if (image) {
      const aspectRatio = image.height / image.width;
      width = Math.min(image.width, maxWidth);
      height = aspectRatio * width;
    }
    return {
      width,
      height,
      canvasWidth: width * pixelRatio,
      canvasHeight: height * pixelRatio
    };
  }

  updateCanvas() {
    const { image } = this.props;
    const { canvasWidth, canvasHeight } = this.getDimensions();
    const { canvas } = this.refs;
    const destContext = canvas.getContext('2d');
    destContext.clearRect(0, 0, canvasWidth, canvasHeight);

    if (image) {
      const props = Object.assign({}, this.props, {
        width: canvasWidth,
        height: canvasHeight
      });
      const sourceCanvas = image.renderToCanvas(props);
      destContext.drawImage(sourceCanvas, 0, 0);
    }
  }

  render() {
    const { width, height, canvasWidth, canvasHeight } = this.getDimensions();
    const { image } = this.props;
    const download = () => {
      const clippedHeight = Math.min(1080, image.height);
      const props = Object.assign({}, this.props, {
        width: image.width * clippedHeight / image.height,
        height: clippedHeight
      });
      const sourceCanvas = image.renderToCanvas(props);
      window.open(sourceCanvas.toDataURL());
    };
    return (
      <canvas
        width={canvasWidth}
        height={canvasHeight}
        ref="canvas"
        onClick={download}
        style={{
          width,
          height
        }}
      />
    );
  }
}

ModifiedImage.PropTypes = {
  maxWidth: PropTypes.number,
  image: PropTypes.instanceOf(ImageRenderer),
  darker: PropTypes.number,
  lighter: PropTypes.number
};
