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
