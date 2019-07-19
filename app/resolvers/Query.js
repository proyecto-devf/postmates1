const AuthorModel =  require('../models/usuarios');
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
	
	return lstComida;
}

const buscarComida = async(root,params, context, info) => {

	const oComida = await ComidaModel.findById(params.id);
	if(!oComida) throw new Error("Comida no existe")

	return oComida.toObject();

	// const post = await PostModel.findById(params.id).populate('author');
	// if(!post) throw new Error("Post no existe")

	// return post.toObject();

}

module.exports = {
	lstUsuarios,
	lstRestaurante,
	lstComidas,
	buscarComida
}