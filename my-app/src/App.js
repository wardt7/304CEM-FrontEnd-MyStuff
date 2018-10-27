// eslint-disable no-unusued-vars
import React, { Component } from 'react'
import './App.css'
import Header from './components/header/Header'
import reactLogo from './logo.svg'
// eslint-enable no-unusued-vars

class App extends Component {
  onSearch (term) {
    console.log('search on term:' + term)
  }
  render () {
    return (
      <div>
        <Header title="Classified Ads" logo={reactLogo} onSearchClick={this.onSearch}/>
        <a href="#default" className="logo">{this.props.title}</a>
      </div>
    )
  }
}

export default App
