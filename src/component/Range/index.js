import React from 'react'
import cls from './style.module.scss'

class Range extends React.Component {

  handleChange = e => {
    this.props.onChangeValue(this.getAdjustedValue(e.target.value))
  }

  getAdjustedValue = val => {
    return this.props.steps.reduce((p, c) =>
      Math.abs(p - val) < Math.abs(c - val) ? p : c
    );
  }

  componentDidMount() {
    const { steps, id } = this.props
    const copyFunc = this.getAdjustedValue
    document.getElementById(id).oninput = function () {
      const val = (copyFunc(this.value) - steps[0]) / (steps[steps.length - 1] - steps[0]);
      this.style.background = 'linear-gradient(to right, #f24423 0%, #f24423 ' + val * 100 + '%, #9e9e9e ' + val * 100 + '%, #9e9e9e 100%)'
    };
  }

  render() {
    const
      { steps, text, value, id } = this.props,
      min = steps[0],
      max = steps[steps.length - 1];

    return (
      <div className={cls.range_style}>
        <div className={cls.text_container}>
          <p>{text}</p>
          <p>{value}</p>
        </div>
        <input
          type="range"
          id={id}
          min={min}
          max={max}
          value={value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Range