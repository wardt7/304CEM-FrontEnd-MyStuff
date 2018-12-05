/**
 * Component for rendering a header
 * @module components/header
 */

import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
    /**
     * Constructor for binding functions to this component
     * @constructor
     */
    constructor (props) {
	super(props)
        this.handleSignup = this.handleSignup.bind(this)
	this.handleLogin = this.handleLogin.bind(this)
	this.handleProductUpload = this.handleProductUpload.bind(this)
	this.handleViewMessage = this.handleViewMessage.bind(this)
	this.checkToken = this.checkToken.bind(this)
    }
    /**
     * Wrapper function for handling when someone clicks the login button
     * @param {Object} event - The event object spawned
     * @param {function} props.onLogin - The function to be ran when someone wants to log in
     */
    handleLogin(event){
	event.preventDefault()
	this.props.onLogin()
    }
    /**
     * Wrapper function for handling when someone clicks the signup button
     * @param {Object} event - The event object spawned
     * @param {function} props.onSignup - The function to be ran when someone wants to sign up
     */
    handleSignup(event){
	event.preventDefault()
	this.props.onSignup()
    }
    /**
     * Wrapper function for handling when someone clicks the upload product button
     * @param {Object} event - The event object spawned
     * @param {function} props.onProduct - The function to be ran when someone wants to upload a product
     */
    handleProductUpload(event){
	event.preventDefault()
	this.props.onProduct()
    }
    /**
     * Wrapper function for handling when someone clicks the view messages button
     * @param {Object} event - The event object spawned
     * @param {function} props.onViewMessage - The function to be ran when someone wants to view their messages
     */
    handleViewMessage(event){
	event.preventDefault()
	this.props.onViewMessage()
    }
    /**
     * Function for displaying the appropriate options based on whether or not a user is logged in
     * @param {string|null} token - The token found in session storage
     * @returns {Object} JSX
     */
    checkToken(){
	var token = sessionStorage.getItem('token')
	if(token !== null){
	    return (
		    <div className="header-right">
		    <a href="#productUpload" onClick={this.handleProductUpload}>Upload Product</a>
		    <a href="#viewMessage" onClick={this.handleViewMessage}>View Messages</a>
		    </div>
	    )
	} else {
	    return (
		    <div className="header-right">
		    <a href="#signup" onClick={this.handleSignup}>Sign Up!</a>
		    <a href="#login" onClick={this.handleLogin}>Login</a>
		    </div>
	    )
	}
    }
    /**
     * Function for rendering the header
     * @param {string} props.logo - The logo of the website to display
     * @param {string} props.title - The name of the website
     * @returns {Object} JSX 
     */
    render () {
	var headerRight = this.checkToken()
        return (
		<div className="header">
		<img src={this.props.logo} alt="MyStuff logo"/><a href="#default" className="logo">{this.props.title} </a>
		{headerRight}
		</div>
	)
	
    }
}
export default Header
