import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from "react-router-dom";
import SearchBooks from "./searchBooks.js"
import ListBooks from "./listBooks.js"
class BooksApp extends React.Component {
	render() {
		return (<div className="app">
    <Route exact path="/" render={()=>(<ListBooks/>)} />
    <Route path="/search" render={({history}) => (<SearchBooks/>)}/>

      </div>)
	}
}
export default BooksApp;