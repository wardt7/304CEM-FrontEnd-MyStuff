import React, { Component } from 'react'
import './Signup.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

class Signup extends Component {
    constructor(props){
	super(props)
    }
    render(){
	let SignupSchema = Yup.object().shape({
	email: Yup.string().email('Invalid email').required('Required'),
	password: Yup.string().min(2, 'Too Short!').max(16, 'Too Long!').required('Required'),
	rePassword: Yup.string().min(2, 'Too Short!').max(16, 'Too Long!').required('Required').oneOf([Yup.ref('password'), null])
    })
	return (
		<div className="Signup">
		<h1>Signup</h1>
		<Formik initialValues={{email: '', password: '', rePassword: ''}} validationSchema={SignupSchema} onSubmit={values => {
		    console.log(values)
		}}>
		{({errors, touched}) => (
			<Form>
			<Field name="email" type="email" />
			{errors.email && touched.email ? (
				<div>{errors.email}</div>
			) : null}
			<Field name="password" type="password" />
			{errors.password && touched.password ? (
				<div>{errors.password}</div>
			) : null}
			<Field name="rePassword" type="password" />
			{errors.rePassword && touched.password ? (
				<div>{errors.rePassword}</div>
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
