const viajeModel = require('../models/viajeModel');

// Funcion asincrona para registrar un viaje
async function registrarViaje(idUsuario, destino, fly, cantidad, flightPrice, date, hotel, noches, hotelPrice){
    return await viajeModel.registrarViaje(idUsuario, destino, fly, cantidad, flightPrice, date, hotel, noches, hotelPrice);
}

module.exports = {
    registrarViaje
};