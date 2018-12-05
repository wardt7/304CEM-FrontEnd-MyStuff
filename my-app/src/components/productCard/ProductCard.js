/* eslint-disable jsx-a11y/img-redundant-alt */

/**
 * Component for generating a summary card view of the product
 * @module components/productCard
 */ 

import React, { Component } from 'react'
import './ProductCard.css'

class ProductCard extends Component {
    /**
     * Constructor for binding functions to this component
     * @constructor
     */
    constructor (props) {
	super(props)
	this.showProduct = this.showProduct.bind(this)
    }
    /**
     * Wrapper function for showing the productModal component when the card is clicked on
     * @param {Object} event - The event object when the card is clicked on
     * @param {string} props.productID - The ID of the Product
     */
    showProduct(event){
	this.props.onProductClick(this.props.productID)
    }
    /**
     * Function for rendering the card
     * @param {string} props.productImg - The URL to the image to display in the card
     * @param {string} props.productName - The name of the product
     * @param {float} props.productPrice - The price of the product
     * @param {string} props.productLocation - The location of the product
     * @returns {Object} JSX
     */
    render () {
	return(
		<div className="productCard" onClick={this.showProduct}>
	        <img src={this.props.productImg} alt="No Image Available :(" />
	        <p className="productName">{this.props.productName}</p>
	        <p className="productPrice">£{this.props.productPrice}</p>
	        <p className="productLocation">{this.props.productLocation}</p>
		</div>
	)
    }
}

export default ProductCard
