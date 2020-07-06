const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const Schema = require('./Schema/Schema');
const cors = require('cors')



const App = express();
App.use(cors());

mongoose.connect('mongodb://test123:test123@ds013916.mlab.com:13916/readinglist');
mongoose.connection.once('open', () =>{
    console.log('---> 2) Connected to the database')
})


App.listen(9200, ()=>{
    console.log('---> 1) Listening to port 9200')
})

App.use('/graphql', graphqlHTTP({
    schema:Schema,
    graphiql:true

}))