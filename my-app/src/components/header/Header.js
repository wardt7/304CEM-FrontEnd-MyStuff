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
	this.checkToken = this.checkToken.bind(this)
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
    checkToken(){
	var token = sessionStorage.getItem('token')
	console.log(token)
	// eslint-disable
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
	// eslint-enable
    }
    render () {
	var headerRight = this.checkToken()
        return (
		<div className="header">
		<img src={this.props.logo} alt="React logo"/><a href="#default" className="logo">{this.props.title} </a>
		{headerRight}
		</div>
	)
	
    }
}
export default Header
