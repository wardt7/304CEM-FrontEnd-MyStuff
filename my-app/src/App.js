// eslint-disable no-unusued-vars
import React, { Component } from 'react'
import './App.css'
import Header from './components/header/Header'
import Search from './components/search/Search'
import ProductCard from './components/productCard/ProductCard'
import Grid from './components/grid/Grid'
import Data from './Data'
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
		<Grid items={Data.items} onProductClick={this.onProductClick} />
                </div>
                </div>
	)
  }
}

export default App
