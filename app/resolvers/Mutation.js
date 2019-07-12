const AuthorModel =  require('../models/Author');
const RestauranteModel = require('../models/Restaurante');
const ComidaModel = require('../models/Comida')
const authenticate =  require('../utils/authenticate');
const storage =  require('../utils/storage');

//Crea usuarios
const crearUsuario =  async(root,params,context,info) => {
	console.log(params.data);
	const newAuthor =  await AuthorModel.create(params.data)
							.catch( e => { console.log(e.message) } )
	if(!newAuthor) throw new Error("No se creo el 'author'");
	return newAuthor.toObject();
}

//Crea restaurantes
const crearRestaurante = async(root,params,context,info) => {

	console.log(params.data);
	const oNuevoRestaurante = await RestauranteModel.create(params.data)
							.catch( e => { console.log(e.message) })
	if(!oNuevoRestaurante) throw new Error("No se creo el 'author'");
	return oNuevoRestaurante.toObject();
}

//Crear comida
const crearComida = async(root,params,context,info) =>{

	console.log(params);
	const oComida = await ComidaModel.create(params.data)
								.catch( e => {throw new Error("Error al crear comida")} )

	//const nuevaComida = await RestauranteModel.findOne({_id:oComida._id}).populate('restaurante');
	//await AuthorModel.findByIdAndUpdate(user.id,{$push:{posts:post}})
	 return oComida.toObject();
}

//Actualiza restaurantes
const actualizarRestaurante = async(root,params,context,info) => {
	const {data} = params;
	const actualizaRestaurante = await RestauranteModel.findOneAndUpdate({_id:data._id},{$set:{...data}},{new:true})

	return actualizaRestaurante.toObject();
}

//Elimina restaurante
const eliminaRestaurante = async(root,params,context,info) => {

	const {data} = params;
	console.log(data);
	await PostModel.findOneAndUpdate({_id:data},{$set:{activo:false}})

	return "restaurante eliminado"
}


//inicia sesión usuario
const login =  async(root,params,context,info) => {
	const token =  await authenticate(params).catch( e => { throw e } )
	return {
		token,
		message:"Ok"
	}
}

module.exports = {
	crearUsuario,
	login,
	crearRestaurante,
	actualizarRestaurante,
	eliminaRestaurante,
	crearComida
}