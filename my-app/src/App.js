// eslint-disable no-unusued-vars
import React, { Component } from 'react'
import './App.css'
import Header from './components/header/Header'
import Search from './components/search/Search'
import ProductCard from './components/productCard/ProductCard'
import reactLogo from './logo.svg'
import testImage from './test1.jpg'
// eslint-enable no-unusued-vars

class App extends Component {
    onSearch (term) {
	console.log('search on term:' + term)
    }
    onProductClick (id) {
	console.log('showing full product with id:' + id)
    }
    render () {
	return (
		<div>
		<div id="Header">
		<Header title="Classified Ads" logo={reactLogo} onSearchClick={this.onSearch}/>
		<a href="#default" className="logo">{this.props.title}</a>
                </div>
                <div id="Search">
                <Search onSearchClick={this.onSearch} />
		<ProductCard productImg={testImage} productID="1" productName="Big Tobz" productPrice="69.00" productLocation="Coventry, UK" onProductClick={this.onProductClick} /> 
                </div>
                </div>
    )
  }
}

export default App
