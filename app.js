(function () {
  const body = document.body;
  const intro = document.getElementById("intro");
  const skipIntro = document.getElementById("skipIntro");
  const popup = document.getElementById("popup");
  const reveals = document.querySelectorAll(".reveal");

  const popupMessages = [
    "Hola, soy Facu 👋 Escribime por WhatsApp.",
    "¿Tenés una urgencia? Consultame ahora.",
    "Respondemos rápido y sin vueltas."
  ];

  let popupIndex = 0;
  let introFinished = false;
  let popupIntervalId = null;

  function startPopupLoop() {
    if (!popup || popupIntervalId) return;

    function showPopup() {
      popup.textContent = popupMessages[popupIndex];
      popup.classList.add("show");

      window.setTimeout(() => {
        popup.classList.remove("show");
      }, 3200);

      popupIndex = (popupIndex + 1) % popupMessages.length;
    }

    showPopup();
    popupIntervalId = window.setInterval(showPopup, 6200);
  }

  function finishIntro() {
    if (introFinished) return;
    introFinished = true;

    body.classList.add("site-ready");
    body.style.overflow = "";

    if (intro) {
      intro.style.transition = "opacity .28s ease, visibility .28s ease";
      intro.style.opacity = "0";
      intro.style.visibility = "hidden";

      window.setTimeout(() => {
        intro.remove();
      }, 320);
    }

    startPopupLoop();
  }

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    body.style.overflow = "hidden";
    window.setTimeout(finishIntro, 1650);
  } else {
    body.classList.add("site-ready");
    if (intro) intro.remove();
    startPopupLoop();
  }

  if (skipIntro) {
    skipIntro.addEventListener("click", finishIntro);
  }

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
})();
