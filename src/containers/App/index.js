
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
    return (
      <div className={style.normal}>
        <ModifiedImage
          maxWidth={200}
          image={this.state.image}
        />
        <ModifiedImage
          maxWidth={200}
          image={this.state.image}
          darker={0.5}
        />
        <ModifiedImage
          maxWidth={200}
          image={this.state.image}
          contrast={-0.25}
        />
        <ModifiedImage
          maxWidth={200}
          image={this.state.image}
          contrast={0}
        />
        <ModifiedImage
          maxWidth={200}
          image={this.state.image}
          contrast={0.9}
        />
      </div>
    );
  }
}

if (module.hot) {
  App.prototype.willHotReload = function willHotReload() {
    if (this.state.image) {
      this.setState({
        image: new ImageRenderer(this.state.image.image)
      });
    }
  };
}

export default App;
