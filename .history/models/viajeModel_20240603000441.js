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
    const token = req.cookies.token;
    try {
        const response = await axios.post('http://localhost:3002/api/registrarVuelo', {
            dataViaje: {
                token,
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

module.exports = {
    registrarViaje
};
