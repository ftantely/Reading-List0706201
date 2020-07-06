import React, {Component}from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'

import './styles/App.css';
import './styles/CssBooklListBookDetails.css';
import './styles/CssAddBook.css';
import './styles/CssUpdateBook.css';
import './styles/CssAddAuthor.css';
import './styles/CssAuthorList.css';


import BookList from './component/BookList'
import AddAuthor from './component/AddAuthor'
import AddBook from './component/AddBook'
import AuthorList from './component/AuthorList'
import UpdateBook from "./component/UpdateBook";


const client = new ApolloClient({
    uri:'http://localhost:9200/graphql'
})

class App extends Component{

  render(){
    console.log(this.props)
    return(
        <ApolloProvider client ={client}>
            <div className='main'>
                <div className='BookList'>

                    <div><BookList/></div>
                </div>
                <div className='FourC'>
                    <div className='AddBook' ><AddBook/></div>
                    <div className='UpdateBook' ><UpdateBook/></div>
                    <div className='AddAuthor' ><AddAuthor/></div>
                    <div className='AuthorList' ><AuthorList/></div>
                </div>


            </div>
        </ApolloProvider>
    )
  }

}


export default App;
