import {gql} from 'apollo-boost';

const getBooksQuery = gql`{
    BooksQuery{
    id
    title
    genre
    
    author{
      id  
      name
      age
      book {
        title
        genre
        id
      }
    }
    
  }
  }
`

const getBookMutation = gql`
    mutation ($title:String!, $genre:String!, $authorId:ID!){
      BookMutation(
        title: $title,
        genre:$genre,
        authorId:$authorId
      ){
        id
        title
        genre
      }
    }
`

const getAuthorsQuery = gql`
    {
  AuthorsQuery{
    name
    age
    id
  }
}
`

// const getAuthorMutation = gql`
//     mutation {
//   AuthorMutation(name:"", age:""){
//     name
//     age
//   }
// }
// `
const getAuthorMutation = gql`
    mutation ($name:String!, $age:String!){
  AuthorMutation(name:$name, age:$age){
    name
    age
  }
}
`

const getDeleteAuthor = gql`
    mutation ($id:ID!){
  DeleteAuthor(id:$id){
    name
    age
  }
}
`

const getDeleteBook = gql`
    mutation ($id:ID!){
  DeleteBook(id:$id){               
    title
  }
}

`
const getUpdateBook = gql`
    mutation (
        $id:ID!,
        $title:String!,
        $genre:String!,
        $authorId:ID!
    )
             {UpdateBook 
                    (id:$id,
                    title:$title, 
                    genre:$genre, 
                    authorId:$authorId){
                            title
        }
    }
`

export {getBooksQuery, getBookMutation, getAuthorsQuery, getAuthorMutation, getDeleteAuthor, getDeleteBook, getUpdateBook}