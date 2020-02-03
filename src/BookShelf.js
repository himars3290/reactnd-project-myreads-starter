import React from "react";
import { Link } from "react-router-dom";
import Book from "./Book.js";

function BookShelf(props) {
	const { name, books } = props
	return (<div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
				{books.map((book)=>(
					<Book key={book.id} book={book}/>
				))}


        </ol>
      </div>
    </div>);
}
export default BookShelf;
