let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides-container');

function showSlide(index) {
    const offset = -index * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    currentSlide = index;
}

// Función para validar los campos requeridos antes de enviar el formulario
function nextSlide() {
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
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


// Función para mostrar los hoteles correspondientes al destino seleccionado
function mostrarHoteles() {
    const destinoSeleccionado = document.getElementById('destino').value;
    const hotelesContainer = document.getElementById('hotelesContainer');
    hotelesContainer.innerHTML = ''; // Limpiar el contenedor de hoteles

    // Definir los hoteles correspondientes a cada destino
    const hotelesPorDestino = {
        "bar": [
            { nombre: "Catalonia Park Guell", precio: "$1600 MXN por noche" },
            { nombre: "Barcelona Princess", precio: "$4000 MXN por noche" },
            { nombre: "Barcelo Sants", precio: "$2500 MXN por noche" }
        ],
        "que": [
            // Agrega los hoteles correspondientes a Queenstown aquí
        ],
        "es": [
            // Agrega los hoteles correspondientes a Estambul aquí
        ],
        // Agrega más hoteles correspondientes a otros destinos aquí
    };

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

// Llamar a la función mostrarHoteles() cuando se avance a la tercera slide
function nextSlide() {
    // Tu código existente para avanzar a la siguiente slide
    // ...

    // Llamar a la función mostrarHoteles() cuando se avance a la tercera slide
    if (currentSlide === 2) {
        mostrarHoteles();
    }
}

