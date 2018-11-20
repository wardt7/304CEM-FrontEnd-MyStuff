import React, { Component } from 'react'
import './MessageViewCard.css'

class MessageViewCard extends Component {
    constructor(props){
	super(props)
	this.showMessage = this.showMessage.bind(this)
	this.deleteMessage = this.deleteMessage.bind(this)
    }
    showMessage(event){
	this.props.onMessageClick(this.props.messageID)
    }
    deleteMessage(event){
	event.stopPropagation()
	this.props.deleteMessage(this.props.messageID)
    }
    render() {
	console.log(this.props.messageFromUser)
	console.log(this.props.messageSubject)
	return(
		<div className="messageCard" onClick={this.showMessage}>
		<p className="messageFromUser">{this.props.messageFromUser}</p>
		<p className="messageSubject">{this.props.messageSubject}</p>
		<button className="messageDelete" onClick={this.deleteMessage}>Delete</button>
		</div>
	)
    }
}

export default MessageViewCard
