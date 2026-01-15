document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js cargó correctamente ✅");

  // Botón comenzar camino
  const startBtn = document.getElementById("startBtn");
  const inicioSection = document.getElementById("capitulo-1");

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
    { threshold: 0.15 }
  );
  faders.forEach((el) => observer.observe(el));

  // Música ON/OFF (anti-AbortError)
  const musicToggle = document.getElementById("musicToggle");
  const bgMusic = document.getElementById("bgMusic");
  const musicStatus = document.getElementById("musicStatus");

  let busy = false;

  if (musicToggle && bgMusic) {
    bgMusic.volume = 0.22;

    const setStatus = (msg) => {
      if (musicStatus) musicStatus.textContent = msg;
    };

    musicToggle.addEventListener("click", async () => {
      if (busy) return;
      busy = true;

      try {
        if (bgMusic.paused) {
          // No llames load() aquí: puede interrumpir play()
          await bgMusic.play();
          musicToggle.textContent = "⏸ Pausar música";
          musicToggle.setAttribute("aria-pressed", "true");
          setStatus("Música activada ✨");
        } else {
          bgMusic.pause();
          musicToggle.textContent = "🎶 Activar música";
          musicToggle.setAttribute("aria-pressed", "false");
          setStatus("Música en pausa.");
        }
      } catch (err) {
        console.log("Audio error:", err);
        setStatus("No se pudo reproducir. Prueba recargar y hacer clic una vez.");
      } finally {
        // pequeña ventana para evitar doble disparo
        setTimeout(() => (busy = false), 350);
      }
    });
  }
});
