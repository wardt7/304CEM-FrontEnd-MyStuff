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
		<p className="productModalDescription">Description: {this.props.product.description}</p>
		<p className="productModalPrice">Price: £{this.props.product.price}</p>
		<p className="productModalLocation">Location: {this.props.product.location}</p>
		<p className="productModalAuthor">Seller: {this.props.product.author}</p>
		</div>
	)
    }
}
export default ProductModal
