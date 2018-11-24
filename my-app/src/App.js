// eslint-disable no-unusued-vars
import React, { Component } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
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
	this.onSearch = this.onSearch.bind(this)
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
	this.deleteMessage = this.deleteMessage.bind(this)
	this.deleteProduct = this.deleteProduct.bind(this)
	this.sendSignUp = this.sendSignUp.bind(this)
	this.sendLogin = this.sendLogin.bind(this)
	this.sendMessage = this.sendMessage.bind(this)
	this.sendProductUpload = this.sendProductUpload.bind(this)
    }
    fetchProducts(value){
	var url = `${apiUrl}/products/`
	if(value !== null){
	    url = url + `?title=${value}`
	}
	var componentThis = this
	fetch(url, {
	    method: "GET",
	})
	    .then(response => {
		// XXX: We shouldn't be getting a 201, even though the server is set up to send a 200. WTF?
		if(response.status === 200 || response.status === 201){
		    response.json().then(function(data) {
			componentThis.setState({products: data})
		    })
		} else {
		    console.log(response.status)
		    console.log(response)
		    toast.error(`Oh no! There was an error! Error Code: ${response.status}`)
		}
	    })
	    .catch(response => {
		toast.error('Oh no! There was a client-side error!')
	    })
    }
    fetchMessages(){
	var componentThis = this
	var token = sessionStorage.getItem('token')
	if(token === null){
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
			})
		    } else {
			toast.error(`Oh no! There was an error! Error Code: ${response.status}`)
		    }
		})
		.catch(function(err) {
		    toast.error('Oh no! There was a client-side error!')
		})
	}
	console.log(this.state)
    }
    deleteMessage(id){
	var componentThis = this
	var token = sessionStorage.getItem('token')
	if(token === null){
	    return null
	} else {
	    fetch(`${apiUrl}/messages/${id}`, {
		method: "DELETE",
		headers: {
		    "Authorization": token
		}
	    })
		.then(response => {
		    if(response.status === 200){
			var items = componentThis.state.messages.content
			// Instead of refetching, just delete from the state the message client-side
			for(var i = 0; i < items.length; i++) {
			    if(items[i].messageID === id){
				items.splice(i, 1)
				break;
			    }
			}
			componentThis.setState({"messages": { "content": items }, "currentModal":"viewMessage"})
			toast.info('Successfully deleted the message!')
		    } else {
			toast.error(`Oh no! There was an error! Error Code: ${response.status}`)
		    }
		})
		.catch(function(err) {
		    toast.error('Oh no! There was a client-side error!')
		})
	}
    }
    deleteProduct(id){
	var componentThis = this
	var token = sessionStorage.getItem('token')
	if(token === null){
	    return null
	} else {
	    fetch(`${apiUrl}/products/${id}`, {
		method: "DELETE",
		headers: {
		    "Authorization": token
		}
	    })
		.then(response => {
		    if(response.status === 200){
			var items = componentThis.state.products.content
			// Instead of refetching, just delete from the state the product client-side
			for(var i = 0; i < items.length; i++) {
			    if(items[i].productID === id){
				items.splice(i, 1)
				break;
			    }
			}
			componentThis.setState({"products": { "content": items }, "currentModal":"none"})
			toast.info('Successfully deleted the product!')
		    } else {
			toast.error(`Oh no! There was an error! Error Code: ${response.status}`)
		    }
		})
		.catch(function(err) {
		    toast.error('Oh no! There was a client-side error!')
		})
	}
    }
    sendLogin(values){
	fetch({
	    method: 'post',
	    url: `${apiUrl}/users/login`,
	    data: values,
	    config: { headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}}
	})
	    .then(response => {
		if(response.status === 200){
		    sessionStorage.setItem('token', response.data.token)
		    this.setState({'currentModal': 'none'})
		    toast.info('Successfully logged in!')
		} else {
		    toast.error(`Oh no! There was an error! Error Code: ${response.status}`)
		}
	    })
	    .catch(response => {
		toast.error('Oh no! There was a client-side error!')
	    })
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
		if(response.status === 201){
		    sessionStorage.setItem('token', response.data.token)
		    this.setState({'currentModal': 'none'})
		    toast.info('Successfully signed up!')
		}
	    })
	    .catch(response => {
		toast.error('Oh no! There was a client-side erro!')
	    })
    }
    sendMessage(values){
	var componentThis = this
	var token = sessionStorage.getItem('token')
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
		    componentThis.setState({'currentModal': 'none'})
		    toast.info(`Successfully sent a message to: ${values.toUser}`)
		} else {
		    toast.error(`Oh no! There was an error! Error Code: ${response.status}`)
		}
	    })
	    .catch(response => {
                toast.error('Oh no! There was a client-side error!')
	    })
    }
    sendProductUpload(values){
	console.log(values)
	var componentThis = this;
	var token = sessionStorage.getItem('token')
	fetch(`${apiUrl}/products`,{
	    method: "POST",
	    body: values,
	    headers: {
		"Authorization": token
	    },
	})
	    .then(function (response) {
		if (response.status === 201){
		    componentThis.setState({"currentModal": "none"})
		    toast.info("Successfully uploaded the product!")
		    componentThis.fetchProducts(null)
		} else {
		    toast.error(`Oh no! There was an error! Error Code: ${response.status}`)
		}
	    })
	    .catch(function (response) {
		console.log(response)
		toast.error('Oh no! There was a client-side error!')
	    })
    }
    componentDidMount(){
	this.fetchProducts(null)
    }
    onSearch (term) {
	this.fetchProducts(term)
    }
    onViewMessageClick(){
	this.setState({currentModal: "viewMessage"})
    }
    onProductClick (id) {
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
	let found = items.find(function(element){
	    return element.productID === id
	})
	if(found !== undefined){
	    toReturn = found
	} else {
	    toast.error('Something went wrong when trying to find a product...')
	}
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
	} else {
	    toast.error('Something went wrong when trying to find a message...')
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
	    currentModal = <Modal type={this.state.currentModal} product={product} deleteProduct={this.deleteProduct} onSendMessage={this.onSendMessageClick} onModalExitClick={this.onModalExitClick}/>
	} else if(this.state.currentModal === "productUpload") {
	    currentModal = <Modal type={this.state.currentModal} sendProductUpload={this.sendProductUpload} onModalExitClick={this.onModalExitClick} />
	} else if(this.state.currentModal === "signup") {
	    currentModal = <Modal type={this.state.currentModal} onSignup={this.sendSignUp} onModalExitClick={this.onModalExitClick}/>
	} else if(this.state.currentModal === "login") {
	    currentModal = <Modal type={this.state.currentModal} onLogin={this.sendLogin} onModalExitClick={this.onModalExitClick}/>
	} else if(this.state.currentModal === "sendMessage"){
	    currentModal = <Modal type={this.state.currentModal} sendMessage={this.sendMessage} toUser={this.state.toUser} onModalExitClick={this.onModalExitClick}/>
	} else if(this.state.currentModal === "viewMessage"){
	    currentModal = <Modal type={this.state.currentModal} messages={this.state.messages.content} fetchMessages={this.fetchMessages} deleteMessage={this.deleteMessage} onViewIndividualMessage={this.onViewIndividualMessageClick} onModalExitClick={this.onModalExitClick} />
	} else if(this.state.currentModal === "viewIndividualMessage") {
	    let message = this.searchForMessage(clickedMessageID)
	    console.log(message)
	    currentModal = <Modal type={this.state.currentModal} message={message} deleteMessage={this.deleteMessage} onSendMessage={this.onSendMessageClick} onViewMessage={this.onViewMessageClick} onModalExitClick={this.onModalExitClick}/>
	} else {
	    currentModal = <Modal type={this.state.currentModal} onModalExitClick={this.onModalExitClick}/>
	}
	return (
		<div>
		{currentModal}
		<div id="Header">
		<Header title="MyStuff - The Classified Ad Site" logo={reactLogo} onSearchClick={this.onSearch} onSignup={this.onSignupClick} onLogin={this.onLoginClick} onProduct={this.onProductUploadClick} onViewMessage={this.onViewMessageClick}/>
		<a href="#default" className="logo">{this.props.title}</a>
                </div>
                <div id="Search">
                <Search onSearchClick={this.onSearch} />
		<Grid items={this.state.products.content} onProductClick={this.onProductClick} />
                </div>
		<ToastContainer autoClose={5000} position="top-center" draggable pauseOnHover/>
                </div>
	)
  }
}

export default App
