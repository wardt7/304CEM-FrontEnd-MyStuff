/**
 * Component for showing the full contents of a message
 * @module components/messageViewModal
 */

import React, { Component } from 'react'
import './MessageViewModal.css'

class MessageViewModal extends Component{
    /**
     * Constructor for binding functions to the component
     * @constructor
     */
    constructor(props){
	super(props)
	this.sendMessage = this.sendMessage.bind(this)
	this.viewMessages = this.viewMessages.bind(this)
	this.deleteMessage = this.deleteMessage.bind(this)
    }
    /**
     * Wrapper function for displaying a form to send a message
     * @param {function} props.onSendMessage - Function for displaying the send message form
     * @param {string} props.message.fromUser - The user who is to be sent the message
     */
    sendMessage(event){
	this.props.onSendMessage(this.props.message.fromUser)
    }
    /**
     * Wrapper function for going back to the message summary grid
     * @param {function} props.onViewMessage - Function for displaying the message summary grid
     */
    viewMessages(event){
	this.props.onViewMessage()
    }
    /**
     * Wrapper function for deleting a message
     * @param {function} props.deleteMessage - Function for deleting a message on the API
     * @param {string} props.message.messageID - The ID of the message to be deleted
     */
    deleteMessage(event){
	this.props.deleteMessage(this.props.message.messageID)
    }
    /**
     * Function for rendering the component
     * @param {Object} props.message - Object containing the messageID, subject, fromUser, and content of a message
     * @returns {Object} JSX
     */ 
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
