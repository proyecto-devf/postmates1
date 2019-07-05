const RestauranteModel = require('../models/Restaurante');

const crearRestaurante = async(root, params, context, info) => {
    const NuevoRestaurante = await RestauranteModel.create(params.data)
                            .catch( e => { throw new Error("Ocurio un error")})
    if(!NuevoRestaurante) throw new Error("No se creo el restaurante");
    return NuevoRestaurante.toObject();
    
}

module.exports = {
    crearRestaurante
}