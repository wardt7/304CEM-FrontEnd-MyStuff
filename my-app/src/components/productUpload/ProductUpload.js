import React, { Component } from 'react'
import './ProductUpload.css'
import axios from 'axios'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

class ProductUpload extends Component {
    constructor(props){
	super(props)
	this.submitForm = this.submitForm.bind(this)
    }
    submitForm(values){
	console.log('submitting form')
	console.log(values)
	axios.post('http://localhost:8080/products',{
	    headers: {
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'multipart/form-data'
	    },
	    title: values.title,
	    description: values.description,
	    location: values.location,
	    price: values.price,
	    author: values.author,
	    file: values.file
	    
	})
	    .then(function (response) {
		console.log(response)
	    })
	    .catch(function (error) {
		console.log(error)
	    })
    }
    render(){
	let UploadSchema = Yup.object().shape({
	    product: Yup.mixed().required(),
	    title: Yup.string().required(),
	    description: Yup.string().required(),
	    location: Yup.string().required(),
	    price: Yup.number().required()
	})
	return (
		<div className="productUpload">
		<h1>Product Upload</h1>
		<Formik initialValues={{product: null, title: '', description: '', location: '', price: 0, author: 'admin'}} validationSchema={UploadSchema} onSubmit={(values) => {
		    console.log('submitting form')
		    console.log(values)
		    let bodyFormData = new FormData()
		    bodyFormData.set('title', values.title)
		    bodyFormData.set('description', values.description)
		    bodyFormData.set('location', values.location)
		    bodyFormData.set('price', values.price)
		    bodyFormData.set('author', values.author)
		    bodyFormData.append('product', values.product)
		    axios({
			method: 'post',
			url: 'http://localhost:8080/products',
			data: bodyFormData,
			config: {headers: {'Access-Control-Allow-Origin': '*','Content-Type': 'multipart/form-data'}}
		    })
			.then(function (response) {
			    console.log(response)
			})
			.catch(function (error) {
			    console.log(error)
			})
		}}>
		{({errors, touched, setFieldValue}) => (
			<Form className="productUploadForm">
		        <p>Upload a file</p>
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
			<Field className="entry" type="text" name="description" />
			{errors.description && touched.description ? (
				<div className="error">{errors.description}</div>
			) : null}
		    <p>Location</p>
			<Field className="entry" type="text" name="location" />
			{errors.location && touched.location ? (
				<div className="error">{errors.location}</div>
			) : null}
		    <p>Price</p>
			<Field type="number" name="price" min="0" />
			{errors.price && touched.price ? (
				<div className="error">{errors.price}</div>
			) : null}
		    <input type="hidden" name="author" value="admin" />
		        <button type="submit">Submit</button>
		        </Form>
		)}
	    </Formik>
		</div>
	)
    }
}

export default ProductUpload
		
