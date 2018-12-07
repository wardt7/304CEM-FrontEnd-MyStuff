/**
 * Component for displaying a form for sending a message to a specific user
 * @module components/messageSend
 */

import React, { Component } from 'react'
import './MessageSend.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

class MessageSend extends Component {
    /**
     * Function for rendering the send message form
     * @param {string} token - The token from Session Storage
     * @param {string} props.toUser - The recipient of the message
     * @param {function} props.sendMessage - The function that calls the API, using the data from the form as the values to send
     * @returns {Object} JSX
     */
    render(){
	let MessageSendSchema = Yup.object().shape({
	    subject: Yup.string().required().max(255, 'Subject must be less than 256 characters long!'),
	    content: Yup.string().required().max(8192, 'Content must be less than 8192 characters long!')
	})
	return (
		<div className="messageSend">
		<h1>Send a Message</h1>
		<Formik initialValues={{subject: '', content: ''}} validationSchema={MessageSendSchema} onSubmit={(values) => {
		    var token = sessionStorage.getItem('token')
		    var payload = JSON.parse(atob(token.split('.')[1]))
		    var newValues = {
			toUser: this.props.toUser,
			fromUser: payload.username,
			subject: values.subject,
			content: values.content,
		    }
		    this.props.sendMessage(newValues)
		}}>
		{({errors, touched, setFieldValue}) => (
			<Form className="messageSendForm" id="messageSendFormID">
			<p>Sending to: {this.props.toUser}</p>
			<p>Subject:</p>
			<Field className="entry" name="subject" type="text"/>
			{ errors.subject && touched.subject ? (
				<div className="error">{errors.file}</div>
			) : null}
			<p>Message Content</p>
			<textarea placeholder="Remember, be nice!" rows="10" cols="100" name="content" form="messageSendFormID" onChange={(event) => {
			    setFieldValue("content", event.currentTarget.value)
			}}></textarea>

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
														   
