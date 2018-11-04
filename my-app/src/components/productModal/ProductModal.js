import React, { Component } from 'react'
import './ProductModal.css'

class ProductModal extends Component {
    constructor(props){
	super(props)
    }
    render () {
	return (
		<div className="productModal">
		<p className="productModalName">{this.props.product.productName}</p>
		<img src={this.props.product.productImg} alt="No Image Avalable :(" />
		<p className="productModalPrice">Price: £{this.props.product.productPrice}</p>
		<p className="productModalLocation">Location: {this.props.product.productLocation}</p>
		</div>
	)
    }
}
export default ProductModal
