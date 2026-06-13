document.addEventListener("DOMContentLoaded", () => {
  // 1. INITIALIZE ICONS AND DATE
  lucide.createIcons();
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. DOM ELEMENTS
  const pages = document.querySelectorAll(".page");
  const navBtns = document.querySelectorAll(".nav-btn");
  const sidebar = document.getElementById("sidebar");
  const menuToggle = document.getElementById("menuToggle");
  const scrollArea = document.querySelector(".scroll-area");

  // 3. NAVIGATION LOGIC
  window.switchPage = (pageId) => {
    navBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.page === pageId);
    });
    pages.forEach((page) => {
      page.classList.toggle("active", page.id === pageId);
    });
    if (sidebar) sidebar.classList.remove("active");
    if (scrollArea) scrollArea.scrollTo({ top: 0, behavior: "smooth" });
  };

  navBtns.forEach((btn) => {
    btn.onclick = () => {
      if (btn.id === "themeToggleBtn") return;
      if (btn.dataset.page) switchPage(btn.dataset.page);
    };
  });

  // 4. MOBILE MENU TOGGLE
  if (menuToggle && sidebar) {
    menuToggle.onclick = (e) => {
      e.stopPropagation();
      sidebar.classList.toggle("active");
    };
  }

  document.addEventListener("click", (e) => {
    if (
      window.innerWidth <= 1000 &&
      sidebar &&
      sidebar.classList.contains("active")
    ) {
      if (!sidebar.contains(e.target) && e.target !== menuToggle) {
        sidebar.classList.remove("active");
      }
    }
  });

  // 5. THEME LOGIC (DARK MODE DEFAULT + ICON SWAP)
  const themeBtn = document.getElementById("themeToggleBtn");

  const setDarkMode = (dark) => {
    // Apply attributes to HTML tag
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );

    // Handle Icon Swap (Lucide specific)
    const themeIcon = document.getElementById("themeIcon");
    if (themeIcon) {
      const newIcon = document.createElement("i");
      newIcon.id = "themeIcon";
      // If theme is dark, show Sun. If light, show Moon.
      newIcon.setAttribute("data-lucide", dark ? "sun" : "moon");
      themeIcon.replaceWith(newIcon);
      lucide.createIcons(); // Re-render the new icon
    }

    localStorage.setItem("theme_pref", dark ? "dark" : "light");
  };

  // Initialize Theme (Default to Dark)
  const savedTheme = localStorage.getItem("theme_pref") || "dark";
  setDarkMode(savedTheme === "dark");

  if (themeBtn) {
    themeBtn.onclick = () => {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      setDarkMode(!isDark);
    };
  }

  // 6. NOTIFICATION SYSTEM
  const showToast = (msg) => {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2000);
  };

  const copyToClipboard = (text) => {
    if (!text || text.includes("*") || text.includes("Waiting")) return;
    navigator.clipboard
      .writeText(text)
      .then(() => showToast("Copied to Clipboard!"));
  };

  // 7. GENERATOR CORE LOGIC & DYNAMIC BLINK
  const lengthIn = document.getElementById("length");
  const lengthVal = document.getElementById("lengthValue");
  const glowBox = document.getElementById("glowBox");

  if (lengthIn) {
    lengthIn.oninput = () => {
      const val = lengthIn.value;
      if (lengthVal) lengthVal.textContent = `${val} Characters`;

      // Update Rainbow Blink Speed based on password length
      if (glowBox) {
        let newSpeed = 1.5 - val / 50;
        if (newSpeed < 0.3) newSpeed = 0.3;
        glowBox.style.setProperty("--blink-speed", `${newSpeed}s`);
      }
    };
  }

  const genBtn = document.getElementById("generateBtn");
  if (genBtn) {
    genBtn.onclick = () => {
      let charset = "";
      if (document.getElementById("upper").checked)
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (document.getElementById("lower").checked)
        charset += "abcdefghijklmnopqrstuvwxyz";
      if (document.getElementById("numberHard").checked)
        charset += "0123456789";
      if (document.getElementById("symbolHard").checked)
        charset += "!@#$%^&*()_+=-";

      if (!charset) return showToast("Select at least one option!");

      let res = "";
      const length = parseInt(lengthIn.value);
      const bytes = new Uint32Array(length);
      window.crypto.getRandomValues(bytes);
      for (let i = 0; i < length; i++) {
        res += charset[bytes[i] % charset.length];
      }

      const display = document.getElementById("passwordDisplay");
      if (display) display.textContent = res;
      updateStrength(res);
      saveHistory(res);
    };
  }

  const updateStrength = (pwd) => {
    let s = 0;
    if (pwd.length > 12) s++;
    if (pwd.length > 18) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;

    const bar = document.getElementById("strengthBar");
    const txt = document.getElementById("strengthText");
    const colors = [
      "#ef4444",
      "#ef4444",
      "#f59e0b",
      "#10b981",
      "#4f46e5",
      "#f97316",
    ];
    const labels = [
      "WEAK",
      "POOR",
      "MEDIUM",
      "STRONG",
      "V. STRONG",
      "UNBREAKABLE",
    ];

    if (bar) {
      bar.style.width = ((s + 1) / 6) * 100 + "%";
      bar.style.background = colors[s];
    }
    if (txt) txt.textContent = `STRENGTH: ${labels[s]}`;
  };

  const mBtn = document.getElementById("mnemonicBtn");
  if (mBtn) {
    mBtn.onclick = () => {
      const words = [
        "Apple",
        "River",
        "Storm",
        "Stone",
        "Tiger",
        "Ocean",
        "Flame",
        "Light",
        "Night",
        "Space",
        "Water",
        "Earth",
        "Ghost",
        "Music",
        "Dream",
      ];
      const res =
        words
          .sort(() => 0.5 - Math.random())
          .slice(0, 4)
          .join("-") + Math.floor(Math.random() * 99);
      const display = document.getElementById("passwordDisplay");
      if (display) display.textContent = res;
      updateStrength(res);
      saveHistory(res);
    };
  }

  // 8. EASY MODE LOGIC
  const easyInputs = document.querySelectorAll(".easy-in");
  const buildEasyBtn = document.getElementById("buildEasyBtn");

  const validateEasy = () => {
    const inputs = Array.from(easyInputs);
    const filledCount = inputs.filter((i) => i.value.trim().length > 0).length;
    const hasNumber = inputs.some((i) => /\d/.test(i.value));
    const hasSymbol = inputs.some((i) => /[!@#$%^&*()_+=-]/.test(i.value));

    if (buildEasyBtn) {
      const isValid = filledCount >= 4 && hasNumber && hasSymbol;
      buildEasyBtn.disabled = !isValid;
      buildEasyBtn.style.opacity = isValid ? "1" : "0.5";
      buildEasyBtn.style.cursor = isValid ? "pointer" : "not-allowed";
    }
  };

  easyInputs.forEach((i) => (i.oninput = validateEasy));

  if (buildEasyBtn) {
    buildEasyBtn.onclick = () => {
      let parts = [];
      easyInputs.forEach((input) => {
        let val = input.value.trim();
        if (val) {
          if (isNaN(val)) {
            val = val
              .split("")
              .map((char) =>
                Math.random() > 0.8 ? char.toUpperCase() : char.toLowerCase()
              )
              .join("");
            val = val.charAt(0).toUpperCase() + val.slice(1);
          }
          parts.push(val);
        }
      });

      parts.sort(() => Math.random() - 0.5);
      const saltChars = "!@#$%*";
      const salt = saltChars[Math.floor(Math.random() * saltChars.length)];
      let finalPwd = parts.join(salt);

      const eDisplay = document.getElementById("easyDisplay");
      if (eDisplay) {
        eDisplay.textContent = finalPwd;
        eDisplay.style.color = "var(--primary)";
      }
      saveHistory(finalPwd);
      showToast("Secure Memorable PWD Created!");
    };
  }

  // 9. HISTORY / VAULT LOGIC
  const saveHistory = (pwd) => {
    let h = JSON.parse(localStorage.getItem("pwdHistory") || "[]");
    if (h.length > 0 && h[0].pwd === pwd) return;
    h.unshift({ pwd, time: new Date().toLocaleTimeString() });
    localStorage.setItem("pwdHistory", JSON.stringify(h.slice(0, 20)));
    renderHistory();
  };

  const deleteItem = (index) => {
    let h = JSON.parse(localStorage.getItem("pwdHistory") || "[]");
    h.splice(index, 1);
    localStorage.setItem("pwdHistory", JSON.stringify(h));
    renderHistory();
    showToast("Deleted from Vault");
  };

  function renderHistory() {
    const h = JSON.parse(localStorage.getItem("pwdHistory") || "[]");
    const list = document.getElementById("historyList");
    if (!list) return;

    list.innerHTML = h.length
      ? ""
      : "<li style='text-align:center; opacity:0.5; padding:40px; font-weight:800;'>VAULT IS EMPTY</li>";

    h.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "history-item";
      li.innerHTML = `
                <div>
                    <div class="history-pwd-text">${item.pwd}</div>
                    <div class="history-meta" style="font-size:0.7rem; opacity:0.5;">${item.time}</div>
                </div>
                <div class="history-actions">
                    <button class="action-icon-btn del-btn delete-item" title="Delete"><i data-lucide="trash-2"></i></button>
                </div>
            `;
      li.querySelector(".delete-item").onclick = (e) => {
        e.stopPropagation();
        deleteItem(index);
      };
      li.onclick = () => copyToClipboard(item.pwd);
      list.appendChild(li);
    });
    lucide.createIcons();
  }

  // 10. GLOBAL ACTIONS
  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn)
    copyBtn.onclick = () =>
      copyToClipboard(document.getElementById("passwordDisplay").textContent);

  const copyEasyBtn = document.getElementById("copyEasyBtn");
  if (copyEasyBtn)
    copyEasyBtn.onclick = () =>
      copyToClipboard(document.getElementById("easyDisplay").textContent);

  const clearBtn = document.getElementById("clearHistory");
  if (clearBtn) {
    clearBtn.onclick = () => {
      if (confirm("Clear all saved passwords?")) {
        localStorage.removeItem("pwdHistory");
        renderHistory();
      }
    };
  }

  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) {
    exportBtn.onclick = () => {
      const h = JSON.parse(localStorage.getItem("pwdHistory") || "[]");
      if (!h.length) return showToast("History is empty!");
      const text = h.map((x) => `${x.time} -> ${x.pwd}`).join("\n");
      const blob = new Blob([text], { type: "text/plain" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `vault_backup.txt`;
      a.click();
    };
  }

  renderHistory();
});

const showToast = (msg) => {
  const toast = document.getElementById("toast"); // Must match id="toast"
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");

  // Hide it again after 2 seconds
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
};

document.getElementById("year").textContent = new Date().getFullYear();
