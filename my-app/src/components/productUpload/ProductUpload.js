/**
 * Module for creating a product upload form
 * @module components/productUpload
 */

import React, { Component } from 'react'
import './ProductUpload.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

class ProductUpload extends Component {
    /**
     * Function for binding the submitForm function to this component
     * @constructor
     */
    constructor(props){
	super(props)
	this.submitForm = this.submitForm.bind(this)
    }
    /**
     * Wrapper function for sending product upload values to the API
     * @param {Object} values - The values to be sent to the API
     */
    submitForm(values){
	this.props.sendProductUpload(values)
    }
    /**
     * Function for rendering the product upload form
     * @returns {Object} JSX
     */
    render(){
	let UploadSchema = Yup.object().shape({
	    product: Yup.mixed().required(),
	    title: Yup.string().required().max(255, 'Title must be less than 256 characters!'),
	    description: Yup.string().required().max(4096, 'Description must be less than 4097 characters!'),
	    location: Yup.string().required().max(127, 'Location must be less than 128 characters!'),
	    price: Yup.number().required().positive('Price must be positive!').max(99999, 'Price must be less than 100,000!')
	})
	return (
		<div className="productUpload">
		<h1>Product Upload</h1>
		<Formik initialValues={{product: null, title: '', description: '', location: '', price: 0}} validationSchema={UploadSchema} onSubmit={(values) => {
		    let bodyFormData = new FormData()
		    bodyFormData.set('title', values.title)
		    bodyFormData.set('description', values.description)
		    bodyFormData.set('location', values.location)
		    bodyFormData.set('price', values.price)
		    bodyFormData.append('product', values.product)
		    this.submitForm(bodyFormData)
		}}>
		{({errors, touched, setFieldValue}) => (
			<Form className="productUploadForm" id="productUploadFormID">
		        <p>Image Upload</p>
		        <input id="file" type="file" name="product" onChange={(event) => {
			    setFieldValue("product", event.currentTarget.files[0])
		        }}/>
		        { errors.file && touched.file ? (
			        <div className="error">{errors.file}</div>
		        ) : null}
		    <p>Title</p>
			<Field className="entry" type="text" name="title" />
			{errors.title && touched.title ? (
				<div className="error">{errors.title}</div>
			) : null}
		    <p>Description</p>
			<textarea placeholder="Remember, be nice!" rows="10" cols="100" name="description" form="productUploadFormID" onChange={(event) => {
			    setFieldValue("description", event.currentTarget.value)
			}}></textarea>
			{errors.description && touched.description ? (
				<div className="error">{errors.description}</div>
			) : null}
		    <p>Location</p>
			<Field className="entry" type="text" name="location" />
			{errors.location && touched.location ? (
				<div className="error">{errors.location}</div>
			) : null}
		    <p>Price</p>
			<Field type="number" name="price" min="0" max="10000" step="0.01" />
			{errors.price && touched.price ? (
				<div className="error">{errors.price}</div>
			) : null}
		        <button type="submit">Submit</button>
		        </Form>
		)}
	    </Formik>
		</div>
	)
    }
}

export default ProductUpload
		
