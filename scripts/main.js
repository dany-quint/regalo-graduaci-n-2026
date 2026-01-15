document.addEventListener("DOMContentLoaded", () => {
  console.log("main.js cargó correctamente ✅");

  // Scroll del botón principal
  const startBtn = document.getElementById("startBtn");
  startBtn?.addEventListener("click", () => {
    document.querySelector("#capitulo-1")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // Fade in on scroll
  const faders = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
    { threshold: 0.12 }
  );
  faders.forEach((el) => observer.observe(el));

  // Música ON/OFF
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
        setStatus("Tu navegador bloqueó la música. Haz clic otra vez o recarga.");
      } finally {
        setTimeout(() => (busy = false), 350);
      }
    });
  }

  // Modal de cartas
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  const openModal = (title, body) => {
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };

  document.querySelectorAll(".cardlet").forEach((c) => {
    c.addEventListener("click", () => openModal(c.dataset.title || "Carta", c.dataset.body || ""));
  });

  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
