import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
// import PropTypes from 'prop-types';

class Book extends Component {
  // static propTypes = {
  //   // myReads: this.propTypes.array.isRequired
  // }

  render() {
    const {book, updateList, myReads, newBook} = this.props
    // console.log(book.authors)
    const backgroundImage = (book.imageLinks && book.imageLinks.thumbnail) ? book.imageLinks.thumbnail : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
    
    // if (!book.shelf) {
    //   console.log('shelf')
    //   BooksAPI.get(book.id)
    //     .then((res) => {
    //       console.log(res.shelf)
    //       book.shelf = res.shelf
    //     }) 
    // } 

    if (!book.shelf && myReads) {
      book.shelf = 'none'
      myReads.map((c) => {
        if (c.id === book.id) {
          book.shelf = c.shelf
        }
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

export default Book;