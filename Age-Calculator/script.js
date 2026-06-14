document.addEventListener("DOMContentLoaded", () => {

  /* ================== GLOBAL ELEMENTS ================== */
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".content-section");
  const hamburger = document.querySelector(".hamburger");
  const headerNav = document.querySelector(".header__nav");
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  /* ================== THEME TOGGLE ================== */
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
    themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  }

  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    root.setAttribute("data-theme", isDark ? "light" : "dark");
    localStorage.setItem("theme", isDark ? "light" : "dark");
    themeToggle.textContent = isDark ? "🌙" : "☀️";
  });

  /* ================== HAMBURGER ================== */
  hamburger?.addEventListener("click", () => {
    headerNav.classList.toggle("active");
  });

  /* ================== SECTION SLIDE NAVIGATION ================== */
  let currentIndex = 0;

  const sectionOrder = [
    "home-section",
    "calculator-section",
    "features-section", 
    "about-section",
    "faq-section",
    "contact-section"
  ];

  function showSection(targetId) {
    const targetIndex = sectionOrder.indexOf(targetId);
    if (targetIndex === -1) return;

    if (ageTimer) {
      clearInterval(ageTimer);
      ageTimer = null;
    }

    const isForward = targetIndex > currentIndex;

    sections.forEach(sec => {
      if (sec.id !== targetId) {
        sec.classList.remove("active-section");
        sec.classList.add("hidden");
      }
    });

    const target = document.getElementById(targetId);
    target.classList.remove("hidden");
    target.style.transform = isForward ? "translateX(100%)" : "translateX(-100%)";

    requestAnimationFrame(() => {
      target.classList.add("active-section");
      target.style.transform = "translateX(0)";
    });

    currentIndex = targetIndex;
  }

  function activateNav(targetId) {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.target === targetId);
    });
  }

  /* ================== NAV LINK CLICK ================== */
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const targetId = link.dataset.target;
      showSection(targetId);
      activateNav(targetId);
      headerNav.classList.remove("active");
    });
  });

  /* ================== BUTTON NAVIGATION ================== */
  document.querySelectorAll("[data-target]:not(.nav-link)").forEach(el => {
    el.addEventListener("click", () => {
      const targetId = el.getAttribute("data-target");
      showSection(targetId);
      activateNav(targetId);
    });
  });

  /* ================== INITIAL LOAD ================== */
  showSection("home-section");
  activateNav("home-section");

  
/* ================== FAQ TOGGLE ================== */
document.querySelectorAll(".faq-question").forEach(q => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;
    const isOpen = q.classList.contains("active");

    // Close all
    document.querySelectorAll(".faq-question").forEach(item => {
      item.classList.remove("active");
      const a = item.nextElementSibling;
      a.style.maxHeight = "0px";
      a.style.opacity = "0";
      a.style.padding = "";
    });

    // Open selected
    if (!isOpen) {
      q.classList.add("active");

      // 👇 wait for layout update (THIS FIXES CUT TEXT)
      setTimeout(() => {
        answer.style.opacity = "1";
        answer.style.maxHeight = answer.scrollHeight + 40 + "px";
      }, 10);
    }
  });
});

  /* ================== AGE CALCULATOR ================== */
  const calculateBtn = document.getElementById("calculateBtn");
  const dobInput = document.getElementById("dob");
  const nameInput = document.getElementById("userName");
  const resultSummary = document.getElementById("resultSummary");
  const detailedResult = document.getElementById("detailedResult");
  const errorDisplay = document.getElementById("errorDisplay");

  const yearsSpan = document.getElementById("years");
  const monthsSpan = document.getElementById("months");
  const daysSpan = document.getElementById("days");
  const hoursSpan = document.getElementById("hours");
  const minutesSpan = document.getElementById("minutes");
  const secondsSpan = document.getElementById("seconds");

  let ageTimer = null;

  function typeWriter(text, el, speed = 45) {
    el.innerHTML = "";
    let i = 0;
    const span = document.createElement("span");
    span.className = "dear-text";
    el.appendChild(span);

    function type() {
      if (i < text.length) {
        span.textContent += text.charAt(i++);
        setTimeout(type, speed);
      }
    }
    type();
  }

  function updateAge(dob) {
    const now = new Date();
    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diff = now - dob;
    const totalSeconds = Math.floor(diff / 1000);
    const totalMinutes = Math.floor(diff / 60000);
    const totalHours = Math.floor(diff / 3600000);
    secondsSpan.textContent = totalSeconds % 60;
    minutesSpan.textContent = totalMinutes % 60;
    hoursSpan.textContent = totalHours % 24;

    yearsSpan.textContent = years;
    monthsSpan.textContent = months;
    daysSpan.textContent = days;
  }

  calculateBtn?.addEventListener("click", () => {
    const dobValue = dobInput.value;
    const name = nameInput.value.trim() || "Friend";

    if (!dobValue) {
      errorDisplay.textContent = "Please enter a valid date of birth.";
      errorDisplay.style.display = "block";
      return;
    }

    const dob = new Date(dobValue);
    const now = new Date();

    if (dob > now) {
      errorDisplay.textContent = "Date of birth cannot be in the future.";
      errorDisplay.style.display = "block";
      return;
    }

    if (isNaN(dob.getTime())) {
      errorDisplay.textContent = "Please enter a valid date.";
      errorDisplay.style.display = "block";
      return;
    }

    errorDisplay.style.display = "none";

    if (ageTimer) clearInterval(ageTimer);

    let age = now.getFullYear() - dob.getFullYear();
    if (
      now.getMonth() < dob.getMonth() ||
      (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
    ) {
      age--;
    }

    typeWriter(`Dear ${name}, you are ${age} years old today.`, resultSummary);
    detailedResult.classList.remove("hidden");

    updateAge(dob);
    ageTimer = setInterval(() => updateAge(dob), 1000);
  });

  /* ================== REVEAL ANIMATION ================== */
  const reveals = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));

});
