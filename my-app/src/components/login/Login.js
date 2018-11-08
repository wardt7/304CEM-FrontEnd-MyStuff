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
	    email: Yup.string().email('Invalid email').required('Required'),
	    password: Yup.string().required('Required')
	})
	return(
		<div className="Login">
		<h1>Login</h1>
		<Formik initialValues={{email: '', password: ''}} validationSchema={LoginSchema} onSubmit={values => {
		    console.log(values)
		}}>
		{({errors, touched}) => (
			<Form className="loginForm">
			<p>Email:</p>
			<Field className="entry" name="email" type="email" />
			{errors.email && touched.email ? (
				<div className="error">{errors.email}</div>
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
