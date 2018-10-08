import React, { Component } from 'react'
import parse from 'date-fns/parse'
import { usedDays } from '../calculateDays'

export default class DatesForm extends Component {
  constructor(props) {
    super(props)
    this.state = { dates: [], spendDays: 0 }
  }

  updateDate(index, key, newValue) {
    const newDates = Object.assign([], this.state.dates)
    newDates[index] = newDates[index] || {}
    newDates[index][key] = newValue
    this.setState({ dates: newDates })
  }

  showDays(e) {
    e.preventDefault()
    const spendDays = usedDays(
      this.state.dates.map(({ start, end }) => ({
        start: parse(start),
        end: parse(end)
      }))
    )
    this.setState({ spendDays })
  }

  render() {
    let result = ''
    const spendDays = this.state.spendDays
    if (spendDays !== 0) {
      const text = spendDays === 1 ? ' day spend' : ' days spend'
      result = spendDays + text
    }
    return (
      <form onSubmit={this.showDays.bind(this)}>
        <p>Write days in mm-dd-yyyy format</p>
        {this.state.dates
          .concat({ start: null, end: null })
          .map(({ start, end }, index) => (
            <div key={index.toString()}>
              <label>Day In:</label>
              <input
                onChange={e => this.updateDate(index, 'start', e.target.value)}
              />
              <label>Day Out:</label>
              <input
                onChange={e => this.updateDate(index, 'end', e.target.value)}
              />
            </div>
          ))}

        <button>Press me</button>
        <div>{result}</div>
      </form>
    )
  }
}
