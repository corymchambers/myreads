import React, { Component } from 'react';
import Book from './Book';

class MyReads extends Component {

  render() {
    const { myReads, updateList } = this.props;
    const currReading = myReads.filter((m) => {
      return m.shelf.includes('currentlyReading')
    })

    const wantToRead = myReads.filter((m) => {
      return m.shelf.includes('wantToRead')
    })

    const read = myReads.filter((m) => {
      return m.shelf.includes('read')
    })

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
              </ol>

              {myReads.length === 0 && (
                <div>No books. Try adding some!</div>
              )}
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
                ) )}
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
                ) )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MyReads;