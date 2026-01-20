function toggleMore(button) {
  const content = button.previousElementSibling;
  const isHidden = content.style.display === "none" || content.style.display === "";
  content.style.display = isHidden ? "block" : "none";
  button.textContent = isHidden ? "Ver menos" : "Ver más";
}




// ========================================
// CARRUSEL
// ========================================
const track = document.querySelector(".carousel-track");
const cards = Array.from(document.querySelectorAll(".card"));

let index = 0;
const cardWidth = cards[0].offsetWidth + 24;
const cardsPerView = 4;
const totalSlides = Math.ceil(cards.length / cardsPerView);

function moveCarousel() {
    track.style.transition = "0.35s ease";
    track.style.transform = `translateX(${-cardWidth * cardsPerView * index}px)`;
}

document.getElementById("next-btn").addEventListener("click", () => {
    if (index < totalSlides - 1) {
        index++;
        moveCarousel();
    }
});

document.getElementById("prev-btn").addEventListener("click", () => {
    if (index > 0) {
        index--;
        moveCarousel();
    }
});
