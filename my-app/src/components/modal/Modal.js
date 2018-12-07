/**
 * Component for displaying other components in a modal
 * @module components/modal
 */

import React, { Component } from 'react'
import './Modal.css'
import ProductModal from '../productModal/ProductModal'
import Signup from '../signup/Signup'
import Login from '../login/Login'
import ProductUpload from '../productUpload/ProductUpload'
import MessageSend from '../messageSend/MessageSend'
import MessageViewGrid from '../messageViewGrid/MessageViewGrid'
import MessageViewModal from '../messageViewModal/MessageViewModal'

class Modal extends Component {
    /**
     * Constructor for binding functions to the component
     * @constructor
     */
    constructor(props){
	super(props)
	this.handleModalExitClick = this.handleModalExitClick.bind(this)
	this.handleModalContentClick = this.handleModalContentClick.bind(this)
    }
    /**
     * Wrapper function for handling the exit click
     * @param {function} props.onModalExitClick - Function for shutting the modal
     */
    handleModalExitClick(event){
	this.props.onModalExitClick()
    }
    /**
     * Function for preventing shutting the modal when clicking inside the modal
     * @param {Object} event - the event object created by the click
     */
    handleModalContentClick(event){
	event.stopPropagation()
	return null
    }
    /**
     * Function for rendering the modal
     * See other components for what parameters they pass; This component forwards on their required props.
     * @returns {Object} JSX
     */
    render () {
	let content = null;
	if(this.props.type === "product"){
	    content = <ProductModal product={this.props.product} deleteProduct={this.props.deleteProduct} onSendMessage={this.props.onSendMessage} />
	} else if(this.props.type === "signup"){
	    content = <Signup onSignup={this.props.onSignup}/>
	} else if(this.props.type === "login"){
	    content = <Login onLogin={this.props.onLogin}/>
	} else if(this.props.type === "sendMessage"){
	    content = <MessageSend sendMessage={this.props.sendMessage} toUser={this.props.toUser}/>
	} else if(this.props.type === "productUpload"){
	    content = <ProductUpload sendProductUpload={this.props.sendProductUpload} />
	} else if(this.props.type === "viewMessage"){
	    content = <MessageViewGrid messages={this.props.messages} fetchMessages={this.props.fetchMessages} deleteMessage={this.props.deleteMessage} onViewIndividualMessage={this.props.onViewIndividualMessage} onSearchMessage={this.props.onSearchMessage} />
	} else if(this.props.type === "viewIndividualMessage"){
	    content = <MessageViewModal message={this.props.message} deleteMessage={this.props.deleteMessage} onSendMessage={this.props.onSendMessage} onViewMessage={this.props.onViewMessage} />
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
