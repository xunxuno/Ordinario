document.addEventListener('DOMContentLoaded', () => {
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
    
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
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
    
        function updateHotelOptions() {
            // Tu función updateHotelOptions aquí...
        }
    
        function updateFlightPrice(destination, selectedClass) {
            // Tu función updateFlightPrice aquí...
        }
    
        function updateFlightPrices(destination) {
            // Tu función updateFlightPrices aquí...
        }
    
        updateHotelOptions();
        updateFlightPrices(); 
    
        document.getElementById('multiStepForm').addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Formulario enviado');
            // Aquí puedes agregar el código para enviar los datos a tu servidor
        });
    
        document.getElementById('destino').addEventListener('change', function(event) {
            const selectedDestination = event.target.value;
            updateFlightPrices(selectedDestination);
        });
    
        document.querySelectorAll('input[name="fly"]').forEach(input => {
            input.addEventListener('change', function() {
                const selectedDestination = document.getElementById('destino').value;
                updateFlightPrice(selectedDestination, this.value);
            });
        });
    
        // Botón para avanzar a la siguiente diapositiva
        const nextButtons = document.querySelectorAll('.next-slide');
        nextButtons.forEach(button => {
            button.addEventListener('click', nextSlide);
        });
    
        // Botón para retroceder a la diapositiva anterior
        const prevButtons = document.querySelectorAll('.prev-slide');
        prevButtons.forEach(button => {
            button.addEventListener('click', prevSlide);
        });
    
        showSlide(currentSlide);
    });
    


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

    function updateHotelOptions() {
        const destination = document.getElementById('destino').value;
        const hotelsContainer = document.getElementById('hotelesContainer');
        hotelsContainer.innerHTML = ''; // Limpiar el contenido previo antes de agregar nuevas opciones
    
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
        }
    }

    function updateFlightPrice(destination, selectedClass) {
        const priceInput = document.getElementById('flightPrice');
        if (flightPrices.hasOwnProperty(destination) && flightPrices[destination].hasOwnProperty(selectedClass)) {
            const price = flightPrices[destination][selectedClass];
            priceInput.value = price;
        } else {
            priceInput.value = ''; // Si el destino o la clase no tienen precio, dejamos el campo vacío
        }
    }

    function updateFlightPrices(destination) {
        const selectedClass = document.querySelector('input[name="fly"]:checked').value;
        updateFlightPrice(destination, selectedClass);
    }

    // Llamada inicial para asegurar que las opciones de hotel y vuelos se actualicen al cargar la página
    updateHotelOptions();
    updateFlightPrices(); 
    

    document.getElementById('destino').addEventListener('change', function(event) {
        const selectedDestination = event.target.value;
        updateFlightPrices(selectedDestination);
    });

    document.querySelectorAll('input[name="fly"]').forEach(input => {
        input.addEventListener('change', function() {
            const selectedDestination = document.getElementById('destino').value;
            updateFlightPrice(selectedDestination, this.value);
        });
    });




    document.getElementById('multiStepForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Formulario enviado');
        // Aquí puedes agregar el código para enviar los datos a tu servidor
    });

    document.getElementById('destino').addEventListener('change', updateHotelOptions);

    document.querySelectorAll('.next-slide').forEach(button => {
        button.addEventListener('click', nextSlide);
    });
    
    
    document.querySelectorAll('button[onclick="prevSlide()"]').forEach(button => {
        button.addEventListener('click', prevSlide);
    });

    showSlide(currentSlide);
});
