// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }
  handleSearchSubmit (event) {
    event.preventDefault()
    this.props.onSearchClick(this.state.searchTerm)
  }
  handleTextChange (event) {
    this.setState({ searchTerm: event.target.value })
  }
  render () {
    return (
      <div className="header">
        <img src={this.props.logo} alt="React logo"/><a href="#default" className="logo">{this.props.title} </a>
        <div className="header-right">
          <div className="search-container">
            <form action="">
              <input type="text" placeholder="Search.." name="txtSearch" onChange={this.handleTextChange} value={this.state.searchTerm} />
              <button type="submit" onClick={this.handleSearchSubmit}>Search</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default Header
