import React, { Component } from 'react'
import format from 'date-fns/format'
import { usedDays } from '../calculateDays'
import SimpleReactCalendar from 'simple-react-calendar'
import '../calendar.css'

function completeRange(range) {
  return range.start && range.end
}

function SelectedRange({ range }) {
  return (
    <div>
      Selected range:{' '}
      {completeRange(range) ? (
        <div>
          {format(range.start, 'DD-MM-YYYY')}-{format(range.end, 'DD-MM-YYYY')}
        </div>
      ) : (
        <div>-</div>
      )}
    </div>
  )
}

export default class DatesForm extends Component {
  constructor(props) {
    super(props)
    this.state = { dates: [{ start: null, end: null }] }
    // This binding is necessary to make `this` work in the callback
    this.addNewItem = this.addNewItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  updateDates(index, range) {
    const newDates = Object.assign([], this.state.dates)
    newDates[index] = range
    this.setState({ dates: newDates })
  }

  addNewItem(e) {
    const dates = Object.assign([], this.state.dates)
    dates.push({ start: null, end: null })
    this.setState({ dates: dates })
  }

  removeItem(index) {
    const dates = Object.assign([], this.state.dates)
    dates.splice(index, 1)
    this.setState({ dates: dates })
  }

  render() {
    const spendDays = usedDays(this.state.dates)
    return (
      <div>
        {this.state.dates.map((range, index) => (
          <div key={index.toString()}>
            <SelectedRange range={range} />
            <SimpleReactCalendar
              selected={completeRange(range) && range}
              activeMonth={new Date()}
              mode="range"
              onSelect={range => this.updateDates(index, range)}
            />
            <button
              className="button-delete"
              onClick={() => this.removeItem(index)}
              disabled={this.state.dates.length == 1}
            >
              Delete
            </button>
          </div>
        ))}
        <button className="button-add" onClick={this.addNewItem}>
          Add more
        </button>

        {!!spendDays && (
          <div className="result">
            {spendDays} {spendDays === 1 ? 'day spend' : 'days spend'}
          </div>
        )}
      </div>
    )
  }
}
