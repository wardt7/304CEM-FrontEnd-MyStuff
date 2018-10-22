import React, { Component } from 'react';
import './Header.css';
import react_logo from '../../logo.svg';

class Header extends Component {
    handleSearchSubmit(event){
	event.preventDefault();
	console.log('search button was clicked');
    }
    render() {
	return (
		<div className="header">
		<img src={react_logo} alt="React logo"/><a href="#default" cLassName="logo"> React App Header </a>
		<div className="header-right">
		<div className="search-container">
		<form action="">
		<input type="text" placeholder="Search.." name="txtSearch" onChange={this.handleInputChange} />
		<button type="submit" onClick={this.handleSearchSubmit}>Search</button>
		</form>
		</div>
		</div>
		</div>
	);
    }
}
export default Header;
