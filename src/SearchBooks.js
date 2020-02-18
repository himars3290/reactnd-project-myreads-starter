import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import BookGrid from "./BookGrid.js";
import { Link } from "react-router-dom";
class SearchBooks extends Component {
  state = {
    query: "",
    books: []
  };
  clearBooks = () => {
    this.setState(() => ({
      books: []
    }));
  };
  componentDidUpdate(prevProps) {
    if (prevProps.booksWithCat !== this.props.booksWithCat)
      this.updateState(this.state.books, this.props.booksWithCat);
  }
  searchBooks = query => {
    const { booksWithCat } = this.props;
    BooksAPI.search(query).then(response => {
      if (response !== undefined && response["error"] === undefined) {
        this.updateState(response, booksWithCat);
      } else {
        this.clearBooks();
      }
    });
  };
  updateState = (books, booksWithCat) => {
    this.setState(() => ({
      books: books.map(book => {
        const b = book;
        if (booksWithCat.readBooksIds.includes(b.id)) {
          b.shelf = "read";
        } else if (booksWithCat.currentlyReadingIds.includes(b.id)) {
          b.shelf = "currentlyReading";
        } else if (booksWithCat.wantToReadIds.includes(b.id)) {
          b.shelf = "wantToRead";
        }
        return b;
      })
    }));
  };
  updateQuery = input => {
    this.setState(
      () => ({
        query: input.trim()
      }),
      () => {
        if (this.state.query.length > 0) {
          this.searchBooks(this.state.query);
        } else {
          this.clearBooks();
        }
      }
    );
  };
  render() {
    const { books } = this.state;
    const { refreshBookShelves } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {books.length > 0 && (
            <div className="bookshelf-books">
              <BookGrid
                books={books}
                refresh={response => {
                  refreshBookShelves(response);
                }}
              />
            </div>
          )}

          {books.length <= 0 && (
            <div>
              <p> No books</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default SearchBooks;
