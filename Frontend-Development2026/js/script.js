(() => {
  // Salary Calculator
  function calculateSalary() {
    const exp = document.getElementById("expLevel").value;
    const loc = parseFloat(document.getElementById("calcLocation").value);
    let base = 0;

    if (exp === "junior") base = 65000;
    else if (exp === "mid") base = 95000;
    else base = 135000;

    const final = Math.round(base * loc);
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(final);

    const resultBox = document.getElementById("salaryResult");
    const display = document.getElementById("salaryDisplay");

    resultBox.classList.remove("hidden");
    display.innerText = formatted;
  }

  // Quiz
  function submitQuiz() {
    const selected = document.querySelector('input[name="framework"]:checked');
    if (!selected) {
      alert("Please select an option!");
      return;
    }
    alert(
      `We recommend focusing on ${selected.value}! It matches your development philosophy perfectly.`
    );
  }

  function addTodo() {
    const input = document.getElementById("todoInput");
    const text = input.value.trim();
    if (!text) return;

    const li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-slate-800 p-4 rounded-xl border border-slate-700";

    const span = document.createElement("span");
    span.className = "task-text text-slate-200";
    span.textContent = text;

    const btns = document.createElement("div");
    btns.className = "task-buttons flex gap-2";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete-btn";
    completeBtn.title = "Mark Complete";
    completeBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
    completeBtn.addEventListener("click", () => {
      span.classList.toggle("line-through");
      span.classList.toggle("text-slate-400");
    });

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.title = "Edit Task";
    editBtn.innerHTML = '<i class="fas fa-edit"></i>';
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit your task:", span.textContent);
      if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.title = "Delete Task";
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    btns.appendChild(completeBtn);
    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(btns);

    document.getElementById("todoList").appendChild(li);
    input.value = "";
  }

  // Table Filtering
  document
    .getElementById("courseSearch")
    .addEventListener("input", filterTable);
  document
    .getElementById("levelFilter")
    .addEventListener("change", filterTable);

  function filterTable() {
    const query = document
      .getElementById("courseSearch")
      .value.toLowerCase();
    const level = document.getElementById("levelFilter").value;
    const rows = document.querySelectorAll("#courseTableBody tr");

    rows.forEach((row) => {
      const text = row.innerText.toLowerCase();
      const matchesSearch = text.includes(query);
      const matchesLevel =
        level === "All" || text.includes(level.toLowerCase());
      row.style.display = matchesSearch && matchesLevel ? "" : "none";
    });
  }

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll("nav a, #mobile-menu a");

  let lastScrollY = window.scrollY;

  hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
    mobileMenu.classList.toggle("hidden");

    const icon = hamburgerBtn.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
      mobileMenu.classList.add("hidden");

      const icon = hamburgerBtn.querySelector("i");
      icon.classList.add("fa-bars");
      icon.classList.remove("fa-times");
    });
  });

  window.addEventListener("scroll", () => {
    const fromTop = window.scrollY + 80;

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const section = document.querySelector(href);
      if (!section) return;

      if (
        section.offsetTop <= fromTop &&
        section.offsetTop + section.offsetHeight > fromTop
      ) {
        navLinks.forEach((l) => l.classList.remove("nav-active"));
        link.classList.add("nav-active");
      }
    });

    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      header.classList.add("header-hide");
    } else {
      header.classList.remove("header-hide");
    }

    lastScrollY = window.scrollY;
  });

  // Expose functions for inline onclick handlers in HTML
  window.calculateSalary = calculateSalary;
  window.submitQuiz = submitQuiz;
  window.addTodo = addTodo;
})();
