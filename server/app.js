const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
const dbUri = "mongodb+srv://annknode:E4zaAKcOo0m9OYbR@cluster0.hzv7s2u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbUri);
mongoose.connection.once('open', () => {

  console.log('connected to database');
})
.on('error', (err) =>{
  console.log(err);
})

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql:true
}));
app.listen(4000,()=>{
  console.log('now listening for request on port 4000');
});



