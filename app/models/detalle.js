const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detalleSchema = new Schema ({
    comida:{
        type:String
    },
    cantidad:{
        type:String
    },
    pedidos:{
        type:[Schema.Types.ObjectId],
        ref:'pedidoss'        
    },
    subtotal:{
        type:Number
    },
    is_active:{
        type:Boolean,
        default:true
    }
}, {collection:"detalles", timestamps:true});

module.exports = mongoose.model('detalle', detalleSchema);