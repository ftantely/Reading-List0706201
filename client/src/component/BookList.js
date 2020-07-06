import React, {Component}from 'react';
import {graphql} from 'react-apollo'
import {getBooksQuery, getDeleteBook} from "../Queries/Queries";
import {flowRight as compose} from 'lodash'

// import BookDetails from './BookDetails'

class BookList extends Component{
    constructor(props){
        super(props);
        this.state = {
            bookId:'',
            selected:'',
        }

    }

    deleteBook(e){
        e.preventDefault()
        this.props.getDeleteBook({
            variables:{
                id:this.state.selected
            },
            refetchQueries:[{query:getBooksQuery}]

        })
    }


    displayBooks(){
        const {BooksQuery} = this.props.getBooksQuery;
        if (BooksQuery){
            return (
                BooksQuery.map(item =>{

                    return(
                                <div key={item.id} className='book-list'>

                                        <div className='title'>
                                            <div className='tooltipTitle'>
                                                <p onClick={(e) =>{this.setState({bookId:item.id})}}>
                                                    {item.title}
                                                </p>
                                                <span className='tooltipTextTitle'>Click to view book details</span>
                                            </div>
                                            <div className='tooltipButton'>
                                                <button onClick={(e) =>{this.setState({selected:item.id, bookId:''})}}
                                                ><span></span>
                                                </button>
                                                <span className='tooltipTextButton'>Delete book</span>
                                            </div>


                                        </div>


                                   <div className='details'>

                                       {

                                           (this.state.bookId==='' || this.bookLength()===0) && <div className='noBook'><h1>No Book Selected </h1></div>

                                       }

                                       {
                                           (this.state.bookId ===item.id) &&
                                           <div className='bookDetails'>
                                               <h1>{item.title}</h1>
                                               <div className='genre'> <span>Genre: </span>{item.genre}</div>
                                               <div className='authorAge'>
                                                   <div className='author_'>
                                                       <span >Author: </span>{item.author.name}
                                                   </div>
                                                   <div className='age'>
                                                       <span >Age: </span>{item.author.age}
                                                   </div>
                                               </div>

                                               <div className='allBooks'><span>All books written by {item.author.name}:</span>{item.author.book.map(b=>{
                                                   return(<li key={b.id}>{b.title}</li>)
                                               })}
                                               </div>
                                           </div>
                                       }

                                   </div>

                                </div>




                    )
                })
            )
        } else {
            return<div> Loading books...</div>
        }
    }

    bookLength(){
        const {BooksQuery} = this.props.getBooksQuery;
        if(BooksQuery){
            return(BooksQuery.length)
        }
    }

    render(){
        console.log(this.props)
        return(
            <div className='Form'>
                {this.bookLength()===0 ?
                <div>

                            <div className='emptyBook'>
                                <h1>Book List is Empty</h1>
                            </div>
                            <div className='emptyDetails'>
                                <h1>No Book Selected</h1>
                            </div>
                </div>
                    :
                <div>
                    <form onSubmit={(e) =>{this.deleteBook(e)}}>
                        <ul className='stuff'>
                             <h1>My Favorite Books </h1>
                                  {this.displayBooks()}
                        </ul>
                    </form>
                </div>}

            </div>
        )
    }
}

export default compose (
    graphql(getBooksQuery, {name:"getBooksQuery"}),
    graphql(getDeleteBook, {name:"getDeleteBook"})) (BookList)