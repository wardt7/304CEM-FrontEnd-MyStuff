/* eslint-disable jsx-a11y/img-redundant-alt */

/**
 * Component for rendering the contents of a product
 * @module components/productModal
 */

import React, { Component } from 'react'
import './ProductModal.css'

class ProductModal extends Component {
    /**
     * Constructor for binding functions to this component
     * @constructor
     */
    constructor(props){
	super(props)
	this.sendMessage = this.sendMessage.bind(this)
	this.onDeleteProduct = this.onDeleteProduct.bind(this)
	this.checkToken = this.checkToken.bind(this)
    }
    /**
     * Wrapper function for displaying the appropriate message send form
     * @param {string} props.product.author - The recipient of the message
     */
    sendMessage(){
	this.props.onSendMessage(this.props.product.author)
    }
    /**
     * Wrapper function for deleting a product from the database
     * @param {string} props.product.productID - The ID of the product to delete
     */
    onDeleteProduct(){
	this.props.deleteProduct(this.props.product.productID)
    }
    /**
     * Function for displaying the correct functionality to the screen depending on
     * whether or not the user is logged in and is/isn't an admin
     * @param {string|null} token - The token stored in session storage
     * @returns {Object} JSX
     */
    checkToken(){
	var token = sessionStorage.getItem('token')
	if(token === null){
	    return (
		    <p><strong>Sign in to message the seller!</strong></p>
	    )
	} else {
	    var payload = JSON.parse(atob(token.split('.')[1]))
	    if(payload.username === this.props.product.author){
		return (
			<button onClick={this.onDeleteProduct}>Delete this product</button>
		)
	    } else {
		if(payload.hasOwnProperty('isAdmin')){
		    return (
			    <div>
			    <button onClick={this.onDeleteProduct}>Delete this product</button>
			    <button onClick={this.sendMessage}>Send a message to the seller</button>
			    </div>
		    )
		} else {
		    return (
			    <button onClick={this.sendMessage}>Send a message to the seller</button>
		    )
		}
	    }
	}
    }
    /**
     * Function for rendering the product details
     * @param {string} props.product.title - The title of the product
     * @param {string|null} props.product.links[0].href - The link to the image of the product. In the future there may be multiple links
     * @param {string} props.product.description - The description of the product
     * @param {float} props.product.price - The price of the product
     * @param {string} props.product.location - The location of the product
     * @param {string} props.product.author - The seller of the product
     * @returns {Object} JSX
     */
    render () {
	return (
		<div className="productModal">
		<h1 className="productModalName">{this.props.product.title}</h1>
		<img src={this.props.product.links[0].href} alt="No Image Avalable :(" />
		<h2 className="productModalDescription">About this item</h2>
		<p id="productModalDescriptionContents">{this.props.product.description}</p>
		<p className="content"><strong>Price: </strong>£{this.props.product.price}</p>
		<p className="content"><strong>Location: </strong>{this.props.product.location}</p>
		<p className="content"><strong>Sold by: </strong>{this.props.product.author}</p>
		{this.checkToken()}
		</div>
	)
    }
}
export default ProductModal
