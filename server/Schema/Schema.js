const graphql = require('graphql')
const Book = require('../Models/Book')
const Author = require('../Models/Author')

const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLSchema,


} = graphql;

const BookType = new GraphQLObjectType({
    name:'BookObject',
    fields: () =>({
        id:{type:GraphQLID},
        title:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId)
            }
        }

    })
})

const AuthorType = new GraphQLObjectType({
    name:'AuthorObject',
    fields: () =>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLString},
        book:{
            type:new GraphQLList(BookType),
            resolve(parent, args){
                return Book.find({authorId:parent.id})
            }
        }

    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        BooksQuery: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({})
            }
        },
        AuthorsQuery: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({})
            }
        },
        BookQuery: {
            type: BookType,
            args: {
                id: {type: GraphQLID}
            },
            resolve(parents, args) {
                return Book.findById(args.id)
            }
        },
        AuthorQuery:{
            type:AuthorType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent, args){
                return Author.findById(args.id)
            }
        }




    }
})

const Mutation =  new GraphQLObjectType({
    name:'Mutation',
    fields:{
        BookMutation:{
            type:BookType,
            args:{
                title:{type: new GraphQLNonNull(GraphQLString)},
                genre:{type: new GraphQLNonNull(GraphQLString)},
                authorId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    title:args.title,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save()
            }
        },

        UpdateBook:{
            type:BookType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)},
                title:{type: new GraphQLNonNull(GraphQLString)},
                genre:{type: new GraphQLNonNull(GraphQLString)},
                authorId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                return Book.findByIdAndUpdate(
                    args.id,
                    {
                        title:args.title,
                        genre:args.genre,
                        authorId:args.authorId
                    },
                    {new:true}
                ).catch(err => console.error(err))
            }
        },

        UpdateAuthor:{
            type:AuthorType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLID)},
                name:{type: new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                return Author.findByIdAndUpdate(
                    args.id,
                    {
                        name:args.name,
                        age:args.age
                    },
                    {new:true}
                ).catch(err => console.error(err))
            }
        },

        DeleteBook:{
            type:BookType,
            args:{id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return Book.findByIdAndDelete(args.id)
            }
        },
        DeleteAuthor:{
            type:AuthorType,
            args:{id: {type: new GraphQLNonNull(GraphQLID)}},
            resolve(parent, args){
                return Author.findByIdAndDelete(args.id)
            }
        },

        AuthorMutation:{
            type:AuthorType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let author = new Author({
                    name:args.name,
                    age:args.age,
                });
                return author.save()
            }
        },




    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})