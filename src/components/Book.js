import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

  render() {
    const {book, updateList, myReads, newBook} = this.props
    const backgroundImage = (book.imageLinks && book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : ''

    if (!book.shelf && myReads) {
      book.shelf = 'none'
      myReads.map((c) => {
        return book.shelf = (c.id === book.id) ? c.shelf : book.shelf
      })
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" 
              style={{ 
                width: 128, 
                height: 193, 
                backgroundImage: `url(${backgroundImage})`
              }}>  
            </div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => updateList(book, event.target.value, newBook)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors && book.authors.map((a) => (
            <div 
              className="book-authors"
              key={a}
            >{a}</div>
          ))}
        </div>
      </li>
    )
  }
}

Book.propTypes = {
  myReads: PropTypes.array,
  updateList: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  newBook: PropTypes.bool.isRequired,
}

export default Book;