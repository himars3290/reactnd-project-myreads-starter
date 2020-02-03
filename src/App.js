import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from "react-router-dom";
import SearchBooks from "./searchBooks.js"
import BookShelf from "./BookShelf.js"
class BooksApp extends React.Component {
	state = {
		books: []
	}
	componentDidMount() {
		BooksAPI.getAll()
			.then((booksFromAPI) => {
				this.setState((prevState) => ({
					books: booksFromAPI
				}))
			});
	}
	render() {
		console.log(this.state.books);
		const { books } = this.state;
		const readBooks = books.filter((book) => (book.shelf === 'read'));
		const currentlyReadingBooks = books.filter((book) => (book.shelf === 'currentlyReading'));
		const wantToReadBooks = books.filter((book) => (book.shelf === 'wantToRead'));
		console.log(readBooks);
		return (<div className="app">
    <Route exact path="/" render={()=>(
      <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <BookShelf name="Currently Reading" books={currentlyReadingBooks}/>
              <BookShelf name="Want to Read" books={wantToReadBooks}/>
              <BookShelf name="Read" books={readBooks}/>
            </div> < /div> < div className = "open-search" > <Link to='/search
			' className="add-contact">
			Add a book < /Link> < /div > < /div>)
	}
	/> < Route path = "/search"
	render = {
		({ history }) => (<SearchBooks/>)
	}
	/> < /div > )
}
}
export default BooksApp