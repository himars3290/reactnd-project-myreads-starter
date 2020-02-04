import React, { Component } from "react";
import * as BooksAPI from './BooksAPI'
import Book from "./Book.js";
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
		BooksAPI.search(query)
			.then(response => {
				if (response !== undefined) {
					if (response['error']) {
						console.log(response['error']);
						this.clearBooks();
						console.log(this.state.books);
					} else {
						this.setState(() => ({
							books: response
						}))
						console.log(this.state.books);
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
  	        <ol className="books-grid">
  					{books.map((book)=>(
  						<Book key={book.id} book={book} />
  					))}
  	        </ol>
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