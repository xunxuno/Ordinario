document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides-container');
    const flightPriceInput = document.getElementById('flightPrice');
    const hotelPriceInput = document.getElementById('hotelPrice');

    const hotelOptions = {
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
        // Agrega los demás destinos y opciones de hotel aquí...
    };

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

    function updateFlightPrice() {
        const selectedFlight = document.querySelector('input[name="fly"]:checked');
        if (selectedFlight) {
            const price = selectedFlight.getAttribute('data-price');
            flightPriceInput.value = price;
        }
    }

    function updateHotelOptions() {
        const destination = document.getElementById('destino').value;
        const hotelsContainer = document.getElementById('hotelesContainer');
        hotelsContainer.innerHTML = '';

        if (hotelOptions[destination]) {
            hotelOptions[destination].forEach(hotel => {
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

    function updateHotelPrice() {
        const selectedHotel = document.querySelector('input[name="hotel"]:checked');
        if (selectedHotel) {
            const price = selectedHotel.getAttribute('data-price');
            hotelPriceInput.value = price;
        }
    }

    document.getElementById('multiStepForm').addEventListener('submit', function(event) {
        updateFlightPrice();
        updateHotelPrice();
        alert('Formulario enviado');
        // Aquí puedes agregar el código para enviar los datos a tu servidor
    });

    document.querySelectorAll('input[name="fly"]').forEach(input => {
        input.addEventListener('change', updateFlightPrice);
    });

    document.getElementById('destino').addEventListener('change', updateHotelOptions);

    document.addEventListener('change', function(event) {
        if (event.target.name === 'hotel') {
            updateHotelPrice();
        }
    });

    document.querySelector('button[onclick="nextSlide()"]').addEventListener('click', nextSlide);
    document.querySelector('button[onclick="prevSlide()"]').addEventListener('click', prevSlide);

    showSlide(currentSlide);
});
