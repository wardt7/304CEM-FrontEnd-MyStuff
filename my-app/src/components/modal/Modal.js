import React, { Component } from 'react'
import './Modal.css'
import ProductModal from '../productModal/ProductModal'
import Signup from '../signup/Signup'
import Login from '../login/Login'
import ProductUpload from '../productUpload/ProductUpload'
import MessageSend from '../messageSend/MessageSend'
import MessageViewGrid from '../messageViewGrid/MessageViewGrid'

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
	    content = <ProductModal product={this.props.product} onSendMessage={this.props.onSendMessage} />
	} else if(this.props.type === "signup"){
	    content = <Signup onSignup={this.props.onSignup}/>
	} else if(this.props.type === "login"){
	    content = <Login onLogin={this.props.onLogin}/>
	} else if(this.props.type === "sendMessage"){
	    content = <MessageSend sendMessage={this.props.sendMessage} toUser={this.props.toUser}/>
	} else if(this.props.type === "productUpload"){
	    content = <ProductUpload />
	} else if(this.props.type == "viewMessage"){
	    content = <MessageViewGrid apiUrl={this.props.apiUrl} />
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
