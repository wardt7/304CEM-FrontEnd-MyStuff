import React, { Component } from 'react'
import './ProductUpload.css'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

class ProductUpload extends Component {
    constructor(props){
	super(props)
    }
    render(){
	let UploadSchema = Yup.object().shape({
	    file: Yup.mixed().required()
	})
	return (
		<div className="productUpload">
		<h1>Product Upload</h1>
		<Formik initialValues={{file: null}} validationSchema={UploadSchema} onSubmit={(values) => {
		    alert(
			JSON.stringify(
			    {
				fileName: values.file.name,
				type: values.file.type,
			    },
			    null,
			    2
			)
		    )
		}}>
		{({errors, touched, setFieldValue}) => (
			<Form className="productUploadForm">
		        <p>Upload a file</p>
		        <input id="file" type="file" name="file" onChange={(event) => {
			    setFieldValue("file", event.currentTarget.files[0])
		        }}/>
		        { errors.file && touched.file ? (
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

export default ProductUpload
		
