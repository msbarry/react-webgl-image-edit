
import React, { Component } from 'react';
import ModifiedImage from '~/src/components/ModifiedImage';
import ImageRenderer from '~/src/services/ImageRenderer';
import style from './style.css';
import example from '~/src/static/example.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const image = new Image();
    image.src = example;
    image.onload = () => this.setState({
      image: new ImageRenderer(image)
    });
  }

  render() {
    const images = [];
    for (let i = 0; i < 1.0; i = i + 0.1) {
      images.push(<ModifiedImage
        maxWidth={100}
        image={this.state.image}
        darker={i}
        key={i}
      />);
    }
    return (
      <div className={style.normal}>
        {images}
      </div>
    );
  }
}

export default App;
