import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from "react-router-dom";
import SearchBooks from "./searchBooks.js"
import BookShelf from "./BookShelf.js"
class BooksApp extends React.Component {
	state = {
		books: [],
		readBooks: [],
		currentlyReadingBooks: [],
		wantToReadBooks: []
	}
	componentDidMount() {
		BooksAPI.getAll()
			.then((booksFromAPI) => {
				this.setState((prevState) => ({
					books: booksFromAPI,
					readBooks: booksFromAPI.filter((book) => (book.shelf === 'read')),
					currentlyReadingBooks: booksFromAPI.filter((book) => (book.shelf === 'currentlyReading')),
					wantToReadBooks: booksFromAPI.filter((book) => (book.shelf === 'wantToRead')),
				}))
			});
	}
	refreshBookShelves = (response) => {
		const changedBooks = this.state.books.map((book) => {
			if (response.currentlyReading.includes(book.id)) {
				book.shelf = "currentlyReading";
			} else if (response.read.includes(book.id)) {
				book.shelf = "read";
			} else if (response.wantToRead.includes(book.id)) {
				book.shelf = "wantToRead";
			}
			return book;
		});
		this.setState(() => ({
			books: changedBooks,
			readBooks: changedBooks.filter((book) => (book.shelf === 'read')),
			currentlyReadingBooks: changedBooks.filter((book) => (book.shelf === 'currentlyReading')),
			wantToReadBooks: changedBooks.filter((book) => (book.shelf === 'wantToRead')),
		}))
	}
	render() {
		const { readBooks, currentlyReadingBooks, wantToReadBooks } = this.state;
		return (<div className="app">
        <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Route exact path="/" render={()=>(
                    <div>
                      <BookShelf refresh={(flag) => {
            							this.refreshBookShelves(flag)
            					}}
                         name="Currently Reading"
                        books={currentlyReadingBooks}>
                      </BookShelf>
                      <BookShelf refresh={(response) => {
            							this.refreshBookShelves(response)
            					}}
                        name="Want to Read"
                        books={wantToReadBooks}>
                      </BookShelf>
                      <BookShelf refresh={(flag) => {
            							this.refreshBookShelves(flag)
            					}}
                        name="Read"
                        books={readBooks}>
                      </BookShelf>
                  </div>
                )}>
              </Route>

              <Route path = "/search" render = {({ history }) => (
                  <SearchBooks books={this.state.books}/>
                )}>
              </Route>
            </div>
        </div>
      </div> < div className = "open-search" > <Link to='/search' className="add-contact">Add a book </Link> < /div> < /div > )
	}
}
export default BooksApp