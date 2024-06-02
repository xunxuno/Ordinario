document.addEventListener('DOMContentLoaded', () => {
    const hotelesPorDestino = {
        "bar": [
            { nombre: "Catalonia Park Guell", price: 1600  },
            { nombre: "Barcelona Princess", price: 4000  },
            { nombre: "Barcelo Sants", price: 2500  },
            { nombre: "Hotel Market", price: 1899 }
        ],
        "que": [
            { nombre: "Holiday Inn Queenstown Remarkables Park", price: 2300 },
            { nombre: "Heartland Hotel Queenstown", price: 2400 },
            { nombre: "Hurley's of Queenstown", price: 1800 },
            { nombre: "Rydges Lakeland Resort Queenstown", price: 2200 }
        ],
        // Resto de los destinos...
    };

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides-container');

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        const offset = -index * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        currentSlide = index;
    }

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

    function updateHotelOptions() {
        const destination = document.getElementById('destino').value;
        const hotelsContainer = document.getElementById('hotelesContainer');
        hotelsContainer.innerHTML = ''; // Limpiar el contenido previo antes de agregar nuevas opciones
    
        if (hotelesPorDestino[destination]) {
            hotelesPorDestino[destination].forEach(hotel => {
                const label = document.createElement('label');
                label.setAttribute('for', hotel.nombre);
                label.innerText = `${hotel.nombre} - $${hotel.price} MXN por noche`;
    
                const input = document.createElement('input');
                input.type = 'radio';
                input.id = hotel.nombre;
                input.name = 'hotel';
                input.value = hotel.nombre;
                input.setAttribute('data-price', hotel.price);
                input.required = true;
    
                hotelsContainer.appendChild(label);
                hotelsContainer.appendChild(input);
                hotelsContainer.appendChild(document.createElement('br'));
            });
        }
    }

    document.getElementById('multiStepForm').addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Formulario enviado');
        // Aquí puedes agregar el código para enviar los datos a tu servidor
    });

    document.getElementById('destino').addEventListener('change', updateHotelOptions);

    document.querySelectorAll('button[onclick="nextSlide()"]').forEach(button => {
        button.addEventListener('click', nextSlide);
    });
    document.querySelectorAll('button[onclick="prevSlide()"]').forEach(button => {
        button.addEventListener('click', prevSlide);
    });

    showSlide(currentSlide);
});
