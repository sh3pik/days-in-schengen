import { shallow } from 'enzyme'
import React from 'react'
import DatesForm from './datesForm'

describe('DateForms', () => {
  const wrapper = shallow(<DatesForm />)

  it('renders empty form', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('updates state with data from the fields', () => {
    const inputElement = wrapper.find('input')
    inputElement.first().simulate('change', { target: { value: '06-06-2018' } })
    inputElement.last().simulate('change', { target: { value: '06-07-2018' } })
    expect(wrapper.state()).toEqual({
      dates: [{ start: '06-06-2018', end: '06-07-2018' }],
      spendDays: 0
    })
  })

  it('submits the form', () => {
    const inputElement = wrapper.find('input')
    wrapper.setState({
      dates: [{ start: '08-06-2018', end: '08-07-2018' }],
      spendDays: 0
    })
    wrapper.find('form').simulate('submit', { preventDefault() {} })
    expect(wrapper.state()).toEqual({
      dates: [{ start: '08-06-2018', end: '08-07-2018' }],
      spendDays: 2
    })
  })

  it('shows the result', () => {
    const buttonElement = wrapper.find('button')
    wrapper.setState({
      spendDays: 2
    })
    buttonElement.simulate('click')
    expect(wrapper.text()).toMatch('2 days spend')
  })
})
