let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index, direction) {
    const current = slides[currentSlide];
    const next = slides[index];

    // Determinar las clases de entrada y salida
    const enterClass = direction === 'next' ? 'slide-in-next' : 'slide-in-prev';
    const activeClass = direction === 'next' ? 'slide-active-next' : 'slide-active-prev';

    // Aplicar clases para la animación
    next.classList.add('active', enterClass);
    current.classList.add(activeClass);

    setTimeout(() => {
        next.classList.remove(enterClass);
        next.classList.add('active');

        current.classList.remove('active', activeClass);

        currentSlide = index;
    }, 50); // Tiempo para asegurar que las clases de animación se apliquen
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
showSlide(currentSlide, 'next');

document.getElementById('multiStepForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Formulario enviado');
    // Aquí puedes agregar el código para procesar el formulario
});

