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
    const activeSlide = document.querySelector('.slide.active');
    console.log("nextSlide() function called");
    const requiredFields = activeSlide.querySelectorAll('[required]');
    console.log("Required fields:", requiredFields);
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
        const nextIndex = Array.from(slides).indexOf(activeSlide) + 1;
        if (nextIndex < slides.length) {
            showSlide(nextIndex);
        }
    } else {
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
