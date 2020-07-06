import React, {Component}from 'react';
import {getUpdateBook, getAuthorsQuery, getBooksQuery} from "../Queries/Queries";
import {flowRight as compose} from 'lodash'
import {graphql} from "react-apollo/lib/index";

class UpdateBook extends Component{

    constructor(){
        super();
        this.state ={
            id:'',
            title:'',
            genre:'',
            authorId:'',
            message:'',
            titleTest:true,
            genreTest:true,
            arrow:false,
            arrowBook:false,
            text:'Select author',
            textBook:'Select book'

        }
    }

    displayBooks(){
        const {BooksQuery} = this.props.getBooksQuery;
        if(BooksQuery){
            return(
                BooksQuery.map(item =>{
                    return(
                        <div key={item.id} className='eachBook'
                             onClick={()=>this.setState({
                                 textBook:item.title, arrowBook:false, id:item.id
                             })}>
                            {item.title}
                        </div>
                    )
                })
            )
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

    arrowDirection(){
        this.setState({
            arrow:!this.state.arrow
        })
    }
    arrowDirectionBook(){
        this.setState({
            arrowBook:!this.state.arrowBook
        })
    }
    authorAvailable(){
        const {AuthorsQuery} = this.props.getAuthorsQuery;
        if (AuthorsQuery){
            return(AuthorsQuery.length)
        }
    }
    bookAvailable(){
        const {BooksQuery} = this.props.getBooksQuery;
        if (BooksQuery){
            return(BooksQuery.length)
        }
    }

    updateForm(e){
        e.preventDefault();
        const {title, genre, authorId, message,id,
            titleTest, genreTest} = this.state;

        if(title ==='')
        {
            this.setState({message:'Please enter the title of the book' })
        } else if
        (genre ===''){
            this.setState({message:'Please enter the genre of the book' })
        } else if
        (authorId ===''||authorId ==='Select author'){
            this.setState({message:'Please select an author' })
        }
        else if
        (id ==='' || id ==='Select book'){
            this.setState({message:'Please select a book' })
        }
        else if
        (!titleTest) {
            this.setState({message:'Please follow title requirements'})
        }
        else if
        (!genreTest) {
            this.setState({message:'Please follow genre requirements'})
        }

        else

        {this.props.getUpdateBook(
            {
                variables:{
                    id:this.state.id,
                    title:this.state.title,
                    genre:this.state.genre,
                    authorId:this.state.authorId
                },
                refetchQueries:[{query:getBooksQuery}]
            }
        );
            this.onRefresh.reset()
            this.setState({message:'',title:'', genre:'', authorId:'', id:'', text:'Select author', textBook:'Select book', })
        };

    }

    forceArrowUp(){
        if(this.state.arrow){
            this.setState({arrow:!this.state.arrow})
        }
        if(this.state.arrowBook){
            this.setState({arrowBook:!this.state.arrowBook})
        }
    }

    render() {

        const{titleMessage, message, titleTest,genreTest, text, arrow, textBook, arrowBook}=this.state

        return(
            <div onClick={()=>{this.forceArrowUp()}}>
                <h1>Update Book</h1>
                <div>
                    <form ref={ input => this.onRefresh =input} onSubmit={(e) =>{this.updateForm(e)}}>
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
                                <div className='text' >{this.authorAvailable()===0 ? 'Empty Author List' : text}</div>
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
                        <div className='selectBook'>
                            <div className='arrowContainerBook'>
                                <div className='textBook'>{this.bookAvailable()===0 ? 'Empty Book List': textBook}</div>
                                <div className='arrowBook' onClick={()=>this.arrowDirectionBook()}>
                                    <span className={arrowBook ? 'arrowUpBook' : 'arrowDownBook'}/>
                                </div>
                            </div>
                            { this.bookAvailable()!==0
                                    &&
                                <div style={{display:arrowBook ? 'block' : 'none'}} className='bookTitle'>
                                {this.displayBooks()}
                            </div>}

                        </div>
                        <div className='updateBook'>
                            <button> Update Book</button>
                        </div>
                        <div className='finalMessageBook'>
                            { this.state.message !=='' && <p>{this.state.message}</p>}
                        </div>

                    </form>
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(getUpdateBook, {name:"getUpdateBook"}),
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(getBooksQuery, {name:"getBooksQuery"})

)(UpdateBook)