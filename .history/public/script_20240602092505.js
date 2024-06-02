let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides-container');

// Definir los hoteles correspondientes a cada destino antes de la función mostrarHoteles()
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

// Función para mostrar los hoteles correspondientes al destino seleccionado
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
            label.setAttribute('for', hotel.name);
            label.innerText = `${hotel.name} - $${hotel.price} MXN por noche`;
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = hotel.name;
            input.name = 'hotel';
            input.value = hotel.name;
            input.setAttribute('data-price', hotel.price);
            input.required = true;

            label.appendChild(input);
            hotelsContainer.appendChild(label);
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


function showSlide(index) {
    const offset = -index * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    currentSlide = index;
}

// Función para validar los campos requeridos antes de enviar el formulario
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
        if (currentSlide === 1) {
            mostrarHoteles();
        }
        if (currentSlide < slides.length - 1) {
            showSlide(currentSlide + 1);
        }
    } else {
        alert('Por favor, completa todos los campos obligatorios antes de continuar.'); //alerta
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// Initialize the first slide
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
});

document.getElementById('multiStepForm').addEventListener('submit', function(event) {
    //event.preventDefault();
    console.log('Formulario enviado'); //alerta
    // Aquí puedes agregar el código para procesar el formulario
});


