const axios = require('axios');

class Viaje {
    constructor(destino, fly, cantidad, date, hotel){
        this.destino = destino;
        this.fly = fly;
        this.cantidad = cantidad;
        this.data = date;
        this.hotel = hotel;
    }
}

async function registrarViaje(destino, fly, cantidad, date, hotel){
    try {
        const response = await axios.post('http://localhost:3002/api/registrar', {
            dataViaje: {
                destino,
                fly,
                cantidad,
                date,
                hotel
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
