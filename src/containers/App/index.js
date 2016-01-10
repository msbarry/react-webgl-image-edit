
import React, { Component } from 'react';
import Webgl from '~/src/components/Webgl';
import style from './style.css';
import example from '~/src/static/example.jpg';
import leaves from '~/src/static/leaves.jpg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const image = new Image();
    image.src = example;
    image.onload = () => this.setState({ image });
  }

  render() {
    return (
      <div className={style.normal}>
        <Webgl maxWidth={400} image={this.state.image}/>
      </div>
    );
  }
}

export default App;
