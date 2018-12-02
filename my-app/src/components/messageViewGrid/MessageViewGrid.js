import React, { Component } from 'react'
import './MessageViewGrid.css'
import MessageViewCard from '../messageViewCard/MessageViewCard'
import Search from '../search/Search'

class MessageViewGrid extends Component {
    constructor(props){
	super(props)
	this.messageGridRow = this.messageGridRow.bind(this)
	this.onSearchSubmit = this.onSearchSubmit.bind(this)
	this.adminPowers = this.adminPowers.bind(this)
    }
    messageGridRow(cards){
	console.log(cards)
	if(cards === null){
	    return null
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
    componentDidMount(){
	this.props.fetchMessages(null)
    }
    onSearchSubmit(value){
	this.props.onSearchMessage(value)
    }
    adminPowers(){
	var token = sessionStorage.getItem('token')
	if(token === null){
	    return null
	} else {
	    var payload = JSON.parse(atob(token.split('.')[1]))
	    if(payload.hasOwnProperty('isAdmin')){
		console.log(this.props.onSearchMessage)
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
