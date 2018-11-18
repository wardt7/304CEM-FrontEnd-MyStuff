import React, { Component } from 'react'
import './MessageViewModal'

class MessageViewModal extends Component{
    constructor(props){
	super(props)
    }
    render(){
	return(
		<div className="messageViewModal">
		<h1>Subject: {this.props.message.fromUser}</h1>
		<h2>From: {this.props.message.subject}</h2>
		<p>{this.props.message.content}</p>
		</div>
	)
    }
}

export default MessageViewModal
