document.addEventListener('DOMContentLoaded', () => {
    let currentFlightPrice = 0;
    let currentHotelPrice = 0;
    const hotelesPorDestino = {
        "Barcelona": [
            { nombre: "Catalonia Park Guell", price: 1600  },
            { nombre: "Barcelona Princess", price: 4000  },
            { nombre: "Barcelo Sants", price: 2500  },
            { nombre: "Hotel Market", price: 1899 }
        ],
        "Queenstown": [
            { nombre: "Holiday Inn Queenstown Remarkables Park", price: 2300 },
            { nombre: "Heartland Hotel Queenstown", price: 2400 },
            { nombre: "Hurley's of Queenstown",price: 1800 },
            { nombre: "Rydges Lakeland Resort Queenstown", price: 2200 }
        ],
        "Estambul": [
            { nombre: "Motto By Mula Hotel", price: 2400 },
            { nombre: "The Ritz-Carlton", price: 6700 },
            { nombre: "İstiklal hostel istanbul", price: 300 },
            { nombre: "erciyes suites", price: 400 }
        ],
        "París": [
            { nombre: "Nouvel Hôtel Eiffel", price: 1800 },
            { nombre: "Atala powered by Sonder", price: 5200 },
            { nombre: "Hotel Armoni Paris", price: 2090 },
            { nombre: "Sonder Le Frochot", price: 2300 }
        ],
        "San Francisco": [
            { nombre: "Yotel San Francisco", price: 1900 },
            { nombre: "Hilton San Francisco Union Square", price: 2100 },
            { nombre: "Riu Plaza Fisherman's Wharf", price: 4400 },
            { nombre: "The St. Regis San Francisco", price: 7600 }
        ],
        "Singapur": [
            { nombre: "Hotel 81 Palace", price: 860 },
            { nombre: "The Serangoon House", price: 1700 },
            { nombre: "Hotel Mi Bencoolen", price: 1690 },
            { nombre: "Resorts World Sentosa - Hotel Ora",price: 3800 }
        ],
        "Seúl": [
            { nombre: "Hotel 8 Hours", price: 3200 },
            { nombre: "OYO Hostel Myeongdong 5", price: 1100 },
            { nombre: "LOTTE City Hotel Gimpo Airport", price: 1800 },
            { nombre: "Four Points by Sheraton Josun", price: 1750 }
        ],
        "Kyoto": [
            { nombre: "KABIN Machi",price: 2600 },
            { nombre: "The OneFive Kyoto Shijo", price: 621 },
            { nombre: "Comfort Hotel Kyoto Horikawagojo", price: 1009 },
            { nombre: "HOTEL MYSTAYS Kyoto Shijo",price: 957 }
        ],
        "Londres": [
            { nombre: "YOTEL London ShoreditchS", price: 3200 },
            { nombre: "Sonder Camden Road", price: 3200 },
            { nombre: "Central London Luxury Studios", price: 1007 },
            { nombre: "ME London by Melia - Covent Garden", price: 11160 }
        ],
        
    };

    // vuelos
    const flightPrices = {
        "Barcelona": {
            "turista": 16000,
            "turistaSuperior": 28000,
            "business": 44000,
            "primeraClase": 119305
        },
        "Queenstown": {
            "turista": 20000,
            "turistaSuperior": 31000,
            "business": 56000,
            "primeraClase": 130000
        },
        "Estambul": {
            "turista": 12000,
            "turistaSuperior": 25000,
            "business": 39000,
            "primeraClase": 84000
        },
        "París": {
            "turista": 29000,
            "turistaSuperior": 44000,
            "business": 78000,
            "primeraClase": 106000
        },
        "San Francisco": {
            "turista": 6200,
            "turistaSuperior": 7400,
            "business": 15000,
            "primeraClase": 21000
        },
        "Singapur": {
            "turista": 44000,
            "turistaSuperior": 61000,
            "business": 90000,
            "primeraClase": 148000
        },
        "Seúl": {
            "turista": 41000,
            "turistaSuperior": 59000,
            "business": 80000,
            "primeraClase": 115000
        },
        "Kyoto": {
            "turista": 55000,
            "turistaSuperior": 60000,
            "business": 96000,
            "primeraClase": 135000
        },
        "Londres": {
            "turista": 18000,
            "turistaSuperior": 32000,
            "business": 55000,
            "primeraClase": 104000
        }
    };

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides-container');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        const offset = -index * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        currentSlide = index;
    }

    function nextSlide() {
        const activeSlide = slides[currentSlide];
        const requiredFields = activeSlide.querySelectorAll('[required]');
        let isSlideValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isSlideValid = false;
                field.classList.add('invalid');
            } else {
                field.classList.remove('invalid');
            }
        });

        if (isSlideValid) {
            if (currentSlide < slides.length - 1) {
                showSlide(currentSlide + 1);
            }
        } else {
            alert('Por favor, completa todos los campos obligatorios antes de continuar.');
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }
    }

    // Función para actualizar los precios de los vuelos según la selección
    function updateFlightPrices() {
        const destination = document.getElementById('destino').value;
        const flightClass = document.querySelector('input[name="fly"]:checked');
        const cantidad = document.getElementById('cantidad').value;
    
        if (destination && flightClass && cantidad) {
            const flightPrice = flightPrices[destination][flightClass.value];
            const totalPrice = flightPrice * cantidad;
    
            // Mostrar el precio total del vuelo en algún elemento HTML, por ejemplo:
            const flightPriceElement = document.getElementById('flightPrice');
            flightPriceElement.textContent = `$${totalPrice} MXN`;
            currentFlightPrice = totalPrice;
            flightPriceElement.style.display = 'inline'; // Mostrar el precio solo si se seleccionó la cantidad
        } else {
            const flightPriceElement = document.getElementById('flightPrice');
            flightPriceElement.style.display = 'none'; // Ocultar el precio si la cantidad no se ha seleccionado
        }
    }
    
    

    function updateHotelOptions() {
        const destination = document.getElementById('destino').value;
        const hotelsContainer = document.getElementById('hotelesContainer');
        hotelsContainer.innerHTML = '';

        if (hotelesPorDestino[destination]) {
            hotelesPorDestino[destination].forEach(hotel => {
                const label = document.createElement('label');
                label.setAttribute('for', hotel.nombre);
                label.innerText = `${hotel.nombre} - $${hotel.price} MXN por noche`;

                const input = document.createElement('input');
                input.type = 'radio';
                input.id = hotel.nombre;
                input.name = 'hotel';
                input.value = hotel.nombre;
                input.setAttribute('data-price', hotel.price);
                input.required = true;

                hotelsContainer.appendChild(label);
                hotelsContainer.appendChild(input);
                hotelsContainer.appendChild(document.createElement('br'));
            });

            // Agregar event listeners después de crear los elementos
            document.querySelectorAll('input[name="hotel"]').forEach(radio => {
                radio.addEventListener('change', updateHotelPrices);
            });
        }
    }
    // Función para actualizar los precios del hotel según la selección
    function updateHotelPrices() {
    const selectedHotel = document.querySelector('input[name="hotel"]:checked');
    const noches = parseInt(document.getElementById('noches').value);

    if (selectedHotel && noches >= 1) {
        const hotelPrice = parseInt(selectedHotel.getAttribute('data-price'));
        const totalPrice = hotelPrice * noches;
        currentHotelPrice = totalPrice;

        const hotelPriceElement = document.getElementById('hotelPrice');
        hotelPriceElement.textContent = `$${totalPrice} MXN`;
        hotelPriceElement.style.display = 'inline';
    } else {
        currentHotelPrice = 0; // Establece el precio del hotel en 0 si no se ha seleccionado ningún hotel o no se ha especificado la cantidad de noches
        const hotelPriceElement = document.getElementById('hotelPrice');
        hotelPriceElement.style.display = 'none';
    }
}

    
    // mandar formulario
// mandar formulario
// En el evento de click del botón de envío
document.getElementById('multiStepForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Actualizar los precios del vuelo y del hotel antes de enviar el formulario
    updateFlightPrices();
    updateHotelPrices();

    // Crear el objeto data con los valores actualizados
    const formData = new FormData(this);
    const data = {
        destino: formData.get('destino'),
        fly: formData.get('fly'),
        cantidad: formData.get('cantidad'),
        flightPrice: currentFlightPrice,
        date: formData.get('date'),
        hotel: formData.get('hotel'),
        noches: formData.get('noches'),
        hotelPrice: currentHotelPrice
    };

    // Enviar el formulario con los datos actualizados
    fetch('/viaje', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            // Si la respuesta es exitosa, redirige a la ruta deseada
            window.location.href = '/';
        } else {
            // Si la respuesta no es exitosa, maneja el error
            throw new Error('Error en la solicitud POST');
        }
    })  
    
    
    
});





    

    document.getElementById('destino').addEventListener('change', function() {
        updateHotelOptions();
        updateFlightPrices(); // Llamar a la función para actualizar los precios de los vuelos al cambiar el destino
    });

    // Event listener para actualizar los precios de los vuelos al cambiar la clase de vuelo
    document.querySelectorAll('input[name="fly"]').forEach(radio => {
        radio.addEventListener('change', updateFlightPrices);
    });

    document.getElementById('cantidad').addEventListener('input', function() {
        const cantidad = parseInt(this.value);
        if (cantidad < 1) {
            this.value = 1; // Establece el valor mínimo como 1 si se ingresa un valor menor
        }
        updateFlightPrices(); // Llama a la función para actualizar el precio del vuelo
    });

    document.getElementById('noches').addEventListener('input', function() {
        const noches = parseInt(this.value);
        if (noches < 1) {
            this.value = 1; // Establece el valor mínimo como 1 si se ingresa un valor menor
        }
        updateHotelPrices(); // Llama a la función para actualizar el precio del hotel
    });
    
    
    // Llamada inicial para asegurar que las opciones de hotel se actualicen al cargar la página
    updateHotelOptions();
    updateFlightPrices();


    // Event listeners para los botones de siguiente y anterior
    document.getElementById('nextSlideButton1').addEventListener('click', nextSlide);
    document.getElementById('prevSlideButton1').addEventListener('click', prevSlide);
    document.getElementById('nextSlideButton2').addEventListener('click', nextSlide);
    document.getElementById('prevSlideButton2').addEventListener('click', prevSlide);

    showSlide(currentSlide);
});
