const AuthorModel =  require('../models/Author');
const RestauranteModel =  require('../models/Restaurante');
const ComidaModel = require('../models/Comida')

const lstUsuarios =  async(root,params,context,info) => {
	const lstUsuarios = await AuthorModel.find({activo:true}).populate('posts');
	
	return lstUsuarios
}

const lstRestaurante =  async(root,params,context,info) => {
	const lstRestaurante = await RestauranteModel.find({activo:true});
	
	return lstRestaurante
}

const lstComidas =  async(root,params,context,info) => {
	const lstComida = await ComidaModel.find({activo:true});
	
	return lstComida
}

const singleAuthor  =  async(root,params,context,info) => {

	const author =  await AuthorModel.findById(params.id).posts('posts');
	if (!author) throw new Error("Author no existe");

	return author.toObject();
}

module.exports = {
	lstUsuarios,
	lstRestaurante,
	singleAuthor,
	lstComidas
}