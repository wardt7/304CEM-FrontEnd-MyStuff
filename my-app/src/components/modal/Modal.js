import React, { Component } from 'react'
import './Modal.css'
import ProductModal from '../productModal/ProductModal'

class Modal extends Component {
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
	let content = null;
	if(this.props.type === "product"){
	    content = <ProductModal product={this.props.product} />
	}
	return (
		<div className="modal" onClick={this.handleModalExitClick}>
		<div className="modalContent" onClick={this.handleModalContentClick}>
		{content}
	        </div>
		</div>
	)
    }
}

export default Modal
