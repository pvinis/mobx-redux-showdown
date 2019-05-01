import React, { Component } from 'react'

import ValueSetDisplay from './ValueSetDisplay'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">

        <ValueSetDisplay code="34206005" valueSet="511308" />
        <ValueSetDisplay code="6064005" valueSet="511308" />
        <ValueSetDisplay code="non-existent-code" valueSet="511308" />

      </div>
    )
  }
}

export default App
