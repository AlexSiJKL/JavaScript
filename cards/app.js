const slides = document.querySelectorAll('.slide');

slides.forEach((slide) => {
    slide.addEventListener('click', () => {
        slides.forEach(s => s.classList.remove('active'));
        slide.classList.add('active');
    });
});