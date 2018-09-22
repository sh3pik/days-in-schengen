import { calculateDaysBackFor, usedDays } from './calculateDays'

describe('#calculateDaysBack', () => {
  const myDate = new Date(2018, 7, 30)
  const RealDate = Date

  beforeAll(() => {
    // Today is 30 August, 2018
    // 180 days ago is 4 March, 2018
    global.Date = jest.fn(
      (...props) =>
        props.length ? new RealDate(...props) : new RealDate(myDate)
    )
    Object.assign(Date, RealDate)
  })

  afterAll(() => {
    global.Date = RealDate
  })

  it('returns 0 for the range out of 180 days ago', () => {
    var range = {
      start: new Date(2018, 0, 30),
      end: new Date(2018, 1, 15)
    }
    expect(calculateDaysBackFor(range)).toBe(0)
  })

  it('returns 1 for the range with the end date equal 180 days ago', () => {
    var range = {
      start: new Date(2018, 2, 2),
      end: new Date(2018, 2, 4)
    }
    expect(calculateDaysBackFor(range)).toBe(1)
  })

  it('returns number of days after 180 days ago in the range', () => {
    var range = {
      start: new Date(2018, 2, 2),
      end: new Date(2018, 2, 5)
    }
    expect(calculateDaysBackFor(range)).toBe(2)
  })

  it('returns number of days after 180 days ago in the range with the start date = 180 days ago', () => {
    var range = {
      start: new Date(2018, 2, 4),
      end: new Date(2018, 2, 6)
    }
    expect(calculateDaysBackFor(range)).toBe(3)
  })

  it('returns number of days in the range', () => {
    var range = {
      start: new Date(2018, 2, 5),
      end: new Date(2018, 2, 8)
    }
    expect(calculateDaysBackFor(range)).toBe(4)
  })
})

describe('#usedDays', () => {
  const myDate = new Date(2018, 7, 30)
  const RealDate = Date

  beforeAll(() => {
    // Today is 30 August, 2018
    // 180 days ago is 4 March, 2018
    global.Date = jest.fn(
      (...props) =>
        props.length ? new RealDate(...props) : new RealDate(myDate)
    )
    Object.assign(Date, RealDate)
  })

  afterAll(() => {
    global.Date = RealDate
  })

  it('returns number of used days for all ranges', () => {
    var ranges = [
      {
        start: new Date(2018, 0, 30),
        end: new Date(2018, 1, 15)
      },
      {
        start: new Date(2018, 2, 5),
        end: new Date(2018, 2, 5)
      }
    ]
    expect(usedDays(ranges)).toBe(1)
  })
})
