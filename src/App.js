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
			wantToReadBooks: [],
			catBookIds: {
				"readBooksIds": [],
				"wantToReadIds": [],
				"currentlyReadingIds": []
			}
		}
		componentDidMount() {
			this.getBooks();
		}
		getBooks = () => {
			BooksAPI.getAll()
				.then((booksFromAPI) => {
					this.setState((prevState) => ({
						books: booksFromAPI,
						readBooks: booksFromAPI.filter((book) => (book.shelf === 'read')),
						currentlyReadingBooks: booksFromAPI.filter((book) => (book.shelf === 'currentlyReading')),
						wantToReadBooks: booksFromAPI.filter((book) => (book.shelf === 'wantToRead')),
						catBookIds: {
							...prevState.user,
							'readBooksIds': booksFromAPI.filter((book) => (book.shelf === 'read'))
								.map((b) => (b.id)),
							'wantToReadIds': booksFromAPI.filter((book) => (book.shelf === 'currentlyReading'))
								.map((b) => (b.id)),
							'currentlyReadingIds': booksFromAPI.filter((book) => (book.shelf === 'wantToRead'))
								.map((b) => (b.id)),
						},
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
			const { readBooks, currentlyReadingBooks, wantToReadBooks, catBookIds } = this.state;
			return (<div className="app">
        				<div className="list-books">
                <Route exact path="/" render={()=>(
                    <div className="list-books">
											<div className="list-books-title">
												<h1>MyReads</h1>
											</div>
                      <BookShelf refreshBookShelves={(response) => {
            							this.refreshBookShelves(response)
            					}}
                         name="Currently Reading"
                        books={currentlyReadingBooks}>
                      </BookShelf>
                      <BookShelf refreshBookShelves={(response) => {
            							this.refreshBookShelves(response)
            					}}
                        name="Want to Read"
                        books={wantToReadBooks}>
                      </BookShelf>
                      <BookShelf refreshBookShelves={(response) => {
            							this.refreshBookShelves(response)
            					}}
                        name="Read"
                        books={readBooks}>
                      </BookShelf>
											<div className = "open-search">
												<Link to='/search' className="add-contact">Add a book
												</Link>
											</div>
                  </div>
                )}>
              </Route>

              <Route path = "/search" render = {({ history }) => (
                  <SearchBooks refreshBookShelves={(response) => {
											this.getBooks();
									}}
									booksWithCat = {catBookIds}
									/>
                )}>
              </Route>
        </div> < /div> )
			}
		}
		export default BooksApp