let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index, direction) {
    const current = slides[currentSlide];
    const next = slides[index];

    // Determinar las clases de entrada y salida
    const enterClass = direction === 'next' ? 'slide-enter' : 'slide-enter-prev';
    const exitClass = direction === 'next' ? 'slide-exit' : 'slide-exit-prev';

    // Añadir clases para la animación
    next.classList.add('active', enterClass);
    current.classList.add(exitClass);

    // Forzar un reflujo para que las animaciones se apliquen
    next.offsetWidth;

    next.classList.add('slide-enter-active');
    current.classList.add('slide-exit-active');

    // Quitar clases después de la animación
    setTimeout(() => {
        next.classList.remove(enterClass, 'slide-enter-active');
        current.classList.remove('active', exitClass, 'slide-exit-active');

        currentSlide = index;
    }, 500); // Tiempo de la animación
}

function nextSlide() {
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1, 'next');
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1, 'prev');
    }
}

// Initialize the first slide
document.addEventListener('DOMContentLoaded', () => {
    slides[currentSlide].classList.add('active');
});

document.getElementById('multiStepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Formulario enviado');
    // Aquí puedes agregar el código para procesar el formulario
});
