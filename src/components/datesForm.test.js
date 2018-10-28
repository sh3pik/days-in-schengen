import { shallow, mount } from 'enzyme'
import React from 'react'
import DatesForm from './datesForm'

describe('DateForms', () => {
  describe('empty form', () => {
    const myDate = new Date(2018, 7, 30)
    const RealDate = Date

    beforeAll(() => {
      global.Date = jest.fn(
        (...props) =>
          props.length ? new RealDate(...props) : new RealDate(myDate)
      )
      Object.assign(Date, RealDate)
    })

    afterAll(() => {
      global.Date = RealDate
    })
    it('renders correctly', () => {
      const wrapper = shallow(<DatesForm />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('form behavor', () => {
    const wrapper = mount(<DatesForm />)

    it('adds a new calendar after click on Add More', () => {
      wrapper
        .find('button.button-add')
        .first()
        .simulate('click')
      expect(wrapper.find('div.calendar').length).toEqual(2)
    })

    it('deletes a calendar after click on Delete', () => {
      wrapper.setState({
        dates: [{ start: null, end: null }, { start: null, end: null }]
      })
      wrapper
        .find('button.button-delete')
        .first()
        .simulate('click')
      expect(wrapper.find('div.calendar').length).toEqual(1)
    })

    it('shows the result', () => {
      wrapper.setState({
        dates: [{ start: new Date(2018, 7, 20), end: new Date(2018, 7, 21) }]
      })
      expect(wrapper.find('.result').text()).toEqual('2 days spend')
    })
  })
})
