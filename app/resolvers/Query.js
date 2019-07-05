const RestauranteModel = require('../models/Restaurante');

//El nombre  listaRestaurantes debe ser igual al delfinido al esquema
const listaRestaurantes = async(root, params, context, info) => {
    const restaurante = await RestauranteModel.find({})

    return restaurante;
}

module.exports = {
    listaRestaurantes
}