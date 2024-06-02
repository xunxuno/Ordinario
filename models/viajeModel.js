const axios = require('axios');

class Viaje {
    constructor(destino, fly, cantidad, date, hotel, noches){
        this.destino = destino;
        this.fly = fly;
        this.cantidad = cantidad;
        this.data = date;
        this.hotel = hotel;
        this.noches = noches;
    }
}

async function registrarViaje(destino, fly, cantidad, date, hotel, noches){
    try {
        const response = await axios.post('http://localhost:3002/api/registrar', {
            dataViaje: {
                destino,
                fly,
                cantidad,
                date,
                hotel,
                noches
            }
        });
        return response.data;
    } catch (error) {
        console.error('error al registrar el viaje: ', error);
        throw error;
    }
}

module.exports = {
    registrarViaje
};
