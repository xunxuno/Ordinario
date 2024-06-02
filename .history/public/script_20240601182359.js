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
    console.log("nextSlide() function called");
    const activeSlide = document.querySelector('.slide.active');
    if (!activeSlide) {
        console.error("Error: No active slide found");
        return;
    }
    console.log("Active slide:", activeSlide);
    console.log("Next slide button clicked");
    
    const requiredFields = activeSlide.querySelectorAll('[required]');
    console.log("Required fields:", requiredFields);
    
    requiredFields.forEach(field => {
        console.log("Field value:", field.value);
        if (!field.value.trim()) {
            console.log("Field is empty");
            field.classList.add('invalid');
        } else {
            console.log("Field is not empty");
            field.classList.remove('invalid');
        }
    });

    const isSlideValid = Array.from(requiredFields).every(field => field.value.trim() !== '');
    console.log("Is slide valid?", isSlideValid);
    
    if (isSlideValid) {
        const nextIndex = Array.from(slides).indexOf(activeSlide) + 1;
        if (nextIndex < slides.length) {
            console.log("Moving to next slide");
            showSlide(nextIndex);
        } else {
            console.log("No next slide available");
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
