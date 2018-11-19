import React, { Component } from 'react'
import './MessageViewModal'

class MessageViewModal extends Component{
    constructor(props){
	super(props)
	this.sendMessage = this.sendMessage.bind(this)
	this.viewMessages = this.viewMessages.bind(this)
    }
    sendMessage(event){
	this.props.onSendMessage(this.props.message.fromUser)
    }
    viewMessages(event){
	this.props.onViewMessage()
    }
    render(){
	return(
		<div className="messageViewModal">
		<h1>Subject: {this.props.message.subject}</h1>
		<h2>From: {this.props.message.fromUser}</h2>
		<p>{this.props.message.content}</p>
		<button onClick={this.sendMessage}>Send a reply</button>
		<button onClick={this.viewMessages}>Go back</button>
		</div>
	)
    }
}

export default MessageViewModal
