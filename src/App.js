import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
import MyReads from './components/MyReads';

class BooksApp extends Component {
  state = {
    myReads: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((myReads) => {
        this.setState(() => ({
          myReads
        }))
      })
  }

  updateMyReads = (book, shelf) => {
    console.log(book, shelf)
    this.setState((currentState) => ({
      myReads: currentState.myReads.map((c) => {
        if (c.id == book.id) {
          c.shelf = shelf
        } 
        return c
      })

    }))

    BooksAPI.update(book, shelf)

  }

  render() {
    return (
      <div className="app">          
        <Route exact path='/search' render={({history}) => (
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
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        )} />
        
        <Route exact path='/' render={({histry}) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <MyReads
              myReads={this.state.myReads}
              updateList={this.updateMyReads}
            />
            <div className="open-search">
              <Link to='search'>
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </Link>
            </div>
        </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
