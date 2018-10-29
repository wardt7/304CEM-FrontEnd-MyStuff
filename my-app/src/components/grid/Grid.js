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
			   <div className="card" key={item.id}>
			   <ProductCard productID={item.id}
			   productName={item.productName}
			   productImg={item.productImg}
			   productPrice={item.productPrice}
			   productLocation={item.productLocation}
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
