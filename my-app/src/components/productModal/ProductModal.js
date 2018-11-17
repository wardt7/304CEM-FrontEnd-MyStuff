import React, { Component } from 'react'
import './ProductModal.css'

class ProductModal extends Component {
    constructor(props){
	super(props)
	this.sendMessage = this.sendMessage.bind(this)
	this.checkToken = this.checkToken.bind(this)
    }
    sendMessage(){
	this.props.onSendMessage(this.props.product.author)
    }
    checkToken(){
	// Display a send message button if the user has a token and it isnt their product
	var token = sessionStorage.getItem('token')
	if(token === null){
	    return (
		    <div></div>
	    )
	} else {
	    var payload = JSON.parse(atob(token.split('.')[1]))
	    if(payload.username === this.props.product.author){
		return (
			<div></div>
		)
	    } else {
		return (
			<button onClick={this.sendMessage}>Send a message to the seller</button>
		)
	    }
	}
    }
    render () {
	return (
		<div className="productModal">
		<p className="productModalName">{this.props.product.title}</p>
		<img src={this.props.product.links[0].href} alt="No Image Avalable :(" />
		<p className="productModalDescription">Description: {this.props.product.description}</p>
		<p className="productModalPrice">Price: £{this.props.product.price}</p>
		<p className="productModalLocation">Location: {this.props.product.location}</p>
		<p className="productModalAuthor">Seller: {this.props.product.author}</p>
		{this.checkToken()}
		</div>
	)
    }
}
export default ProductModal
