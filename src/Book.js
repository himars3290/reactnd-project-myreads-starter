import React, {Component} from "react";

class Book extends Component{
  updateBooks = (selectedShelf) => {

  }

  render(){
    const options = [{
      value: 'currentlyReading',
      text: 'Currently Reading'
    },
    {
      value: 'wantToRead',
      text: 'Want to Read'
    },
    {
      value: 'read',
      text: 'Read'
    },
    {
      value: 'none',
      text: 'None'
    }]
    const {book, onShelfChange} = this.props;



    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value= {book.shelf} onChange={(event) => onShelfChange(book, event.target.value)}>
              <option value="move" disabled>Move to...</option>
              {options.map((option)=>(
                <option key={option.value} value={option.value}>
                {option.text}</option>

              ))}

              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
          {book.authors.join(', ')}
          </div>
        </div>
      </li>
    );
  }
}
export default Book;
