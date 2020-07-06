import React, {Component}from 'react';
import {graphql} from 'react-apollo'
import {getBooksQuery} from "../Queries/Queries";



class BookDetails extends Component{

    displayBooks(){
        const {BooksQuery} = this.props.data;
        if (BooksQuery){
            return (
                BooksQuery.map(item =>{
                    return(
                        <div>
                            <div><li key={item.id}>{item.title}</li></div>
                            <div><li>{item.author}</li></div>
                            <div><li>{item.age}</li></div>
                            <div><li>{item.book}</li></div>
                        </div>)
                })
            )
        } else {
            return<div> Loading books...</div>
        }
    }

    render(){

        return(
            <div>
                <h1>Book detail</h1>
                <ul>{this.displayBooks()}</ul>
            </div>
        )
    }
}

export default graphql(getBooksQuery) (BookDetails)