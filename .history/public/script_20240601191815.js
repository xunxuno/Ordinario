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
    if (currentSlide === 2) {
        mostrarHoteles();
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

