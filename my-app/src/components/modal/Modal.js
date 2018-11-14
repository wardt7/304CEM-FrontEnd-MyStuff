import React, { Component } from 'react'
import './Modal.css'
import ProductModal from '../productModal/ProductModal'
import Signup from '../signup/Signup'
import Login from '../login/Login'
import ProductUpload from '../productUpload/ProductUpload'

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
	} else if(this.props.type === "signup"){
	    content = <Signup onSignup={this.props.onSignup}/>
	} else if(this.props.type === "login"){
	    content = <Login onLogin={this.props.onLogin}/>
	} else if(this.props.type === "productUpload"){
	    content = <ProductUpload />
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
