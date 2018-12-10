/**
 * Component for displaying multiple message cards
 * @module components/messageViewGrid
 */

import React, { Component } from 'react'
import './MessageViewGrid.css'
import MessageViewCard from '../messageViewCard/MessageViewCard'
import Search from '../search/Search'

class MessageViewGrid extends Component {
    /**
     * Constructor for binding functions to this component
     * @constructor
     */
    constructor(props){
	super(props)
	this.messageGridRow = this.messageGridRow.bind(this)
	this.onSearchSubmit = this.onSearchSubmit.bind(this)
	this.adminPowers = this.adminPowers.bind(this)
    }
    /** 
     * Function for mapping multiple message cards dynamically
     * @param {Object[]} cards - A list of message objects containing messageID, 
     * toUser, fromUser, Subject and Content
     * @param {function} props.onViewIndividualMessage - Function for handling the display of a specific message
     * @param {function} props.deleteMessage - Function for deleting a specific message
     * @returns {Object} JSX
     */
    messageGridRow(cards){
	if(cards.length === 0){
	    return(
		    <div>
		    <h2>No messages to show...</h2>
		    </div>
	    )
	}
	return(
		<div>
		{cards.map((item, index) =>
			   <div key={item.messageID}>
			   <MessageViewCard messageID={item.messageID}
			   messageToUser={item.toUser}
			   messageFromUser={item.fromUser}
			   messageSubject={item.subject}
			   messageContent={item.content}
			   onMessageClick={this.props.onViewIndividualMessage}
			   deleteMessage={this.props.deleteMessage}/>
			   </div>
			  )}
	    </div>
	)
    }
    /**
     * Function for fetching messages when the component mounts
     */
    componentDidMount(){
	this.props.fetchMessages(null)
    }
    /**
     * Function for searching for a specific user's messages
     * @param {string} value - The user to be searched for
     * @param {function} props.onSearchMessage - The function for handling searching for a user's messages
     */
    onSearchSubmit(value){
	this.props.onSearchMessage(value)
    }
    /**
     * Function for determining whether or not to display the user search bar based on whether or not
     * the user is an admin
     * @param {string} token - The token stored in Session Storage
     * @param {function} props.onSearchMessage - The function for handling searching for a user's messages
     * @returns {Object|null} JSX
     */
    adminPowers(){
	var token = sessionStorage.getItem('token')
	if(token === null){
	    return null
	} else {
	    var payload = JSON.parse(atob(token.split('.')[1]))
	    if(payload.hasOwnProperty('isAdmin')){
		return(
			<div>
			<h2>Search for user messages</h2>
			<Search onSearchClick={this.props.onSearchMessage} />
			</div>
		)
	    } else {
		return null
	    }
	}
    }
    /**
     * Function for rendering the message grid
     * @returns {Object} JSX
     */
    render() {
	return(
		<div className="messageGrid">
		<h1>Messages</h1>
		{this.adminPowers()}
		{this.messageGridRow(this.props.messages)}
	    </div>
	)
    }
}

export default MessageViewGrid
