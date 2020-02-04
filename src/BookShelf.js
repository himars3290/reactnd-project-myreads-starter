import React, { Component } from "react";
import BookGrid from "./BookGrid.js";
class BookShelf extends Component {
	render() {
		const { name, books, refreshBookShelves } = this.props
		return (<div className="bookshelf">
	      <h2 className="bookshelf-title">{name}</h2>
	      <div className="bookshelf-books">
					<BookGrid books={books} refresh={(response) => {
							refreshBookShelves(response)
					}}/>
	      </div>
	    </div>);
	}
}
export default BookShelf;