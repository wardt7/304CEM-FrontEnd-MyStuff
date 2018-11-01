import React, { Component } from 'react'
import './ProductModal.css'

class ProductModal extends Component {
    constructor(props){
	super(props)
    }
    render () {
	return (
		<div className="productModal">
		<div className="productModalContent">
		<p className="productName">{this.props.productName}</p>
		<img src={this.props.productImg} alt="No Image Avalable :(" />
		<p className="productPrice">Price: £{this.props.productPrice}</p>
		<p className="productLocation">Location: {this.props.productLocation}</p>
		</div>
		</div>
	)
    }
}
export default ProductModal
