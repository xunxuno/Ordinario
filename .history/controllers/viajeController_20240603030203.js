const viajeModel = require('../models/viajeModel');

// Funcion asincrona para registrar un viaje
async function registrarViaje(userId, destino, fly, cantidad, flightPrice, date, hotel, noches, hotelPrice){
    return await viajeModel.registrarViaje(userId, destino, fly, cantidad, flightPrice, date, hotel, noches, hotelPrice);
}

async function historial(userId) {
    return await viajeModel.historialVuelos(userId);
}

module.exports = {
    registrarViaje,
    historial
};