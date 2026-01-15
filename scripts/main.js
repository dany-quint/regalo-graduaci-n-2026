document.addEventListener("DOMContentLoaded", () => {
  // Botón de inicio
  const startBtn = document.getElementById("startBtn");
  const inicioSection = document.getElementById("inicio");

  if (startBtn && inicioSection) {
    startBtn.addEventListener("click", () => {
      inicioSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // Fade-in on scroll
  const faders = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px", // hace que se active un poquito antes
    }
  );

  faders.forEach((el) => observer.observe(el));

  // Por si algún elemento ya está visible al cargar:
  setTimeout(() => {
    faders.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9) el.classList.add("visible");
    });
  }, 50);
});
// Música ON/OFF (robusto)
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const musicStatus = document.getElementById("musicStatus");

if (musicToggle && bgMusic) {
  bgMusic.volume = 0.22;

  const setStatus = (msg) => {
    if (musicStatus) musicStatus.textContent = msg;
  };

  musicToggle.addEventListener("click", () => {
    // Asegura que el audio esté listo
    bgMusic.load();

    // Intento de reproducir (sin async/await para evitar bloqueos raros)
    const playPromise = bgMusic.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Si estaba pausado y ahora suena
          if (!bgMusic.paused) {
            musicToggle.textContent = "⏸ Pausar música";
            musicToggle.setAttribute("aria-pressed", "true");
            setStatus("Música activada ✨");
          }
        })
        .catch(() => {
          // Si no se pudo reproducir
          setStatus("Tu navegador bloqueó la música. Haz clic otra vez o recarga la página.");
        });
    }

    // Si ya estaba sonando, pausar
    if (!bgMusic.paused) {
      bgMusic.pause();
      musicToggle.textContent = "🎶 Activar música";
      musicToggle.setAttribute("aria-pressed", "false");
      setStatus("Música en pausa.");
    }
  });
}
