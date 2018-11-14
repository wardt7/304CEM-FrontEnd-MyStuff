import React, { Component } from 'react'
import './Login.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

class Login extends Component {
    constructor(props){
	super(props)
    }
    render(){
	let LoginSchema = Yup.object().shape({
	    username: Yup.string().required('Required'),
	    password: Yup.string().required('Required')
	})
	return(
		<div className="Login">
		<h1>Login</h1>
		<Formik initialValues={{username: '', password: ''}} validationSchema={LoginSchema} onSubmit={values => {
		    this.props.onLogin(values)
		}}>
		{({errors, touched}) => (
			<Form className="loginForm">
			<p>Username:</p>
			<Field className="entry" name="username" type="username" />
			{errors.username && touched.username ? (
				<div className="error">{errors.username}</div>
			) : null}
		        <p>Password:</p>
			<Field className="entry" name="password" type="password" />
			{errors.password && touched.password ? (
				<div className="error">{errors.password}</div>
			) : null}
			<button type="submit">Submit</button>
			</Form>
		)}
	        </Formik>
		</div>
	)
    }
}

export default Login
