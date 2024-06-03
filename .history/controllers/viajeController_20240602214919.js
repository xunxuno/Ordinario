const viajeModel = require('../models/viajeModel');

// Funcion asincrona para registrar un viaje
async function registrarViaje(destino, fly, cantidad, flightPrice, hotel, noches, hotelPrice){
    return await viajeModel.registrarViaje(destino, fly, cantidad, flightPrice, hotel, noches, hotelPrice);
}

module.exports = {
    registrarViaje
};