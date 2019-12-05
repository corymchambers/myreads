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

  componentDidMount() {
    BooksAPI.getAll()
      .then((myReads) => {
        this.setState(() => ({
          myReads
        }))
      })
  }

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
        <Route exact path='/search' render={({history}) => (
          <Search
            updateList={this.updateMyReads}
            myReads={this.state.myReads}
          />
        )} />
        
        <Route exact path='/' render={({history}) => (
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
