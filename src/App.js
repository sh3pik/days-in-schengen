import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Schengen Calculator</h1>
        </header>
        <p className="App-intro">
          The app will help you to calculate how many days you can stay in
          Schegen zone and not to break any rules.
        </p>
      </div>
    )
  }
}

export default App
