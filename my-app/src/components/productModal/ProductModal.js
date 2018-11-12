import React, { Component } from 'react'
import './ProductModal.css'

class ProductModal extends Component {
    constructor(props){
	super(props)
    }
    render () {
	return (
		<div className="productModal">
		<p className="productModalName">{this.props.product.title}</p>
		<img src={this.props.product.links[0].href} alt="No Image Avalable :(" />
		<p className="productModalPrice">Price: £{this.props.product.price}</p>
		<p className="productModalLocation">Location: {this.props.product.location}</p>
		</div>
	)
    }
}
export default ProductModal
