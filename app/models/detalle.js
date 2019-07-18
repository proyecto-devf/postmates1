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
        type:Schema.Types.ObjectId,
        ref:'pedidos'        
    }
    // subtotal:{
    //     type:Number
    // },
    // activo:{
    //     type:Boolean,
    //     default:true
    // }
}, {collection:"detalles", timestamps:true});

module.exports = mongoose.model('detalle', detalleSchema);