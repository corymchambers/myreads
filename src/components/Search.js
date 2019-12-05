import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

class Search extends Component {

  state = {
    searchResults: []
  }

  /**
   *  @description Takes the query, searches the API for books related to that query and then updates the state with the search results
   *  @param {string} query - the search string
   */
  search = (query) => {
    if (query !== '') {
      BooksAPI.search(query)
      .then((results) => {
        const newSearchResults = (results.length > 0) ? results : [];
        this.setState(() => ({
          searchResults: newSearchResults
        }))
      })
    } else {
      this.setState(() => ({
        searchResults: []
      }))
    }
  }

  render () {
    const { updateList, myReads } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/"
          />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={
                (e) => {
                  this.search(e.target.value)
                }
              }
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {this.state.searchResults.length === 0 &&
                <div>No Books</div>
              }
              {this.state.searchResults.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  updateList={updateList}
                  myReads={myReads}
                  newBook={true}
                />
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  myReads: PropTypes.array.isRequired,
  updateList: PropTypes.func.isRequired
}

export default Search;