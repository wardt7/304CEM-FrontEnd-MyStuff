import React, { Component } from 'react'
import './ProductModal.css'

class ProductModal extends Component {
    constructor(props){
	super(props)
	this.handleModalExitClick = this.handleModalExitClick.bind(this)
	this.handleModalContentClick = this.handleModalContentClick.bind(this)
    }
    handleModalExitClick(event){
	this.props.onModalExitClick()
    }
    handleModalContentClick(event){
	event.stopPropagation()
	return null
    }
    render () {
	return (
		<div className="productModal" onClick={this.handleModalExitClick}>
		<div className="productModalContent" onClick={this.handleModalContentClick}>
		<p className="productModalName">{this.props.product.productName}</p>
		<img src={this.props.product.productImg} alt="No Image Avalable :(" />
		<p className="productModalPrice">Price: £{this.props.product.productPrice}</p>
		<p className="productModalLocation">Location: {this.props.product.productLocation}</p>
		</div>
		</div>
	)
    }
}
export default ProductModal
