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
// Música ON/OFF
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

if (musicToggle && bgMusic) {
  bgMusic.volume = 0.22;

  musicToggle.addEventListener("click", async () => {
    try {
      if (bgMusic.paused) {
        await bgMusic.play();
        musicToggle.textContent = "⏸ Pausar música";
        musicToggle.setAttribute("aria-pressed", "true");
      } else {
        bgMusic.pause();
        musicToggle.textContent = "🎶 Activar música";
        musicToggle.setAttribute("aria-pressed", "false");
      }
    } catch (e) {
      // Si el navegador bloquea por alguna razón
      alert("Tu navegador bloqueó la reproducción. Intenta hacer clic otra vez.");
    }
  });
}
