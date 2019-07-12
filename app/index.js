require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const {importSchema} = require('graphql-import');
const mongoose = require('mongoose');
const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers');
const { AuthDirective } = require('./resolvers/directives')
const typeDefs = importSchema(__dirname + '/schema.graphql');
const verifyToken =  require('./utils/verifyToken');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser : true });

const mongo = mongoose.connection;

mongo.on('error', (error) => console.log(error))
    .once('open', () => console.log('Conexión establecida'));

const schema =  makeExecutableSchema({
        typeDefs,
        resolvers,
        schemaDirectives:{
            auth:AuthDirective
        }
})

const server = new GraphQLServer({
    schema,
	context: async({request}) => verifyToken(request) 
});


server.start(() => console.log('server is working in port 4000'))

module.exports = { schema };
