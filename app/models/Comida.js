const mongoose =  require('mongoose');

const Schema =  mongoose.Schema

const ComidaSchema =  new Schema({

	nombre:{
		type:String,
		required:true
	},
	precio:{
		type:String,
		required:true
	},	
	descripcion:{
		type:String
	},
	restaurante:{
		type:Schema.Types.ObjectId,
		ref:'restaurante'
	},
	activo:{
		type:Boolean,
		default:true,
	}
}, { collection:"comidas", timestamps:true } )

module.exports = mongoose.model('comidas',ComidaSchema);