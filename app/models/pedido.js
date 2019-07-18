const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PedidoSchema = new Schema ({
    total:{
        type:String,
        required:true
    },
    cliente:{
        type:String,
        required:true
    },
    direccion_entrega:{
        type:String
    },
    coordenadas:[{
        longitud:{
            type:Number
        },
        latitud:{
            type:Number
        },
    }],
    fecha_registro:{
        type:String
    },
    detalle:[
       {
           comida:{
               type:String
           },
           cantidad:{
               type:String
           }
       }
    ]
}, {collection:'pedidos',timestamps:true});

module.exports = mongoose.model("pedido", PedidoSchema);