import React, { Component } from 'react'
import './MessageViewGrid.css'
import MessageViewCard from '../messageViewCard/MessageViewCard'

class MessageViewGrid extends Component {
    constructor(props){
	super(props)
	this.messageGridRow = this.messageGridRow.bind(this)
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
	this.props.fetchMessages()
    }
    render() {
	return(
		<div className="messageGrid">
		<h1>Messages</h1>
		{this.messageGridRow(this.props.messages)}
	    </div>
	)
    }
}

export default MessageViewGrid
