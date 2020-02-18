import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Link } from "react-router-dom";
import SearchBooks from "./SearchBooks.js";
import BookShelf from "./BookShelf.js";
class BooksApp extends React.Component {
  state = {
    books: [],
    readBooks: [],
    currentlyReadingBooks: [],
    wantToReadBooks: [],
    catBookIds: {
      readBooksIds: [],
      wantToReadIds: [],
      currentlyReadingIds: []
    }
  };
  componentDidMount() {
    this.getBooks();
  }
  getBooks = () => {
    BooksAPI.getAll().then(booksFromAPI => {
      this.updateState(booksFromAPI);
    });
  };
  updateState = books => {
    this.setState(prevState => ({
      books: books,
      readBooks: books.filter(book => book.shelf === "read"),
      currentlyReadingBooks: books.filter(
        book => book.shelf === "currentlyReading"
      ),
      wantToReadBooks: books.filter(book => book.shelf === "wantToRead"),
      catBookIds: {
        ...prevState.user,
        readBooksIds: books
          .filter(book => book.shelf === "read")
          .map(b => b.id),
        wantToReadIds: books
          .filter(book => book.shelf === "wantToRead")
          .map(b => b.id),
        currentlyReadingIds: books
          .filter(book => book.shelf === "currentlyReading")
          .map(b => b.id)
      }
    }));
  };
  refreshBookShelves = response => {
    const changedBooks = this.state.books.map(book => {
      if (response.currentlyReading.includes(book.id)) {
        book.shelf = "currentlyReading";
      } else if (response.read.includes(book.id)) {
        book.shelf = "read";
      } else if (response.wantToRead.includes(book.id)) {
        book.shelf = "wantToRead";
      }
      return book;
    });
    this.updateState(changedBooks);
  };
  render() {
    const {
      readBooks,
      currentlyReadingBooks,
      wantToReadBooks,
      catBookIds
    } = this.state;
    return (
      <div className="app">
        <div className="list-books">
          <Route
            exact
            path="/"
            render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <BookShelf
                  refreshBookShelves={response => {
                    this.refreshBookShelves(response);
                  }}
                  name="Currently Reading"
                  books={currentlyReadingBooks}
                />
                <BookShelf
                  refreshBookShelves={response => {
                    this.refreshBookShelves(response);
                  }}
                  name="Want to Read"
                  books={wantToReadBooks}
                />
                <BookShelf
                  refreshBookShelves={response => {
                    this.refreshBookShelves(response);
                  }}
                  name="Read"
                  books={readBooks}
                />
                <div className="open-search">
                  <Link to="/search" className="add-contact">
                    Add a book
                  </Link>
                </div>
              </div>
            )}
          />

          <Route
            path="/search"
            render={({ history }) => (
              <SearchBooks
                refreshBookShelves={response => {
                  this.getBooks();
                }}
                booksWithCat={catBookIds}
              />
            )}
          />
        </div>
      </div>
    );
  }
}
export default BooksApp;
