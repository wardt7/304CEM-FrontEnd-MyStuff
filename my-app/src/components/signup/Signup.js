/**
 * Module for creating a signup page
 * @module components/signup
 */

import React, { Component } from 'react'
import './Signup.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

class Signup extends Component {
    /**
     * Renders the signup form
     * @param {function} props.onSignup - The API function for sending the signup data
     * @returns {Object} JSX
     */
    render(){
	let SignupSchema = Yup.object().shape({
	    email: Yup.string().email('Invalid email').required('Required'),
	    username: Yup.string().min(4, 'Too Short!').max(16, 'Too Long!').required('Required'),
	password: Yup.string().min(2, 'Too Short!').max(16, 'Too Long!').required('Required'),
	    rePassword: Yup.string().min(2, 'Too Short!').max(16, 'Too Long!').required('Required').oneOf([Yup.ref('password'),null], "Passwords don't match!")
    })
	return (
		<div className="Signup">
		<h1>Signup</h1>
		<Formik initialValues={{email: '', username: '', password: '', rePassword: ''}} validationSchema={SignupSchema} onSubmit={values => {
this.props.onSignup(values)
}}>
		{({errors, touched}) => (
			<Form className="signupForm">
			<p>Email:</p>
			<Field className="entry" name="email" type="email" />
			{errors.email && touched.email ? (
				<div className="error">{errors.email}</div>
			) : null}
			<p>Username:</p>
			<Field className="entry" name="username" type="text" />
			{errors.username && touched.username ? (
				<div className="error">{errors.username}</div>
			) : null}
		        <p>Password:</p>
			<Field className="entry" name="password" type="password" />
			{errors.password && touched.password ? (
				<div className="error">{errors.password}</div>
			) : null}
		        <p>Re-enter Password:</p>
			<Field className="entry" name="rePassword" type="password" />
			{errors.rePassword && touched.password ? (
				<div className="error">{errors.rePassword}</div>
			) : null}
			<button type="submit">Submit</button>
			</Form>
		)}
	        </Formik>
		</div>
	)
    }
}

export default Signup
