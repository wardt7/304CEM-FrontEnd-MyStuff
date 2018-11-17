import React, { Component } from 'react'
import './MessageViewGrid.css'
import MessageViewCard from '../messageViewCard/MessageViewCard'

class MessageViewGrid extends Component {
    constructor(props){
	super(props)
	this.state = {
	    messages: {
		content: []
	    }
	}
	this.messageGridRow = this.messageGridRow.bind(this)
	this.fetchMessages = this.fetchMessages.bind(this)
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
			   messageContent={item.content} />
			   </div>
			  )}
	    </div>
	)
    }
    fetchMessages(){
	var componentThis = this
	var token = sessionStorage.getItem('token')
	if(token == null){
	    return null
	} else {
	    var msgData = { content: [] }
	    console.log(this.props.apiUrl)
	    fetch(`${this.props.apiUrl}/messages`, {
		method: "GET",
		headers: {
		    "Authorization": token
		}
	    })
		.then(response => {
		    if(response.status === 200){
			response.json().then(function(data) {
			    componentThis.setState({messages: data})
			    console.log(componentThis.state.messages)
			})
		    }
		})
		.catch(function(err) {
		    console.log('error')
		})
	}
    }
    componentDidMount(){
	this.fetchMessages()
    }
    render() {
	return(
		<div className="messageGrid">
		<h1>Messages</h1>
		{this.messageGridRow(this.state.messages.content)}
	    </div>
	)
    }
}

export default MessageViewGrid
