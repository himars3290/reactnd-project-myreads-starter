import React, {Component} from "react";
import * as BooksAPI from './BooksAPI'
import Book from "./Book.js";

class BookShelf extends Component {

	updateBookShelf = (book, changedShelf) => {
		BooksAPI.update(book, changedShelf).then( response => {
			if (this.props.refresh) {
				this.props.refresh(response);
			}
		});
	}
	render(){
		const { name, books } = this.props
		return (<div className="bookshelf">
	      <h2 className="bookshelf-title">{name}</h2>
	      <div className="bookshelf-books">
	        <ol className="books-grid">
					{books.map((book)=>(
						<Book key={book.id} book={book} onShelfChange={this.updateBookShelf}/>
					))}


	        </ol>
	      </div>
	    </div>);
	}
}
export default BookShelf;
