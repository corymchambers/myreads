import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route, Link } from 'react-router-dom';
import MyReads from './components/MyReads';
import Search from './components/Search';

class BooksApp extends Component {
  state = {
    myReads: []
  }

  // Once component is mounted this will get all the books for the user and save to the myReads state
  componentDidMount() {
    BooksAPI.getAll()
      .then((myReads) => {
        this.setState(() => ({
          myReads
        }))
      })
  }

  /**
   * @description Updates the myReads state or adds to it
   * @param {object} book - The book that is being updated or added to the myReads state
   * @param {string} shelf - The shelf that the book should belong to
   * @param {boolean} - Whether or not the book will be new to the myReads state
   */
  updateMyReads = (book, shelf, newBook) => {
    if (newBook === true) {
      book.shelf = shelf
      this.setState((currentState) => ({
        myReads: currentState.myReads.concat([book])
      }))
    } else {
      this.setState((currentState) => ({
        myReads: currentState.myReads.map((c) => {
          if (c.id === book.id) {
            c.shelf = shelf
          }
          return c
        })
      }))
    }
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/search" render={({history}) => (
          <Search
            updateList={this.updateMyReads}
            myReads={this.state.myReads}
          />
        )} />

        <Route exact path="/" render={({history}) => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <MyReads
              myReads={this.state.myReads}
              updateList={this.updateMyReads}
            />
            <div className="open-search">
              <Link to="search">
                <button>Add a book</button>
              </Link>
            </div>
        </div>
        )} />

      </div>
    )
  }
}

export default BooksApp
