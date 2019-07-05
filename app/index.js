require('dotenv').config();

const { GraphQLServer } = require('graphql-yoga');

const {importSchema} = require('graphql-import');

const mongoose = require('mongoose');

const resolvers = require('./resolvers');

const { AuthDirective } = require('./resolvers/directives')

const typeDefs = importSchema('./app/schema.graphql');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true });

const mongo = mongoose.connection;

mongo.on('error', (error) => console.log(error))
    .once('open', () => console.log('Conexión a pase de datos'));

    
const server = new GraphQLServer({
   typeDefs,
   resolvers,
   schemaDirectives:{
    auth: AuthDirective
   }
});

server.start(() => console.log('server is working in port 4000'))
