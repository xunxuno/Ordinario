let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides-container');

// Definir los hoteles correspondientes a cada destino antes de la función mostrarHoteles()
const hotelesPorDestino = {
    "bar": [
        { nombre: "Catalonia Park Guell", precio: "$1600 MXN por noche" },
        { nombre: "Barcelona Princess", precio: "$4000 MXN por noche" },
        { nombre: "Barcelo Sants", precio: "$2500 MXN por noche" }
    ],
    "que": [
        { nombre: "Queenstown Hotel 1", precio: "$2000 NZD por noche" },
        { nombre: "Queenstown Hotel 2", precio: "$2500 NZD por noche" },
        { nombre: "Queenstown Hotel 3", precio: "$3000 NZD por noche" }
    ],
    "es": [
        { nombre: "Estambul Hotel 1", precio: "$1500 TRY por noche" },
        { nombre: "Estambul Hotel 2", precio: "$2000 TRY por noche" },
        { nombre: "Estambul Hotel 3", precio: "$2500 TRY por noche" }
    ],
    // Agrega más hoteles correspondientes a otros destinos aquí
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
        alert('Por favor, completa todos los campos obligatorios antes de continuar.');
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
    event.preventDefault();
    alert('Formulario enviado');
    // Aquí puedes agregar el código para procesar el formulario
});


