import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../BooksAPI'

class Book extends Component {
  static propTypes = {
    // myReads: this.propTypes.array.isRequired
  }


  render() {
    const {book, cover, updateList} = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" 
              style={{ 
                width: cover.width, 
                height: cover.height, 
                backgroundImage: `url(${cover.image})`
              }}>  
            </div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={(event) => updateList(book, event.target.value)}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.author}</div>
        </div>
      </li>
    )
  }
}

export default Book;