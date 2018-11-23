// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
import './Header.css'

class Header extends Component {
    constructor (props) {
	super(props)
        this.handleSignup = this.handleSignup.bind(this)
	this.handleLogin = this.handleLogin.bind(this)
	this.handleProductUpload = this.handleProductUpload.bind(this)
	this.handleViewMessage = this.handleViewMessage.bind(this)
    }
    handleLogin(event){
	event.preventDefault()
	this.props.onLogin()
    }
    handleSignup(event){
	event.preventDefault()
	this.props.onSignup()
    }
    handleProductUpload(event){
	event.preventDefault()
	this.props.onProduct()
    }
    handleViewMessage(event){
	event.preventDefault()
	this.props.onViewMessage()
    }
    render () {
	// eslint-disable
        return (
		<div className="header">
		<img src={this.props.logo} alt="React logo"/><a href="#default" className="logo">{this.props.title} </a>
		<div className="header-right">
                <a href="#signup" onClick={this.handleSignup}>Sign Up!</a>
		<a href="#login" onClick={this.handleLogin}>Login</a>
		<a href="#productUpload" onClick={this.handleProductUpload}>Upload</a>
		<a href="#viewMessage" onClick={this.handleViewMessage}>View Messages</a>
		</div>
		</div>
	)
	// eslint-enable
    }
}
export default Header
