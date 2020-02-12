import React, { Component } from "react";
import * as BooksAPI from './BooksAPI'
import BookGrid from "./BookGrid.js";
import { Link } from "react-router-dom";
class SearchBooks extends Component {
	state = {
		query: '',
		books: []
	}
	clearBooks = () => {
		this.setState(() => ({
			books: []
		}))
	}
	searchBooks = (query) => {
		const { booksWithCat } = this.props;
		BooksAPI.search(query)
			.then(response => {
				if (response !== undefined) {
					if (response['error']) {
						console.log(response['error']);
						this.clearBooks();
						// console.log(this.state.books);
					} else {
						this.setState(() => ({
							books: response.map((book) => {
								const b = book;
								if (booksWithCat.readBooksIds.includes(b.id)) {
									b.shelf = "read"
								} else if (booksWithCat.currentlyReadingIds.includes(b.id)) {
									b.shelf = "currentlyReading"
								} else if (booksWithCat.wantToReadIds.includes(b.id)) {
									b.shelf = "wantToRead"
								}
								return b;
							})
						}))
						// console.log(this.state.books);
					}
				} else {
					this.clearBooks();
					// console.log(this.state.books);
				}
			});
	}
	updateQuery = (input) => {
		this.setState(() => ({
			query: input.trim()
		}))
		this.searchBooks(input.trim());
	}
	render() {
		const { books } = this.state;
		const { refreshBookShelves } = this.props;
		return (<div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={(event)=> this.updateQuery(event.target.value)}/>

        </div>
      </div>
      <div className="search-books-results">
        {
  				books.length > 0 && (<div className="bookshelf-books">
          <BookGrid books={books} refresh={(response) => {
              refreshBookShelves(response)
          }}/>
  	      </div>)
  			}
        {
  				books.length <= 0 && (<div>
  					<p> No books
  					</p>
  				</div>)
  			}

      </div>
    </div>);
	}
}
export default SearchBooks;
// onClick={() => this.setState({ showSearchPage: false })}