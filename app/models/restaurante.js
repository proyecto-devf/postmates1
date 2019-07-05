const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RestauranteSchema = new Schema({
    cNombre:{
        type:String,
        unique:true,
        required:true
    },
    cDescripcion:{
        type:String
    },
    lEstatus:{
        type:Boolean,
        default:true
    }    
}, {collection:'restaurante', timestamps:true});

module.exports = mongoose.model('restaurante', RestauranteSchema)