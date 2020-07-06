import React, {Component}from 'react';
import {graphql} from 'react-apollo'
import {getAuthorsQuery, getBooksQuery, getDeleteAuthor} from "../Queries/Queries";
import {flowRight as compose} from 'lodash'
// import Duplicate from './Duplicate'

class AuthorList extends Component {

    constructor(){
        super();
        this.state ={
            id:''
        }
    }


    deleteAuthor(e){
        e.preventDefault()
        this.props.getDeleteAuthor({
            variables:{
                id:this.state.id
            },
            refetchQueries:[{query:getAuthorsQuery}]
        })

    }

    displayAuthor(){
        const{AuthorsQuery} = this.props.getAuthorsQuery;
        const{BooksQuery} = this.props.getBooksQuery;
        if(AuthorsQuery && BooksQuery){
           return (
               AuthorsQuery.map((a)=>

                   <div key={a.id} >
                       <div className='authorList'>
                           <li className='liAuth' key={a.id} >{BooksQuery.map(b =>b.author.name).includes(a.name) ?
                               <div className='nameAuth1'>
                                   <div>{a.name}</div>
                               </div>
                               :
                               <div className='authorDelete'>
                                   <div className='nameAuth' >{a.name}</div>
                                   <div className='Delete'>
                                       <button onClick={(e) =>{this.setState({id:a.id})}}><span/></button>
                                       <span className='tooltipDeleteText'>Delete author</span>
                                   </div>
                               </div>
                           }
                       </li>

                       </div>

                   </div>
               )
           )
        }

    }


    onRender(){
        const{AuthorsQuery} = this.props.getAuthorsQuery;
        if(AuthorsQuery){
          return(AuthorsQuery.length)
        }
     }


    render(){
        console.log(this.props)

        return(
            <div>
                {this.onRender() ===0 ?


                        <div className='noAuthor'>
                            <h1>No Author in the List</h1>
                        </div>

                    :

                        <div className='wAuthor'>
                            <h1>Author List</h1>
                            <div >
                                <form onSubmit={(e) =>{this.deleteAuthor(e)}}>
                                    <ul className='formTest'> {this.displayAuthor()}</ul>
                                </form>

                            </div>
                        </div>

               }


            </div>

        )
    }

}

export default compose(
    graphql(getDeleteAuthor, {name:"getDeleteAuthor"}),
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(getBooksQuery, {name:"getBooksQuery"})

)
(AuthorList)