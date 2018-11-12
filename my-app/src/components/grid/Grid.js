import React, { Component } from 'react'
import ProductCard from '../productCard/ProductCard'
import './Grid.css'

class Grid extends Component {
    constructor(props){
	super(props)
	this.GridRow = this.GridRow.bind(this)
    }
    GridRow(cards){
	if(cards == null){
	    return null
	}
	return(
	    <div>
		{cards.map((item, index) =>
			   <div className="card" key={item.productID}>
			   <ProductCard productID={item.productID}
			   productName={item.title}
			   productImg={item.links[0].href}
			   productPrice={item.price}
			   productLocation={item.location}
			   onProductClick={this.props.onProductClick}/>
			   </div>
			  )}
	    </div>
	)
    }
    render() {
	return(
		<div className="grid">
		{this.GridRow(this.props.items)}
		</div>
	)
    }
}

export default Grid
