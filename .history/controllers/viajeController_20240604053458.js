const viajeModel = require('../models/viajeModel');

// Funcion asincrona para registrar un viaje
async function registrarViaje(userId, destino, fly, cantidad, flightPrice, date, hotel, noches, hotelPrice){
    return await viajeModel.registrarViaje(userId, destino, fly, cantidad, flightPrice, date, hotel, noches, hotelPrice);
}

async function historial(userId) {
    return await viajeModel.historialVuelos(userId);
}

async function registrarEquipaje(userId, id_vuelo, elemento, cantidad){
    return await viajeModel.registrarEquipaje(userId, id_vuelo, elemento, cantidad);
}

async function ObtenerEquipaje(vueloId) {
    return await viajeModel.ObtenerEquipaje(vueloId);
}

async function registrarGastos(userId, vueloId, concepto, precio){
    return await viajeModel.registrarGastos(userId, vueloId, concepto, precio);
}
  

module.exports = {
    registrarViaje,
    historial,
    registrarEquipaje,
    ObtenerEquipaje,
    registrarGastos
};