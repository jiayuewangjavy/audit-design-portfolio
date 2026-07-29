(() => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      const restoreAnchor = () => target.scrollIntoView({ block: "start" });
      requestAnimationFrame(restoreAnchor);
      document.fonts?.ready.then(restoreAnchor);
    }
  }

  const pins = [...document.querySelectorAll(".annotation-pin")];
  const plateFindings = [...document.querySelectorAll(".plate-finding")];

  function setActive(id) {
    pins.forEach((pin) => pin.classList.toggle("is-active", pin.dataset.finding === id));
    plateFindings.forEach((finding) => {
      finding.classList.toggle("is-active", finding.dataset.finding === id);
    });
  }

  pins.forEach((pin) => {
    pin.addEventListener("mouseenter", () => setActive(pin.dataset.finding));
    pin.addEventListener("focus", () => setActive(pin.dataset.finding));
    pin.addEventListener("click", () => setActive(pin.dataset.finding));
  });

  plateFindings.forEach((finding) => {
    finding.addEventListener("mouseenter", () => setActive(finding.dataset.finding));
    finding.addEventListener("focusin", () => setActive(finding.dataset.finding));
  });

  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      document.querySelectorAll(".finding-detail").forEach((finding) => {
        const visible = filter === "all" || finding.dataset.priority === filter;
        finding.hidden = !visible;
      });
    });
  });

  const sections = [...document.querySelectorAll(".chapter[id]")];
  const navLinks = [...document.querySelectorAll(".report-nav a")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!current) return;
        navLinks.forEach((link) => {
          link.setAttribute(
            "aria-current",
            String(link.getAttribute("href") === `#${current.target.id}`)
          );
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0.1, 0.35] }
    );
    sections.forEach((section) => observer.observe(section));
  }
})();
