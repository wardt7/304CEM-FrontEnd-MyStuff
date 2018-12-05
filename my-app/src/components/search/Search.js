/**
 * Component for creating a search bar
 * @module components/search
 */

import React, { Component } from 'react'
import './Search.css'
class Search extends Component {
  /**
   * Constructor for binding functions to the component and for creating a component state containing the current search term
   * @constructor
   */
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
  }
  /**
   * Function for setting the searchTerm state whenever a user types into the search bar
   * @param {Object} event - The event object containing the search term
   */
  handleTextChange (event) {
    this.setState({ searchTerm: event.target.value })
  }
  /**
   * Function for handling whenever the user submits a query to the API
   * @param {Object} event - The event that was trigged when the search button was clicked
   * @param {string} state.searchTerm - The query to send to the API
   * @param {function} props.onSearchClick - The function that sends the query to the API
   */
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
