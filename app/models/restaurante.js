const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestauranteSchema = new Schema({
    nombre:{
        type:String,
    },
    telefono:{
        type:String,
    },
    correo:{
        type:String,
    },
    ubicacion:[
        {
            logintud:String,
            latitud:String
        }
    ],
    descripcion:{
        type:String
    },
    comidas:{
		type:[Schema.Types.ObjectId],
		ref:'comidas'
	},
    activo:{
        type:Boolean,
        default:true
    }    
}, {collection:'restaurante', timestamps:true});

module.exports = mongoose.model('restaurante', RestauranteSchema)