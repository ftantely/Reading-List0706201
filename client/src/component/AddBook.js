import React, {Component}from 'react';
import {graphql} from 'react-apollo'
import {getAuthorsQuery, getBookMutation, getBooksQuery} from "../Queries/Queries";
import {flowRight as compose} from 'lodash'

class AddBook extends Component{

    constructor(){
        super();
        this.state ={
            title:'',
            genre:'',
            authorId:'',
            message:"",
            titleTest:true,
            genreTest:true,
            arrow:false,
            text:'Select Author'
        }
    }
    // --------> Logic for title
    onTitle(e){
        this.setState({title:e.target.value})
        //------> RegExt test
        const rules = /^[A-Z1-9][\w\s'-]{2,35}[?]?$/
        const confirm = rules.test(e.target.value)
        this.setState({titleTest:confirm})
    }
    // --------> Logic for genre
    onGenre(e){
        this.setState({genre:e.target.value})
        //------> RegExt test
        const rules = /^[A-Z][\w\s-]{3,20}$/
        const confirm = rules.test(e.target.value)
        this.setState({genreTest:confirm})
    }

    addBook(e){
        e.preventDefault();
        const {title, genre, authorId, message,
            titleTest, genreTest} = this.state;
        const duplicate = this.props.getBooksQuery.BooksQuery.map(item =>item.title).includes(title);

        if(title ==='')
        {
            this.setState({message:'Please enter the title of the book' })
        } else if
        (genre ===''){
            this.setState({message:'Please enter the genre of the book' })
        } else if
        (authorId ==='' || authorId ==='Select author'){
            this.setState({message:'Please select an author' })
        }
        else if
        (!titleTest){
            this.setState({message:"Please follow the title requirements"})
        }

        else if
        (!genreTest){
            this.setState({message:"Please follow the genre requirements"})
        }

        else if
        (duplicate){
            this.setState({message:'This book is already on the list'})
        }
        else
            {
                this.props.getBookMutation({
            variables:{
                title:this.state.title,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries:[{query:getBooksQuery}]

        });
             this.onRefresh.reset()
             this.setState({message:"", title:'', genre:'', text:'Select author', authorId:''})
            };

    }

    authorAvailable(){
        const {AuthorsQuery} = this.props.getAuthorsQuery;
        if (AuthorsQuery){
            return(AuthorsQuery.length)
        }
    }


    displayAuthors(){
        const {AuthorsQuery} = this.props.getAuthorsQuery;
        if (AuthorsQuery){
            return(
                AuthorsQuery.map(item =>{
                    return(
                        <div key={item.id}  onClick={()=>{this.setState({
                            text:item.name, arrow:false, authorId:item.id})}}
                             className='eachAuthor'
                        >
                            {item.name}
                        </div>
                    )
                })
            )
        }else {
            return <option>Loading authors...</option>
        }
    }

    arrowDirection(){
        this.setState({
            arrow:!this.state.arrow
        })
    }

    forceArrowUp(){
        if(this.state.arrow){
            this.setState({arrow:!this.state.arrow})
        }
    }

    render(){

        const{ titleTest,genreTest,arrow, text, title}=this.state
        return(

            <div onClick={()=>{this.forceArrowUp()}}>
                <h1>Add Book</h1>
               <div>

                   <form  ref={ input => this.onRefresh =input} onSubmit={(e) =>{this.addBook(e)}} >
                      <div>
                          <input className={titleTest ? 'InputPass' : 'InputFail'} type='text' placeholder='Title'  onChange={(e)=>{this.onTitle(e)}}/>
                          <p className={titleTest ? 'TitlePass' : 'TitleFail'}>Must start with 1 uppercase letter or 1 number.
                              At least 3 characters.Not more than 36 characters
                          </p>
                      </div>
                       <div>
                          <input className={genreTest ? 'InputPass' : 'InputFail'} type='text' placeholder='Genre' onChange={(e)=>this.onGenre(e)}/>
                          <p className={genreTest ? 'GenrePass' : 'GenreFail'}>Must start with 1 uppercase letter.
                               At least 4 characters. No more than 21 characters</p>
                      </div>
                       <div className='selectAuthor'>
                           <div className='arrowContainer'>
                               <div className='text'>{ this.authorAvailable() ===0? 'Empty Author List' : text}</div>
                               <div className='arrow' onClick={()=>this.arrowDirection()}>
                                   <span className={arrow ? 'arrowUp' : 'arrowDown'}/>
                               </div>
                           </div>
                           { this.authorAvailable()!==0
                                          &&
                               <div style={{display:arrow ? 'block' : 'none'}} className='authorName'>
                               {this.displayAuthors()}
                           </div>}
                      </div>
                       <div className='addBookButton'>
                           <button>Add Book</button>
                       </div>
                       <div className='finalMessage'>
                           { this.state.message !=='' && <p>{this.state.message}</p>}
                       </div>
                   </form>
               </div>
            </div>
        )
    }

}



export default compose(
    graphql(getBookMutation, {name:"getBookMutation"}),
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(getBooksQuery, {name:"getBooksQuery"})

)
(AddBook)