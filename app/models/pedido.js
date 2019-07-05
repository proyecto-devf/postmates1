const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema ({

    total:{
        type:Number,
        required:true
    },

    restaurante:{
        type:String
    },

    cliente:{
        type:String,
        required:true
    },

    direccion_entrega:{
        type:String
    },
    longitud:{
        type:Number
    },
    latitud:{
        type:Number
    },
    fecha_registro:{
        type:String
    },

    detalle:{
        type:[Schema.Types.ObjectId],
        ref:'detalles'        
    }
}, {collection:'pedidos',timestamps:true});

PedidoSchema.pre()