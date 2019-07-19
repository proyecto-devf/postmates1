const AuthorModel =  require('../models/usuarios');
const RestauranteModel = require('../models/Restaurante');
const PedidoModel = require('../models/pedido');
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

	const oNuevoRestaurante = await RestauranteModel.create(params.data)
							.catch( e => { console.log(e.message) })
	if(!oNuevoRestaurante) throw new Error("No se creo el 'author'");
	return oNuevoRestaurante.toObject();
}

//Crear comida
const crearComida = async(root,params,context,info) =>{

	console.log(params.data);

	if(params.data.cover_photo){
		console.log("si hay foto")
		const { createReadStream } = await params.data.cover_photo;
		const stream =  createReadStream();
		const { url } =  await storage({ stream });
		console.log(url);
		params.data.cover_photo = url;
	} 

	const oComida = await ComidaModel.create(params.data)
								.catch( e => {throw new Error("Error al crear comida")} )

	const lstComidas = await ComidaModel.findOne({_id:oComida._id}).populate('restaurante');

	await RestauranteModel.findByIdAndUpdate(oComida.restaurante,{$push:{comidas:lstComidas}})

	 return oComida.toObject();
}

//Crear  pedido
const crearPedido = async(root,params,context,info) =>{
 
	console.log(params.data);
	
	const pedido = await PedidoModel.create(params.data)
								.catch( e => { console.log(e.message)});
	
	if(!pedido) throw new Error("No se creo el pedido");

	// const newAuthor =  await AuthorModel.create(params.data)
	// 						.catch( e => {throw new Error("Ocurrio un problema") } )
	// if(!newAuthor) throw new Error("No se creo el 'author'");
	// return newAuthor.toObject();

	return pedido.toObject();;
}

//Actualizar comida
const actualizarComida = async(root,params,context,info) => {
	const {data} = params;
	const actualizaComida = await ComidaModel.findOneAndUpdate({_id:data._id},{$set:{...data}},{new:true})

	return actualizaComida.toObject();
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

//Eliminar comida
const eliminaComida = async(root,params,context,info) => {

	const {data} = params;
	console.log(data);
	await ComidaModel.findOneAndUpdate({_id:data},{$set:{activo:false}})

	return "comida eliminado"
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
	crearComida,
	actualizarComida,
	eliminaComida,
	crearPedido
}