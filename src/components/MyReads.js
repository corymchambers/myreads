import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class MyReads extends Component {

  render() {
    const { myReads, updateList } = this.props;

    // Filter out currentlyReading books from the myReads state
    const currReading = myReads.filter((m) => {
      return m.shelf.includes('currentlyReading')
    });

    // Filter out wantToRead books from the myReads state
    const wantToRead = myReads.filter((m) => {
      return m.shelf.includes('wantToRead')
    });

    // Filter out the read books from the myReads state
    const read = myReads.filter((m) => {
      return m.shelf.includes('read')
    });

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currReading.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    updateList={updateList}
                    newBook={false}
                    />
                ))}
                {currReading.length === 0 && (
                  <div>No books being currently read. Try adding some!</div>
                )}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {wantToRead.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    updateList={updateList}
                    newBook={false}
                  />
                ))}
                {wantToRead.length === 0 && (
                  <div>No books being you want to read. Try adding some!</div>
                )}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {read.map((book) => (
                  <Book
                    key={book.id}
                    book={book}
                    updateList={updateList}
                    newBook={false}
                    />
                ))}
                {read.length === 0 && (
                  <div>No books being you have read. Try adding some!</div>
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

MyReads.propTypes = {
  myReads: PropTypes.array.isRequired,
  updateList: PropTypes.func.isRequired
}

export default MyReads;