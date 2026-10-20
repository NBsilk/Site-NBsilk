
document.addEventListener("DOMContentLoaded", () => {
  // Revelar elementos ao rolar a página
  const elements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    elements.forEach((element) => observer.observe(element));
  } else {
    elements.forEach((element) => element.classList.add("visible"));
  }

  // Menu para dispositivos móveis
  const toggle = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const opened = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(opened));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Ano automático no rodapé
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Indicador de progresso de rolagem
  const progress = document.getElementById("progress");

  function updateProgress() {
    if (!progress) return;

    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    progress.style.width =
      (maxScroll > 0 ? window.scrollY / maxScroll * 100 : 0) + "%";
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();
});
