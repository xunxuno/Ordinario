const axios = require('axios');

class Viaje {
    constructor(userId, destino, fly, cantidad, flightPrice, date, hotel, noches, hotelPrice){
        this.userId = userId;
        this.destino = destino;
        this.fly = fly;
        this.cantidad = cantidad;
        this.flightPrice = flightPrice;
        this.date = date;
        this.data = date;
        this.hotel = hotel;
        this.noches = noches;
        this.hotelPrice = hotelPrice;
    }
}

async function registrarViaje(userId, destino, fly, cantidad, flightPrice, date, hotel, noches, hotelPrice){
    try {
        const response = await axios.post('http://localhost:3002/api/registrarVuelo', {
            dataViaje: {
                userId,
                destino,
                fly,
                cantidad,
                flightPrice,
                date,
                hotel,
                noches,
                hotelPrice
            }
        });
        return response.data;
    } catch (error) {
        console.error('error al registrar el viaje: ', error);
        throw error;
    }
}
async function historialVuelos(userId){
    try {
        const response = await axios.get(`http://localhost:3002/api/historial/${userId}`);
        console.log('Respuesta de la API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el historial', error);
        throw error;
    }
}

async function registrarEquipaje(userId, id_vuelo, elemento, cantidad){
    try {
        const response = await axios.post('http://localhost:3002/api/equipaje',{
            dataEquipaje:{
                userId,
                id_vuelo,
                elemento,
                cantidad
            }
        });
        return response.data;
    } catch (error) {
        console.error('error al registrar el equipaje: ', error);
        throw error;
    }
}

async function ObtenerEquipaje(vueloId){
    try {
        const response = await axios.get(`http://localhost:3002/api/equipajeHistorial/${vueloId}`);
        console.log('Respuesta de la API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el equipaje', error);
        throw error;
    }
}

async function registrarGastos(userId, vueloId, concepto, precio) {
    try {
        const response = await axios.post('http://localhost:3002/api/registrar-gasto',{
            dataGasto:{
                userId,
                vueloId,
                concepto,
                precio
            }
        });
        return response.data;
    } catch (error) {
        console.error('error al registrar el gasto: ', error);
        throw error;
    }
}

async function ObtenerGastos(vueloId){
    try {
        const response = await axios.get(`http://localhost:3002/api/gastos-historial/${vueloId}`);
        console.log('Respuesta de la API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el gasto', error);
        throw error;
    }
}

async function registrarActividad(idUbicacion, vueloId) {
    try {
        const response = await axios.post('http://localhost:3002/api/registrar-gasto',{
            dataActividad:{
                idUbicacion,
                vueloId
            }
        });
        return response.data;
    } catch (error) {
        console.error('error al registrar la actividad: ', error);
        throw error;
    }
}

async function ObtenerActividad(vueloId){
    try {
        const response = await axios.get(`http://localhost:3002/api/historial-actividad/${vueloId}`);
        console.log('Respuesta de la API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener actividades', error);
        throw error;
    }
}

async function obtenerResumenVuelo(vueloId){
    try {
        const response = await axios.get(`http://localhost:3002/api/resumen/${vueloId}`);
        console.log('Respuesta de la API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener Resumen', error);
        throw error;
    }
}
async function obtenerviajePorId(vueloId){
    try {
        const response = await axios.get(`http://localhost:3002/api/resumen/${vueloId}`);
        console.log('Respuesta de la API:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el viaje', error);
        throw error;
    }
}


module.exports = {
    registrarViaje,
    historialVuelos,
    registrarEquipaje,
    ObtenerEquipaje,
    registrarGastos,
    ObtenerGastos,
    registrarActividad,
    ObtenerActividad,
    obtenerResumenVuelo,
    obtenerviajePorId

};
