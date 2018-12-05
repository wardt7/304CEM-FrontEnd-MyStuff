/* eslint-disable jsx-a11y/img-redundant-alt */

import React, { Component } from 'react'
import './ProductCard.css'

class ProductCard extends Component {
    constructor (props) {
	super(props)
	this.showProduct = this.showProduct.bind(this)
    }
    showProduct(event){
	this.props.onProductClick(this.props.productID)
    }
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
