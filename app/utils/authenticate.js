const bcrypt = require('bcrypt');
const AuthorModel =  require('../models/usuarios');
const createToken =  require('./createToken');

const authenticate =  ({ correo, contrasenia }) => {
	return new Promise((resolve,reject) => {

		AuthorModel.findOne({correo}).then((user) => {
			if(!user) reject(new Error("Usuario no existe"))

			bcrypt.compare(contrasenia,user.contrasenia,(err,isValid) => {
				if(err) reject(new Error("Error al crear el Token "))
			
				isValid ? resolve(createToken(user)) : reject("contrasenia no coinciden")

			})
		}).catch(e  => reject(e) );
	})
}

module.exports =  authenticate;