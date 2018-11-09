// eslint-disable no-unusued-vars
import React, { Component } from 'react'
import './App.css'
import Header from './components/header/Header'
import Search from './components/search/Search'
import Modal from './components/modal/Modal'
import Grid from './components/grid/Grid'
import Data from './Data'
import reactLogo from './logo.svg'
// eslint-enable no-unusued-vars

var clickedProductID = null

class App extends Component {
    constructor(props){
	super(props)
	this.state = {
	    currentModal: "none"
	}
	this.onProductClick = this.onProductClick.bind(this)
	this.onModalExitClick = this.onModalExitClick.bind(this)
	this.onSignupClick = this.onSignupClick.bind(this)
	this.onLoginClick = this.onLoginClick.bind(this)
	this.onProductUploadClick = this.onProductUploadClick.bind(this)
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
	let items = Data.items
	items.forEach(function(element) {
	    if(element.id === id){
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
		<Grid items={Data.items} onProductClick={this.onProductClick} />
                </div>
                </div>
	)
  }
}

export default App
