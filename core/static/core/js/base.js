// --- Menú hamburguesa: abrir/cerrar con animación y X icon ---
(function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = navMenu ? navMenu.querySelectorAll('.nav-link') : [];
  const breakpoint = 768; // ancho móvil -> tablet cut-off

  function closeMenu() {
    if (navMenu) navMenu.classList.remove('active');
    if (hamburger) hamburger.classList.remove('active');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    if (navMenu) navMenu.classList.add('active');
    if (hamburger) hamburger.classList.add('active');
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // close when clicking a nav link (good UX on mobile)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        // small delay so navigation can start (if same-page anchors) — UX friendly
        setTimeout(closeMenu, 120);
      });
    });

    // close menu when clicking outside (mobile)
    document.addEventListener('click', (e) => {
      const target = e.target;
      // if click is outside navMenu and hamburger and menu is open -> close
      if (!navMenu.contains(target) && !hamburger.contains(target) && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    // close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    // on resize: if we go to desktop, ensure menu closed (avoid stuck open)
    window.addEventListener('resize', () => {
      if (window.innerWidth > breakpoint && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }
})();

// --- Panel de accesibilidad ---
// --- Panel accesibilidad moderno ---
(function () {
  const toggleBtn = document.getElementById('accessibility-toggle');
  const panel = document.getElementById('accessibility-panel');

  if (toggleBtn && panel) {
    // abrir/cerrar al pulsar el botón
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // evita que se dispare el click del documento
      const visible = panel.style.display === 'flex';
      if (!visible) {
        panel.style.display = 'flex';
        panel.setAttribute('aria-hidden', 'false');
      } else {
        panel.style.display = 'none';
        panel.setAttribute('aria-hidden', 'true');
      }
    });

    // cerrar al hacer click fuera del panel
    document.addEventListener('click', (e) => {
      if (
        panel.style.display === 'flex' &&
        !panel.contains(e.target) &&
        !toggleBtn.contains(e.target)
      ) {
        panel.style.display = 'none';
        panel.setAttribute('aria-hidden', 'true');
      }
    });
  }
})();

// --- Utilidades de accesibilidad ---
let baseFontSize = 100;

window.increaseText = function () {
  baseFontSize = Math.min(baseFontSize + 5, 140);
  document.documentElement.style.fontSize = baseFontSize + '%';
};
window.decreaseText = function () {
  baseFontSize = Math.max(baseFontSize - 5, 80);
  document.documentElement.style.fontSize = baseFontSize + '%';
};

let highContrast = false;
window.toggleContrast = function () {
  highContrast = !highContrast;
  document.documentElement.style.filter = highContrast ? 'invert(1) hue-rotate(180deg)' : '';
  document.body.style.backgroundColor = highContrast ? '#000' : '';
};

let grayscale = false;
window.toggleGrayscale = function () {
  grayscale = !grayscale;
  document.documentElement.style.filter = grayscale ? 'grayscale(1)' : '';
};

let underlineLinks = false;
window.toggleUnderlineLinks = function () {
  underlineLinks = !underlineLinks;
  document.querySelectorAll('a').forEach(a => {
    a.style.textDecoration = underlineLinks ? 'underline' : 'none';
  });
};

let readableFont = false;
window.toggleReadableFont = function () {
  readableFont = !readableFont;
  document.body.style.fontFamily = readableFont ? 'Arial, Helvetica, sans-serif' : '';
};

let reduceMotion = false;
window.toggleReduceMotion = function () {
  reduceMotion = !reduceMotion;
  const val = reduceMotion ? 'reduced' : 'no-preference';
  const styleId = 'reduce-motion-style';
  let style = document.getElementById(styleId);
  if (!style) {
    style = document.createElement('style');
    style.id = styleId;
    document.head.appendChild(style);
  }
  style.textContent = reduceMotion
    ? `* { transition: none !important; animation: none !important; }`
    : ``;
  document.documentElement.style.setProperty('--prefers-reduced-motion', val);
};

window.resetAccessibility = function () {
  baseFontSize = 100;
  document.documentElement.style.fontSize = '';
  document.documentElement.style.filter = '';
  document.body.style.backgroundColor = '';
  document.querySelectorAll('a').forEach(a => (a.style.textDecoration = ''));
  document.body.style.fontFamily = '';
  const style = document.getElementById('reduce-motion-style');
  if (style) style.textContent = '';
};

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active"); // 🔥 clave
        }
      });
    },
    {
      threshold: 0.2
    }
  );

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -80px 0px"
  }
);

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});

