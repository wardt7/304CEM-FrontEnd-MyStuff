/**
 * Component for rendering multiple cards
 * @module components/grid
 */

import React, { Component } from 'react'
import ProductCard from '../productCard/ProductCard'
import './Grid.css'

class Grid extends Component {
    /**
     * Constructor for binding functions to this component
     * @constructor
     */
    constructor(props){
	super(props)
	this.GridRow = this.GridRow.bind(this)
    }
    /**
     * Function for dynamically inserting multiple cards into the component
     * @param {Object[]} cards - A list of product objects containing a title, productID, links, price, and location
     * @param {function} props.onProductClick - Function for handling whenever someone clicks on a product card
     * @returns {Object} JSX
     */
    GridRow(cards){
	if(cards.length === 0){
	    return (
		    <div>
		    <h2>No Products to Show...</h2>
		    </div>
	    )
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
    /**
     * Function for rendering the grid
     * @returns {Object} JSX
     */
    render() {
	return(
		<div className="grid">
		{this.GridRow(this.props.items)}
		</div>
	)
    }
}

export default Grid
