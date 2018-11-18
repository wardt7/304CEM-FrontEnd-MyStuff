// eslint-disable no-unusued-vars
import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/header/Header'
import Search from './components/search/Search'
import Modal from './components/modal/Modal'
import Grid from './components/grid/Grid'
import reactLogo from './logo.svg'
// eslint-enable no-unusued-vars

var clickedProductID = null
var clickedMessageID = null
var apiUrl = 'http://localhost:8080'

class App extends Component {
    constructor(props){
	super(props)
	this.state = {
	    currentModal: "none",
	    toUser: null,
	    products: {
		"content": []
	    },
	    messages: {
		"content": []
	    }
	}
	this.onProductClick = this.onProductClick.bind(this)
	this.onModalExitClick = this.onModalExitClick.bind(this)
	this.onSignupClick = this.onSignupClick.bind(this)
	this.onLoginClick = this.onLoginClick.bind(this)
	this.onProductUploadClick = this.onProductUploadClick.bind(this)
	this.onSendMessageClick = this.onSendMessageClick.bind(this)
	this.onViewMessageClick = this.onViewMessageClick.bind(this)
	this.onViewIndividualMessageClick = this.onViewIndividualMessageClick.bind(this)
	this.fetchProducts = this.fetchProducts.bind(this)
	this.fetchMessages = this.fetchMessages.bind(this)
	this.sendSignUp = this.sendSignUp.bind(this)
	this.sendLogin = this.sendLogin.bind(this)
	this.sendMessage = this.sendMessage.bind(this)
    }
    fetchProducts(){
	axios.get(`${apiUrl}/products`)
	    .then(response => {
		this.setState({currentModal: this.state.currentModal, products: response.data})
		return response.data
	    })
	    .catch(response => {
		return response.data
	    })
    }
    fetchMessages(){
	var componentThis = this
	var token = sessionStorage.getItem('token')
	if(token == null){
	    return null
	} else {
	    var msgData = { content: [] }
	    console.log(apiUrl)
	    fetch(`${apiUrl}/messages`, {
		method: "GET",
		headers: {
		    "Authorization": token
		}
	    })
		.then(response => {
		    if(response.status === 200){
			response.json().then(function(data) {
			    componentThis.setState({messages: data})
			    console.log(data)
			    console.log(componentThis.state.messages)
			})
		    }
		})
		.catch(function(err) {
		    console.log('error')
		})
	}
	console.log(this.state)
    }
    sendSignUp(values){
	axios({
	    method: 'post',
	    url: `${apiUrl}/users`,
	    data: values,
            withCredentials: true,
	    config: { headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json'}}
	})
	    .then(response => {
		if(response.status === 200){
		    sessionStorage.setItem('token', response.data.token)
		} else {
		    console.log(response)
		}
	    })
	    .catch(response => {
		console.log(response)
	    })
    }
    sendLogin(values){
	axios({
	    method: 'post',
	    url: `${apiUrl}/users/login`,
	    data: values,
	    config: { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}}
	})
	    .then(response => {
		if(response.status === 200){
		    sessionStorage.setItem('token', response.data.token)
		} else {
		    console.log(response)
		}
	    })
	    .catch(response => {
		console.log(response)
	    })
    }
    sendMessage(values){
	var token = sessionStorage.getItem('token')
        console.log(token)
	fetch(`${apiUrl}/messages`, {
	    method: "POST",
	    headers: {
		"Content-Type": "application/json; charset=utf-8",
		"Authorization": token
	    },
	    body: JSON.stringify(values)
	})
	    .then(response => {
		if(response.status === 201){
		    console.log('Message sent successfully')
		} else {
		    console.log(response.request)
		}
	    })
	    .catch(response => {
                console.log(response.request)
	    })
    }
    componentDidMount(){
	this.fetchProducts()
    }
    onSearch (term) {
	console.log('search on term:' + term)
    }
    onViewMessageClick(){
	this.setState({currentModal: "viewMessage"})
    }
    onProductClick (id) {
	console.log('showing full product with id:' + id)
	this.setState({currentModal: "product"})
	clickedProductID = id
    }
    onViewIndividualMessageClick (id) {
	this.setState({currentModal: "viewIndividualMessage"})
	clickedMessageID = id
    }
    onProductUploadClick(){
	this.setState({currentModal: "productUpload"})
    }
    onSignupClick(){
	this.setState({currentModal: "signup"})
    }
    onLoginClick(){
	this.setState({currentModal: "login"})
    }
    onModalExitClick(){
	this.setState({currentModal: "none"})
    }
    onSendMessageClick(toSendTo){
	this.setState({currentModal: "sendMessage", toUser: toSendTo})
    }
    searchForProduct(id){
	let toReturn = null
	let items = this.state.products.content
	items.forEach(function(element) {
	    if(element.productID === id){
		toReturn = element
	    }
	})
	return(toReturn)
    }
    searchForMessage(id){
	let toReturn = null
	let items = this.state.messages.content
	let found = items.find(function(element){
	    return element.messageID === id
	})
	if(found !== undefined){
	    toReturn = found
	}
	return(toReturn)
    }	    
    render () {
	let currentModal
	if(this.state.currentModal === "none"){
	    // no modal so we just shove in a div
	    currentModal = <div></div>
	} else if(this.state.currentModal === "product") {
	    let product = this.searchForProduct(clickedProductID)
	    currentModal = <Modal type={this.state.currentModal} product={product} onSendMessage={this.onSendMessageClick} onModalExitClick={this.onModalExitClick}/>
	} else if(this.state.currentModal === "signup") {
	    currentModal = <Modal type={this.state.currentModal} onSignup={this.sendSignUp} onModalExitClick={this.onModalExitClick}/>
	} else if(this.state.currentModal === "login") {
	    currentModal = <Modal type={this.state.currentModal} onLogin={this.sendLogin} onModalExitClick={this.onModalExitClick}/>
	} else if(this.state.currentModal === "sendMessage"){
	    currentModal = <Modal type={this.state.currentModal} sendMessage={this.sendMessage} toUser={this.state.toUser} onModalExitClick={this.onModalExitClick}/>
	} else if(this.state.currentModal === "viewMessage"){
	    currentModal = <Modal type={this.state.currentModal} messages={this.state.messages.content} fetchMessages={this.fetchMessages} onViewIndividualMessage={this.onViewIndividualMessageClick} onModalExitClick={this.onModalExitClick} />
	} else if(this.state.currentModal === "viewIndividualMessage") {
	    let message = this.searchForMessage(clickedMessageID)
	    console.log(message)
	    currentModal = <Modal type={this.state.currentModal} message={message} onModalExitClick={this.onModalExitClick}/>
	} else {
	    currentModal = <Modal type={this.state.currentModal} onModalExitClick={this.onModalExitClick}/>
	}
	return (
		<div>
		{currentModal}
		<div id="Header">
		<Header title="Classified Ads" logo={reactLogo} onSearchClick={this.onSearch} onSignup={this.onSignupClick} onLogin={this.onLoginClick} onProduct={this.onProductUploadClick} onViewMessage={this.onViewMessageClick}/>
		<a href="#default" className="logo">{this.props.title}</a>
                </div>
                <div id="Search">
                <Search onSearchClick={this.onSearch} />
		<Grid items={this.state.products.content} onProductClick={this.onProductClick} />
                </div>
                </div>
	)
  }
}

export default App
