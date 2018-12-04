import React, { Component } from 'react'
import './MessageViewModal.css'

class MessageViewModal extends Component{
    constructor(props){
	super(props)
	this.sendMessage = this.sendMessage.bind(this)
	this.viewMessages = this.viewMessages.bind(this)
	this.deleteMessage = this.deleteMessage.bind(this)
    }
    sendMessage(event){
	this.props.onSendMessage(this.props.message.fromUser)
    }
    viewMessages(event){
	this.props.onViewMessage()
    }
    deleteMessage(event){
	this.props.deleteMessage(this.props.message.messageID)
    }
    render(){
	return(
		<div className="messageViewModal">
		<h1>{this.props.message.subject}</h1>
		<h2>Sent by {this.props.message.fromUser}</h2>
		<p id="messageContent">{this.props.message.content}</p>
		<button onClick={this.sendMessage}>Send a reply</button>
		<button onClick={this.viewMessages}>Go back</button>
		<button onClick={this.deleteMessage}>Delete Message</button>
		</div>
	)
    }
}

export default MessageViewModal
