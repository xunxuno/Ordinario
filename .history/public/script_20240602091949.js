let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides-container');

// Definir los hoteles correspondientes a cada destino antes de la función mostrarHoteles()
const hotelesPorDestino = {
    "bar": [
        { nombre: "Catalonia Park Guell", precio: "$1600 MXN por noche", price: 1600  },
        { nombre: "Barcelona Princess", precio: "$4000 MXN por noche", price: 4000  },
        { nombre: "Barcelo Sants", precio: "$2500 MXN por noche", price: 2500  },
        { nombre: "Hotel Market", precio: "$1899 MXN por noche", price: 1899 }
    ],
    "que": [
        { nombre: "Holiday Inn Queenstown Remarkables Park", precio: "$2300 MXN por noche", price: 2300 },
        { nombre: "Heartland Hotel Queenstown", precio: "$2400 MXN por noche", price: 2400 },
        { nombre: "Hurley's of Queenstown", precio: "$1800 MXN por noche", price: 1800 },
        { nombre: "Rydges Lakeland Resort Queenstown", precio: "$2200 MXN por noche", price: 2200 }
    ],
    "es": [
        { nombre: "Motto By Mula Hotel", precio: "$2400 MXN por noche", price: 2400 },
        { nombre: "The Ritz-Carlton", precio: "$6700 MXN por noche", price: 6700 },
        { nombre: "İstiklal hostel istanbul", precio: "$300 MXN por noche", price: 300 },
        { nombre: "erciyes suites", precio: "$400 MXN por noche", price: 400 }
    ],
    "pa": [
        { nombre: "Nouvel Hôtel Eiffel", precio: "$1800 MXN por noche", price: 1800 },
        { nombre: "Atala powered by Sonder", precio: "$5200 MXN por noche", price: 5200 },
        { nombre: "Hotel Armoni Paris", precio: "$2090 MXN por noche", price: 2090 },
        { nombre: "Sonder Le Frochot", precio: "$2300 MXN por noche", price: 2300 }
    ],
    "san": [
        { nombre: "Yotel San Francisco", precio: "$1900 MXN por noche", price: 1900 },
        { nombre: "Hilton San Francisco Union Square", precio: "$2100 MXN por noche", price: 2100 },
        { nombre: "Riu Plaza Fisherman's Wharf", precio: "$4400 MXN por noche", price: 4400 },
        { nombre: "The St. Regis San Francisco", precio: "$7600 MXN por noche", price: 7600 }
    ],
    "sin": [
        { nombre: "Hotel 81 Palace", precio: "$860 MXN por noche", price: 860 },
        { nombre: "The Serangoon House", precio: "$1700 MXN por noche", price: 1700 },
        { nombre: "Hotel Mi Bencoolen", precio: "$1690 MXN por noche", price: 1690 },
        { nombre: "Resorts World Sentosa - Hotel Ora", precio: "$3800 MXN por noche", price: 3800 }
    ],
    "se": [
        { nombre: "Hotel 8 Hours", precio: "$3200 MXN por noche", price: 3200 },
        { nombre: "OYO Hostel Myeongdong 5", precio: "$1100 MXN por noche", price: 1100 },
        { nombre: "LOTTE City Hotel Gimpo Airport", precio: "$1800 MXN por noche", price: 1800 },
        { nombre: "Four Points by Sheraton Josun", precio: "$1750 MXN por noche", price: 1750 }
    ],
    "kyo": [
        { nombre: "KABIN Machi", precio: "$2600 MXN por noche", price: 2600 },
        { nombre: "The OneFive Kyoto Shijo", precio: "$621 MXN por noche", price: 621 },
        { nombre: "Comfort Hotel Kyoto Horikawagojo", precio: "$1009 MXN por noche", price: 1009 },
        { nombre: "HOTEL MYSTAYS Kyoto Shijo", precio: "$957 MXN por noche", price: 957 }
    ],
    "lon": [
        { nombre: "YOTEL London ShoreditchS", precio: "$3200 MXN por noche", price: 3200 },
        { nombre: "Sonder Camden Road", precio: "$3200 MXN por noche", price: 3200 },
        { nombre: "Central London Luxury Studios", precio: "$1007 MXN por noche", price: 1007 },
        { nombre: "ME London by Melia - Covent Garden", precio: "$11160 MXN por noche", price: 11160 }
    ],
};

// Función para mostrar los hoteles correspondientes al destino seleccionado
function mostrarHoteles() {
    const destinoSeleccionado = document.getElementById('destino').value;
    const hotelesContainer = document.getElementById('hotelesContainer');
    hotelesContainer.innerHTML = ''; // Limpiar el contenedor de hoteles

    // Obtener los hoteles para el destino seleccionado
    const hoteles = hotelesPorDestino[destinoSeleccionado];

    // Mostrar los hoteles en el contenedor
    hoteles.forEach(hotel => {
        const radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'hotel';
        radioBtn.value = hotel.nombre;
        radioBtn.required = true;

        const label = document.createElement('label');
        label.htmlFor = hotel.nombre;
        label.textContent = `${hotel.nombre} (${hotel.precio})`;

        hotelesContainer.appendChild(radioBtn);
        hotelesContainer.appendChild(label);
        hotelesContainer.appendChild(document.createElement('br'));
    });
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


