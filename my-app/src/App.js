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
var apiUrl = 'http://localhost:8080'

class App extends Component {
    constructor(props){
	super(props)
	this.state = {
	    currentModal: "none",
	    jwt: false,
	    products: {
		"content": []
	    }
	}
	this.onProductClick = this.onProductClick.bind(this)
	this.onModalExitClick = this.onModalExitClick.bind(this)
	this.onSignupClick = this.onSignupClick.bind(this)
	this.onLoginClick = this.onLoginClick.bind(this)
	this.onProductUploadClick = this.onProductUploadClick.bind(this)
	this.fetchProducts = this.fetchProducts.bind(this)
	this.sendSignUp = this.sendSignUp.bind(this)
	this.sendLogin = this.sendLogin.bind(this)
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
    sendSignUp(values){
	axios({
	    method: 'post',
	    url: `${apiUrl}/users`,
	    data: values,
	    config: { headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'application/json'}}
	})
	    .then(response => {
		if(response.status === 200){
		    sessionStorage.setItem('token', response.data.token)
		    this.setState({jwt: true})
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
		    this.setState({jwt: true})
		} else {
		    console.log(response)
		}
	    })
	    .catch(response => {
		console.log(response)
	    })
    }
    componentDidMount(){
	this.fetchProducts()
    }
    onSearch (term) {
	console.log('search on term:' + term)
    }
    onProductClick (id) {
	console.log('showing full product with id:' + id)
	this.setState({currentModal: "product"})
	clickedProductID = id
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
    render () {
	let currentModal
	if(this.state.currentModal === "none"){
	    // no modal so we just shove in a div
	    currentModal = <div></div>
	} else if(this.state.currentModal === "product") {
	    let product = this.searchForProduct(clickedProductID)
	    currentModal = <Modal type={this.state.currentModal} product={product} onModalExitClick={this.onModalExitClick}/>
	} else if(this.state.currentModal === "signup") {
	    currentModal = <Modal type={this.state.currentModal} onSignup={this.sendSignUp} onModalExitClick={this.onModalExitClick}/>
	} else if(this.state.currentModal === "login") {
	    currentModal = <Modal type={this.state.currentModal} onLogin={this.sendLogin} onModalExitClick={this.onModalExitClick}/>
	} else {
	    currentModal = <Modal type={this.state.currentModal} onModalExitClick={this.onModalExitClick}/>
	}
	return (
		<div>
		{currentModal}
		<div id="Header">
		<Header title="Classified Ads" logo={reactLogo} onSearchClick={this.onSearch} onSignup={this.onSignupClick} onLogin={this.onLoginClick} onProduct={this.onProductUploadClick}/>
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
