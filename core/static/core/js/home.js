/* ============================================
   HERO SLIDER - AUTO Y CON VIDEOS SINCRONIZADOS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  const heroSlides = Array.from(document.querySelectorAll('.hero-slide .slide'));
  const heroDots = Array.from(document.querySelectorAll('.hero-slide .dot'));
  let heroIndex = 0;
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 6000; // 6 segundos para imágenes

  if (!heroSlides.length || !heroDots.length) return;

  function stopAutoplay() {
    if (autoplayTimer) clearTimeout(autoplayTimer);
    autoplayTimer = null;
  }

  function showHeroSlide(n) {
    heroSlides.forEach((slide, i) => {
      const overlay = slide.querySelector('.overlay');
      const video = slide.querySelector('video');

      if (i === n) {
        slide.classList.add('active');
        if (overlay) {
          overlay.classList.remove('animate');
          void overlay.offsetWidth; // reflow
          overlay.classList.add('animate');
        }
        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }
      } else {
        slide.classList.remove('active');
        if (overlay) overlay.classList.remove('animate');
        if (video) video.pause();
      }

      if (heroDots[i]) heroDots[i].classList.toggle('active', i === n);
    });

    heroIndex = n;
    if (!isPaused) startAutoplay();
  }

function startAutoplay() {
  if (isPaused) return;

  stopAutoplay();

  const currentSlide = heroSlides[heroIndex];
  const video = currentSlide.querySelector('video');

  if (video) {
    video.onended = () => {
      if (!isPaused) {
        showHeroSlide((heroIndex + 1) % heroSlides.length);
      }
    };
  } else {
    autoplayTimer = setTimeout(() => {
      if (!isPaused) {
        showHeroSlide((heroIndex + 1) % heroSlides.length);
      }
    }, AUTOPLAY_DELAY);
  }
}


  // Click en los puntos
  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showHeroSlide(i);
    });
  });

  // Iniciar desde el primer slide
  showHeroSlide(0);

  // Pausa automática si la pestaña está inactiva
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });
});


const toggleBtn = document.getElementById('heroToggle');
let isPaused = false;

function pauseHero() {
  isPaused = true;
  stopAutoplay();

  const currentSlide = heroSlides[heroIndex];
  const video = currentSlide.querySelector('video');
  if (video) {
    video.onended = null;
    video.pause();
  }

  toggleBtn.textContent = '▶';
}


function playHero() {
  isPaused = false;

  const currentSlide = heroSlides[heroIndex];
  const video = currentSlide.querySelector('video');
  if (video) video.play().catch(() => {});

  toggleBtn.textContent = '⏸';
  startAutoplay();
}

toggleBtn.addEventListener('click', () => {
  isPaused ? playHero() : pauseHero();
});


/* ============================================
   BOTONES DE SECCIONES INTERACTIVAS
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.hub-buttons button');
  const boxes = document.querySelectorAll('.contenido-box');

  if (!buttons.length || !boxes.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Quitar "active" de todo
      buttons.forEach(b => b.classList.remove('active'));
      boxes.forEach(box => box.classList.remove('active'));

      // Activar el actual
      btn.classList.add('active');
      const target = btn.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
    });
  });
});




/* himno */

// document.addEventListener('DOMContentLoaded', () => {
//     // ... tu código existente ...

//     const botonMusica = document.getElementById('botonMusica');
//     const musicaFondo = document.getElementById('musicaFondo');
//     let reproduciendo = false;

//     botonMusica.addEventListener('click', function() {
//         if (!reproduciendo) {
//             musicaFondo.play();
//             this.innerHTML = "Pause";
//             reproduciendo = true;
//         } else {
//             musicaFondo.pause();
//             this.innerHTML = "Play";
//             reproduciendo = false;
//         }
//     });

//     // Manejo de errores
//     musicaFondo.addEventListener('error', function(e) {
//         console.error('Error al reproducir la música:', e);
//     });
// });


document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.hub-buttons button');
  const boxes = document.querySelectorAll('.contenido-box');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover clase active de todos los botones y contenidos
      buttons.forEach(b => b.classList.remove('active'));
      boxes.forEach(box => box.classList.remove('active'));

      // Activar el botón actual y su contenido relacionado
      btn.classList.add('active');
      const target = btn.getAttribute('data-target');
      document.getElementById(target).classList.add('active');
    });
  });
});

// niveles educativos 
function toggleInfo(card) {
  const info = card.querySelector(".nivel-info");
  const expanded = card.classList.contains("expanded");

  // Cierra todas las demás tarjetas
  document.querySelectorAll(".nivel-card").forEach(c => {
    c.classList.remove("expanded");
    c.querySelector(".nivel-info").classList.remove("show");
  });

  // Si no estaba expandida, la abre
  if (!expanded) {
    card.classList.add("expanded");
    info.classList.add("show");
  }
}

document.querySelectorAll(".streetview").forEach((map) => {
  /* DESKTOP: doble clic */
  map.addEventListener("dblclick", (e) => {
    e.preventDefault();
    map.classList.add("active");
  });

  /* MÓVIL: tap largo */
  let pressTimer;

  map.addEventListener("touchstart", () => {
    pressTimer = setTimeout(() => {
      map.classList.add("active");
    }, 600); // tiempo de tap largo (ms)
  });

  map.addEventListener("touchend", () => {
    clearTimeout(pressTimer);
  });

  map.addEventListener("touchmove", () => {
    clearTimeout(pressTimer); // si hace scroll, no activa
  });
});

/* Desactivar al tocar fuera */
document.addEventListener("click", (e) => {
  document.querySelectorAll(".streetview.active").forEach((map) => {
    if (!map.contains(e.target)) {
      map.classList.remove("active");
    }
  });
});



