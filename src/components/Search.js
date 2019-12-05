import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';
import PropTypes from 'prop-types';

class Search extends Component {

  state = {
    searchResults: []
  }

  search = (query) => {
    if (query !== '') {
      BooksAPI.search(query)
      .then((results) => {
        const newSearchResults = (results.length > 0) ? results : []
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
            to='/'
          />
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
              type="text" 
              placeholder="Search by title or author" 
              onChange={
                (e) => {
                  // console.log(e.target.value)
                  this.search(e.target.value)
                }
              } 
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              {/* {this.state.searchResults.length > 0 && 
                <div>Books</div>
              }
              {this.state.searchResults.length === 0 && 
                <div>No Books</div>
              } */}
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