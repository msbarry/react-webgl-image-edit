
import React, { Component } from 'react';
import Header from '~/src/components/Header';
import Counter from '~/src/components/Counter';
import style from './style.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  componentDidMount() {
    this._interval = setInterval(() => {
      this.setState({ counter: this.state.counter + 1 });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
    const { counter } = this.state;
    const increment = () => this.setState({ counter: counter + 1 });
    const decrement = () => this.setState({ counter: counter - 1 });

    return (
      <div className={style.normal}>
        <Header/>
        <Counter counter={counter} increment={increment} decrement={decrement}/>
      </div>
    );
  }
}

export default App;
