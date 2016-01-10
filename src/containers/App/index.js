
import React, { Component } from 'react';
import Webgl from '~/src/components/Webgl';
import style from './style.css';

class App extends Component {
  render() {
    return (
      <div className={style.normal}>
        <Webgl width={400} height={300} opacity={0.8}/>
      </div>
    );
  }
}

export default App;
