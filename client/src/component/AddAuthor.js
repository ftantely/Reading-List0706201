import React, {Component}from 'react';
import {graphql} from 'react-apollo'
import {getAuthorMutation, getAuthorsQuery} from "../Queries/Queries";
import {flowRight as compose} from 'lodash'



class AddAuthor extends Component{

    constructor(){
        super();
        this.state ={
            name:"",
            age:"",
            nameTest:true,
            ageTest:true
        }
    }

    // --------> Logic for name
    onName(e){
        this.setState({name:e.target.value})
        //------> RegExt test
        const rules = /^[A-Z][\w\s'-]{2,18}$/
        const confirm = rules.test(e.target.value)
        this.setState({nameTest:confirm})
    }
    // --------> Logic for Age
    onAge(e){
        this.setState({age:e.target.value})
        //------> RegExt test
        const rules = /^0*([5-9]|[1-8][0-9]|9[0-9]|10[0-9]|11[0-5])$/
        const confirm = rules.test(e.target.value)
        this.setState({ageTest:confirm})
    }

    addAuthor(e){
        e.preventDefault()
        const{nameTest, ageTest, name, age} =this.state;
        const duplicate = this.props.getAuthorsQuery.AuthorsQuery.map(item =>item.name).includes(name);

        if(name ==='')
        {
            this.setState({message:'Please enter the name of the author' })
        } else if
        (age ===''){
            this.setState({message:'Please enter the age of the author' })
        } else if
        (!nameTest){
            this.setState({message:"Please follow the name requirements." })
        }

        else if
        (!ageTest){
            this.setState({message:"Please follow the age requirements"})
        }

        else if
        (duplicate){
            this.setState({message:'This author is already on the list'})
        }
        else{
            this.props.getAuthorMutation({
                variables:{
                    name:this.state.name,
                    age:this.state.age
                },
                refetchQueries:[{query:getAuthorsQuery}]
            });
            this.onRefresh.reset()
            this.setState({message:"",name:'', age:''})
        };

    }

    render(){
        const{nameTest, ageTest}=this.state
        return(
            <div >
                <h1>Add author</h1>
                <div className='add-author'>
                    <form ref={input =>this.onRefresh=input} onSubmit={(e) => {this.addAuthor(e)}}>
                        <div className='name'>
                            <input type='text' onChange={(e)=>this.onName(e)} />
                            <p className={nameTest ? 'namePass' : 'nameFail'}>Must start with 1 uppercase letter.
                                At least 3 characters.No more than 20 characters</p>
                        </div>

                        <div className='Age_'>
                            <input type='text'  onChange={(e)=>{this.onAge(e)} }/>
                            <p className={ageTest ? 'agePass' : 'ageFail'}>Must be a number between 5 and 115</p>
                        </div>
                        <div className='addAuthor'>
                            <button> Add author</button>
                        </div>
                        <div className='finalMessageAuthor'>
                            { this.state.message !=='' && <p>{this.state.message}</p>}
                        </div>

                    </form>
                </div>
            </div>
        )
    }

}

export default compose(
    graphql(getAuthorsQuery, {name:"getAuthorsQuery"}),
    graphql(getAuthorMutation, {name:"getAuthorMutation"})) (AddAuthor)