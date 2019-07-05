const { GraphQLServer } =  require('graphql-yoga');



const typeDefs = `

	type Query{
		prueba:String!,
		saludo(texto:String!):String!
	}
`

const resolvers = {
	Query:{
		prueba: () => "Hola desde graphql",
		saludo: (_,{texto}) => `Hola ${texto}`
	}
}

const server =  new GraphQLServer({typeDefs,resolvers})

server.start(() => console.log("Server is working in port 4000"));