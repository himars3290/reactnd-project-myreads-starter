import React, { Component } from "react";
import * as BooksAPI from './BooksAPI'
import Book from "./Book.js";
class BookGrid extends Component {
	updateBookShelf = (book, changedShelf) => {
		BooksAPI.update(book, changedShelf)
			.then(response => {
				if (this.props.refresh) {
					this.props.refresh(response);
				}
			});
	}
	render() {
		const { books } = this.props
		return (
	        <ol className="books-grid">
					{books.map((book)=>(
						<Book key={book.id} book={book} onShelfChange={this.updateBookShelf}/>
					))}
	        </ol>
	      );
	}
}
export default BookGrid;
