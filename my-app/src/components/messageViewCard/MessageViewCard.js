/**
 * Component for displaying a summarised version of a message
 * @module components/messageViewCard
 */

import React, { Component } from 'react'
import './MessageViewCard.css'

class MessageViewCard extends Component {
    /**
     * Constructor for binding function to this component
     * @constructor
     */
    constructor(props){
	super(props)
	this.showMessage = this.showMessage.bind(this)
	this.deleteMessage = this.deleteMessage.bind(this)
    }
    /**
     * Wrapper function for displaying a message in full
     * @param {function} props.onMessageClick - The function for handling the display of the full message
     * @param {string} props.messageID - The ID of the message to display fully
     */
    showMessage(event){
	this.props.onMessageClick(this.props.messageID)
    }
    /**
     * Wrapper function for deleting a message
     * @param {function} props.deleteMessage - The function for handling the deletion of a message
     * @param {string} props.messageID - The ID of the message to delete
     */
    deleteMessage(event){
	event.stopPropagation()
	this.props.deleteMessage(this.props.messageID)
    }
    /**
     * Function for rendering the card
     * @param {string} props.messageFromUser - The author of the message
     * @param {string} props.messageSubject - The subject of the message
     * @returns {Object} JSX
     */
    render() {
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
