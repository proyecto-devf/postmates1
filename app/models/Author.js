const mongoose  =  require('mongoose');
const bcrypt =  require('bcrypt');

const Schema =  mongoose.Schema;

const AuthorSchema = new Schema({
	nombre:{
		type:String,
		required:true
	},
	apellido:{
		type:String,
		required:true
	},
	correo:{
		type:String,
		required:true,
		unique:true
	},
	contrasenia:{
		type:String,
		required:true
	},
	fecha_nacimiento:{
		type:Date
	},
	genero:{
		type:String,
		enum:["H","M"]
	},
	imagen_perfil:{
		type:String
	},
	activo:{
		type:Boolean,
		default:true
	}

}, {collection:"usuario",timestamps:true} );

AuthorSchema.pre('save',function(next){
	const oUsuario =  this;
	const SALT_FACTOR =  10
	if(!oUsuario.isModified("contrasenia")) {return next()}
	bcrypt.genSalt(SALT_FACTOR,function(err,salt){
		if(err) return next(err);

		bcrypt.hash(oUsuario.contrasenia,salt,function(err,hash){
			if(err) return next(err);
			oUsuario.contrasenia =  hash;
			next();
		})
	})

});

module.exports =  mongoose.model('usuario',AuthorSchema);