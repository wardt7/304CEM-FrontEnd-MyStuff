import React, { Component } from 'react'
import './Search.css'
class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }
  handleTextChange (event) {
    this.setState({ searchTerm: event.target.value })
  }
  handleSearchSubmit (event) {
    event.preventDefault()
    this.props.onSearchClick(this.state.searchTerm)
  }
  render () {
    return (
      <div className="searchBar">
        <form className="searchForm" action="">
          <input type="text" placeholder="Search..." name="txtSearch" onChange={this.handleTextChange} value={this.state.searchTerm} />
          <button type="submit" onClick={this.handleSearchSubmit}>Search...</button>
        </form>
      </div>
    )
  }
}
export default Search
