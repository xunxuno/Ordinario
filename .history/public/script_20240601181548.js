let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides-container');

function showSlide(index) {
    const offset = -index * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
    currentSlide = index;
}

// Función para validar los campos requeridos antes de enviar el formulario
function validateForm(event) {
    const activeSlide = document.querySelector('.slide.active');
    const requiredFields = activeSlide.querySelectorAll('[required]');

    // Verificar si todos los campos requeridos están llenos
    let isValid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('invalid');
        } else {
            field.classList.remove('invalid');
        }
    });

    if (!isValid) {
        // Si algún campo requerido está vacío, prevenir el envío del formulario
        event.preventDefault();
        alert('Por favor, completa todos los campos obligatorios antes de continuar.');
    }
}

// Agregar el escucha de evento de submit al formulario
document.getElementById('multiStepForm').addEventListener('submit', validateForm);





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
