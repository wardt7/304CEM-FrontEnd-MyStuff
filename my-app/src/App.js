/**
 * Parent module for running the MyStuff website
 * @module App
 */

// eslint-disable no-unusued-vars
import React, { Component } from 'react'
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
    /**
     * Constructor for binding functions to this module and for
     * initialising the state
     * @constructor
     */
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
	this.onSearchProduct = this.onSearchProduct.bind(this)
	this.onSearchMessage = this.onSearchMessage.bind(this)
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
    /**
     * API Function for obtaining products from the API and putting them into the
     * state.
     * @param {string|null} value - If requested, the title of the product to search for
     * @returns {Object} JSON
     */
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
		    toast.error(`Oh no! There was an error! Error Code: ${response.status}`)
		}
	    })
	    .catch(response => {
		toast.error('Oh no! There was a client-side error!')
	    })
    }
    /**
     * API Function for obtaining messages from the API and putting them into the
     * state.
     * @param {string|null} value - If requested, the user whose messages are to be searched for. Should only be
     * accessed by an admin
     * @param {string|null} token - The token obtained from session storage
     * @returns {Object} JSON
     */
    fetchMessages(value){
	var componentThis = this
	var token = sessionStorage.getItem('token')
	if(token === null){
	    return null
	} else {
	    var url = `${apiUrl}/messages/`
	    // Only permit admins to search for other user's messages
	    var payload = JSON.parse(atob(token.split('.')[1]))
	    if(value !== null && payload.hasOwnProperty('isAdmin')){
		url = url + `?toUser=${value}`
	    }
	    fetch(url, {
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
    /**
     * API Function for deleting messages from the API and updating the state
     * @param {string} id - The ID of the message to be deleted
     * @param {string|null} token - The token of the logged in user
     * @returns {Object} JSON
     */
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
    /**
     * API Function for deleting products from the API and updating the state
     * @param {string} id - The ID of the product to be deleted
     * @param {string|null} token - The token of the logged in user
     * @returns {Object} JSON
     */
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
    /**
     * API Function for logging a user in.
     * @param {Object} values - The login values to be sent to the API. Should contain username and password.
     * @returns {Object} JSON - Token should be stored in session storage
     */
    sendLogin(values){
	var componentThis = this;
	fetch(`${apiUrl}/users/login`, {
	    method: "POST",
	    headers: {
		"Content-Type": "application/json; charset=utf-8",
	    },
	    body: JSON.stringify(values)
	})
	    .then(response => {
		if(response.status === 200){
		    response.json().then(function(data){
			sessionStorage.setItem('token', data.token)
			componentThis.setState({'currentModal': 'none'})
			toast.info('Successfully logged in!')
		    })
		} else {
		    toast.error(`Oh no! There was an error! Error Code: ${response.status}`)
		}
	    })
	    .catch(response => {
		toast.error('Oh no! There was a client-side error!')
	    })
    }
    /**
     * API Function for signing up a user
     * @param {Object} values - The values to be sent to the API. Should contain email, username, password and rePassword.
     * @returns {Object} JSON - Token should be stored in session storage
     */
    sendSignUp(values){
	var componentThis = this;
	fetch(`${apiUrl}/users`, {
	    method: "POST",
	    headers: {
		"Content-Type": "application/json; charset=utf-8",
	    },
	    body: JSON.stringify(values)
	})
	    .then(response => {
		if(response.status === 201){
		    response.json().then(function(data){
			sessionStorage.setItem('token', data.token)
			componentThis.setState({'currentModal': 'none'})
			toast.info('Successfully signed up!')
		    })
		}
	    })
	    .catch(response => {
		toast.error('Oh no! There was a client-side error!')
	    })
    }
    /**
     * API Function for sending a message
     * @param {Object} values - The  values to be sent to the API. Should contain toUser, subject and content.
     * @param {string|null} token - The token of the logged in user
     * @returns {Object} JSON
     */
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
    /**
     * API Function for uploading a product
     * @param {Object} values - The login values to be sent to the API. Should contain title, description, product, price, and location
     * @param {string|null} token - The token of the logged in user
     * @returns {Object} JSON
     */
    sendProductUpload(values){
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
    /**
     * Wrapper function for calling fetchProducts when starting up the website
     */
    componentDidMount(){
	this.fetchProducts(null)
    }
    /**
     * Wrapper function for calling fetchProducts with a search term
     * @param {string} term
     */
    onSearchProduct (term) {
	this.fetchProducts(term)
    }
    /**
     * Wrapper function for calling fetchMessages with a search term
     * @param {string} term
     */
    onSearchMessage (term) {
	this.fetchMessages(term)
    }
    /**
     * Function for displaying the viewMessage modal
     */
    onViewMessageClick(){
	this.setState({currentModal: "viewMessage"})
    }
    /**
     * Function for displaying the product modal
     * @param {string} id - The ID of the product to display
     */
    onProductClick (id) {
	this.setState({currentModal: "product"})
	clickedProductID = id
    }
    /**
     * Function for displaying the viewIndividualMessage modal
     * @param {string} id - The ID of the message to display
     */
    onViewIndividualMessageClick (id) {
	this.setState({currentModal: "viewIndividualMessage"})
	clickedMessageID = id
    }
    /**
     * Function for displaying the productUpload modal
     */
    onProductUploadClick(){
	this.setState({currentModal: "productUpload"})
    }
    /**
     * Function for displaying the signup modal
     */
    onSignupClick(){
	this.setState({currentModal: "signup"})
    }
    /**
     * Function for displaying the login modal
     */
    onLoginClick(){
	this.setState({currentModal: "login"})
    }
    /**
     * Function for displaying no modal
     */
    onModalExitClick(){
	this.setState({currentModal: "none"})
    }
    /**
     * Function for displaying the sendMessage modal
     * @param {string} toSendTo - The recipient of the message
     */
    onSendMessageClick(toSendTo){
	this.setState({currentModal: "sendMessage", toUser: toSendTo})
    }
    /**
     * Function for searching for a product in the state
     * @param {string} id - The ID of the product
     * @returns {Object} product
     */
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
    /**
     * Function for searching for a message in the state
     * @param {string} id - The ID of the message
     * @returns {Object} message
     */
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
    /**
     * Function for rendering the SPA
     * @returns {Object} JSX
     */
    render () {
	// Handle which modal we're going to display. See components/modal for more informaion
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
	    currentModal = <Modal type={this.state.currentModal} messages={this.state.messages.content} fetchMessages={this.fetchMessages} deleteMessage={this.deleteMessage} onViewIndividualMessage={this.onViewIndividualMessageClick} onSearchMessage={this.onSearchMessage} onModalExitClick={this.onModalExitClick} />
	} else if(this.state.currentModal === "viewIndividualMessage") {
	    let message = this.searchForMessage(clickedMessageID)
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
                <Search onSearchClick={this.onSearchProduct} />
		<Grid items={this.state.products.content} onProductClick={this.onProductClick} />
                </div>
		<ToastContainer autoClose={5000} position="top-center" draggable pauseOnHover/>
                </div>
	)
  }
}

export default App
