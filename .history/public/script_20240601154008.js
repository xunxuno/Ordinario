let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index, direction) {
    const current = slides[currentSlide];
    const next = slides[index];

    // Determinar la dirección de la transición
    const enterClass = direction === 'next' ? 'slide-enter' : 'slide-enter-left';
    const exitClass = direction === 'next' ? 'slide-exit' : 'slide-exit-right';

    // Aplicar clases para la animación
    next.classList.add('active', enterClass);
    current.classList.add(exitClass);

    // Eliminar clases de animación después de la transición
    setTimeout(() => {
        next.classList.remove(enterClass);
        current.classList.remove('active', exitClass);
    }, 500); // La duración de la animación debe coincidir con el tiempo de transición en CSS

    currentSlide = index;
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
showSlide(currentSlide);

document.getElementById('multiStepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Formulario enviado');
    // Aquí puedes agregar el código para procesar el formulario
});
