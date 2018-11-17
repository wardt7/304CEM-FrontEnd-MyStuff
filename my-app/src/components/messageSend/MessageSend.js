import React, { Component } from 'react'
import './MessageSend.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

class MessageSend extends Component {
    constructor(props){
	super(props)
    }
    render(){
	let MessageSendSchema = Yup.object().shape({
	    subject: Yup.string().required(),
	    content: Yup.string().required()
	})
	console.log(this.props.toUser)
	return (
		<div className="messageSend">
		<h1>Send a Message</h1>
		<Formik initialValues={{subject: '', content: ''}} validationSchema={MessageSendSchema} onSubmit={(values) => {
		    console.log(values)
		    var token = sessionStorage.getItem('token')
		    var payload = JSON.parse(atob(token.split('.')[1]))
		    var newValues = {
			toUser: this.props.toUser,
			fromUser: payload.username,
			subject: values.subject,
			content: values.content,
			auth: token
		    }
		    console.log(newValues)
		    this.props.sendMessage(newValues)
		}}>
		{({errors, touched}) => (
			<Form>
			<p>Sending to: {this.props.toUser}</p>
			<p>Subject:</p>
			<Field className="entry" name="subject" type="text"/>
			{ errors.subject && touched.subject ? (
				<div className="error">{errors.file}</div>
			) : null}
			<p>Message Content</p>
			<Field className="entry" name="content" type="text"/>
			{ errors.content && touched.content ? (
				<div className="error">{errors.file}</div>
			) : null}
		    <button type="submit">Submit</button>
		    </Form>
		)}
	    </Formik>
		</div>
	)
    }
}

export default MessageSend
														   
