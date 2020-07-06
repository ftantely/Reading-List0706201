import React, {Component}from 'react';
import {graphql} from 'react-apollo'
import {getAuthorsQuery, getBookMutation, getBooksQuery} from "../Queries/Queries";
import {flowRight as compose} from 'lodash'

class Custom extends Component{

    constructor(){
        super();
        this.state ={
            authorId:'',
            arrow:false,
            text:'Select Author'
        }
    }

    arrowDirection(){
        this.setState({
            arrow:!this.state.arrow
        })
    }

    displayAuthors(){
        const {AuthorsQuery} = this.props.getAuthorsQuery;
        if (AuthorsQuery){
            return(
                AuthorsQuery.map(item =>{
                    return(
                        <option key={item.id} value={item.id} onClick={()=>{this.setState({
                            text:item.name, arrow:false, authorId:item.id})}}
                             >
                            {item.name}
                        </option>
                    )
                })
            )
        }else {
            return <option>Loading authors...</option>
        }
    }

    submitForm(e){
        e.preventDefault();
        this.setState({authorId:this.state.authorId})

    }

    render(){

        const{ arrow,text}=this.state;
        console.log(this.state)
        return(
            <div>
               <form onSubmit={(e) =>this.submitForm(e)}>
                   <div className='arrowContainer'>
                       <div >{text}</div>
                       <div className='arrow' onClick={()=>this.arrowDirection()}>
                           <span className={arrow ? 'arrowUp' : 'arrowDown'}/>
                       </div>
                   </div>
                   <div style={{display:arrow ? 'block' : 'none'}}>
                       {this.displayAuthors()}
                   </div>
                   <p>{this.state.authorId}</p>
                   <button>Add</button>
               </form>
            </div>
        )
    }

}

export default compose(
    graphql(getBookMutation, {name:"getBookMutation"}),
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(getBooksQuery, {name:"getBooksQuery"})

)
(Custom)