document.addEventListener('DOMContentLoaded', () => {
    const hotelesPorDestino = {
        "bar": [
            { nombre: "Catalonia Park Guell", price: 1600  },
            { nombre: "Barcelona Princess", price: 4000  },
            { nombre: "Barcelo Sants", price: 2500  },
            { nombre: "Hotel Market", price: 1899 }
        ],
        "que": [
            { nombre: "Holiday Inn Queenstown Remarkables Park", price: 2300 },
            { nombre: "Heartland Hotel Queenstown", price: 2400 },
            { nombre: "Hurley's of Queenstown",price: 1800 },
            { nombre: "Rydges Lakeland Resort Queenstown", price: 2200 }
        ],
        "es": [
            { nombre: "Motto By Mula Hotel", price: 2400 },
            { nombre: "The Ritz-Carlton", price: 6700 },
            { nombre: "İstiklal hostel istanbul", price: 300 },
            { nombre: "erciyes suites", price: 400 }
        ],
        "pa": [
            { nombre: "Nouvel Hôtel Eiffel", price: 1800 },
            { nombre: "Atala powered by Sonder", price: 5200 },
            { nombre: "Hotel Armoni Paris", price: 2090 },
            { nombre: "Sonder Le Frochot", price: 2300 }
        ],
        "san": [
            { nombre: "Yotel San Francisco", price: 1900 },
            { nombre: "Hilton San Francisco Union Square", price: 2100 },
            { nombre: "Riu Plaza Fisherman's Wharf", price: 4400 },
            { nombre: "The St. Regis San Francisco", price: 7600 }
        ],
        "sin": [
            { nombre: "Hotel 81 Palace", price: 860 },
            { nombre: "The Serangoon House", price: 1700 },
            { nombre: "Hotel Mi Bencoolen", price: 1690 },
            { nombre: "Resorts World Sentosa - Hotel Ora",price: 3800 }
        ],
        "se": [
            { nombre: "Hotel 8 Hours", price: 3200 },
            { nombre: "OYO Hostel Myeongdong 5", price: 1100 },
            { nombre: "LOTTE City Hotel Gimpo Airport", price: 1800 },
            { nombre: "Four Points by Sheraton Josun", price: 1750 }
        ],
        "kyo": [
            { nombre: "KABIN Machi",price: 2600 },
            { nombre: "The OneFive Kyoto Shijo", price: 621 },
            { nombre: "Comfort Hotel Kyoto Horikawagojo", price: 1009 },
            { nombre: "HOTEL MYSTAYS Kyoto Shijo",price: 957 }
        ],
        "lon": [
            { nombre: "YOTEL London ShoreditchS", price: 3200 },
            { nombre: "Sonder Camden Road", price: 3200 },
            { nombre: "Central London Luxury Studios", price: 1007 },
            { nombre: "ME London by Melia - Covent Garden", price: 11160 }
        ],
    
    };

    // vuelos
    const flightPrices = {
        "bar": {
            "turista": 500,
            "turistaSuperior": 700,
            "business": 1000,
            "primeraClase": 1500
        },
        "que": {
            "turista": 800,
            "turistaSuperior": 1000,
            "business": 1500,
            "primeraClase": 2000
        },
        // Agrega los precios para otros destinos según sea necesario
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

            const hotelPriceElement = document.getElementById('hotelPrice');
            hotelPriceElement.textContent = `$${totalPrice} MXN`;
            hotelPriceElement.style.display = 'inline';
        } else {
            const hotelPriceElement = document.getElementById('hotelPrice');
            hotelPriceElement.style.display = 'none';
        }
    }
    
    // mandar formulario
    document.getElementById('multiStepForm').addEventListener('submit', function(event) {
        //event.preventDefault();
        const formData = new FormData(this);
        const data = {
            destino: formData.get('destino'),
            fly: formData.get('fly'),
            cantidad: formData.get('cantidad'),
            hotel: formData.get('hotel'),
            noches: formData.get('noches')
        };
    
        fetch('/viaje', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert('Formulario enviado correctamente');
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
