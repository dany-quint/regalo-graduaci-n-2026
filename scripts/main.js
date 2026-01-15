document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js cargó correctamente ✅");

  /* =========================
     BOTÓN COMENZAR CAMINO
  ========================= */
  const startBtn = document.getElementById("startBtn");
  const inicioSection = document.getElementById("inicio");

  if (startBtn && inicioSection) {
    startBtn.addEventListener("click", () => {
      inicioSection.scrollIntoView({ behavior: "smooth" });
    });
  }

  /* =========================
     FADE IN ON SCROLL
  ========================= */
  const faders = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  faders.forEach((el) => observer.observe(el));

  /* =========================
     MÚSICA ON / OFF
  ========================= */
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const musicStatus = document.getElementById("musicStatus");

  if (musicToggle && bgMusic) {
    bgMusic.volume = 0.22;

    const setStatus = (msg) => {
      if (musicStatus) musicStatus.textContent = msg;
    };

    musicToggle.addEventListener("click", () => {
      if (bgMusic.paused) {
        bgMusic
          .play()
          .then(() => {
            musicToggle.textContent = "⏸ Pausar música";
            musicToggle.setAttribute("aria-pressed", "true");
            setStatus("Música activada ✨");
          })
          .catch((err) => {
            console.log("Audio bloqueado:", err);
            setStatus(
              "Tu navegador bloqueó la música. Haz clic otra vez o recarga la página."
            );
          });
      } else {
        bgMusic.pause();
        musicToggle.textContent = "🎶 Activar música";
        musicToggle.setAttribute("aria-pressed", "false");
        setStatus("Música en pausa.");
      }
    });
  }
});
