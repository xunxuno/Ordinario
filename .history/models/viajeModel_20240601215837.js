const axios = require('axios');

class Viaje {
    constructor(destino, fly, hotel){
        this.destino = destino;
        this.fly = fly;
        this.hotel = hotel;
    }
}

async function registrarViaje(destino, fly, hotel){
    try {
        const response = await axios.post('http://localhost:3002/api/registrar', {
            dataViaje: {
                destino,
                fly,
                hotel
            }
        });
        return response.data;
    } catch (error) {
        console.error('error al registrar el viaje: ', error);
        throw error;
    }
}