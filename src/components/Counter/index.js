
import React, { Component, PropTypes } from 'react';

class Counter extends Component {
  render() {
    const { increment, decrement } = this.props;
    return (
      <div>
        <div>Counter = <span id="cntr">{this.props.counter}</span></div>
        <button id="incr" onClick={increment}>+</button>
        <button id="decr" onClick={decrement}>-</button>
      </div>
    );
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

export default Counter;
