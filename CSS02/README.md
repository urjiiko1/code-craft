
# 🍂✨ Welcome to this Web Pages

Welcome to this Web login Pages project! 🎉 This collection features beautifully animated, modern web pages for Login, Sign Up, and Forget Password, crafted with a **glassmorphism aesthetic** and delightful **CSS animations**, creating a serene, atmospheric user experience. 🌅

---


**▶️ Live Demo:** **[View Project Live Here](https://urjiiko1.github.io/code-craft/CSS02/)** 🌐

---

## 📂 Project Structure

```plaintext
.
├── index.html          # Login Page (Main Entry) 📝
├── Register.html       # Sign Up Page ✍️
├── forget.html         # Forget Password Page 🔑
├── style.css           # Centralized CSS for all styling and animations 🎨
└── (Image Assets)      # Images: bg.jpg, girl.png, trees.png, leaf_01.png, etc. 🖼️
```

> **Note on Image Assets:**  
> This project relies on several image files like [`bg.jpg`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/bg.jpg), [`girl.png`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/girl.png), [`leaf_01.png`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/leaf_01.png) etc. that should be located in the same directory as  HTML and CSS files for the design and animations to display correctly. 📁

---

## ✨ Key Features & Highlights 🚀

This project blends modern UI design with captivating CSS animations:

- **🌫️ Glassmorphism User Interface:** All forms feature a sleek, translucent, frosted glass effect, making them appear modern and elegant.
- **🌬️ Dynamic Animated Background:** The pages come alive with continuous animations, including a girl on a bike moving across the screen and subtle, swaying trees.
- **🍁 Enchanting Falling Leaves:** A mesmerizing animation of autumn leaves gently falling creates a cozy, atmospheric backdrop.
- **💬 Pure CSS Toast Notifications:** Success messages (like "You login successfully!") appear as unobtrusive "toasts" at the bottom of the screen, implemented purely with CSS.
- **🔗 Seamless Navigation:** Easily navigate between Login, Sign Up, and Forget Password pages through clean, integrated links.

---

## 🎨 Key CSS Snippets ✏️

While the full styling resides in [`style.css`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/style.css), here are some core parts that drive the visual effects:

### 1. 🌟 Glassmorphism Forms

The `.VS` class creates the translucent, frosted effect on all form containers:

```css
.VS {
    background-color: rgba(255, 255, 255, 0.208); /* Translucent background */
    backdrop-filter: blur(10px); /* Frosted glass effect */
    border-radius: 15px;
    border: 0.5px solid rgba(255, 255, 255, 0.56);
    box-shadow: 1px 1px 25px rgba(0, 0, 0, 0.097);
}
```

### 2. 🌳 Animation Highlights

#### Falling Leaves (`@keyframes animateLeaves`)

To achieve a natural, non-uniform falling effect, each leaf (`div` within `.leaves .set`) has a specific `animation-delay` and `animation-duration`, creating a realistic, gentle descent.

```css
.leaves .set div:nth-child(1) { left: 20%; animation-delay: 0s; animation-duration: 12s; }
.leaves .set div:nth-child(2) { left: 50%; animation-delay: 3s; animation-duration: 10s; }
.leaves .set div:nth-child(3) { left: 70%; animation-delay: 6s; animation-duration: 15s; }
.leaves .set div:nth-child(4) { left: 0%; animation-delay: 9s; animation-duration: 11s; }
.leaves .set div:nth-child(5) { left: 85%; animation-delay: 12s; animation-duration: 13s; }
.leaves .set div:nth-child(6) { left: 15%; animation-delay: 15s; animation-duration: 9s; }
.leaves .set div:nth-child(7) { left: 60%; animation-delay: 18s; animation-duration: 16s; }
.leaves .set div:nth-child(8) { left: 35%; animation-delay: 21s; animation-duration: 14s; }

@keyframes animateLeaves {
    0%   { opacity: 0; top: -10%; transform: translateX(0) rotate(0deg); }
    10%  { opacity: 1; }
    20%  { transform: translateX(-20px) rotate(45deg); }
    40%  { transform: translateX(-40px) rotate(90deg); }
    60%  { transform: translateX(-20px) rotate(135deg); }
    80%  { transform: translateX(0px) rotate(180deg); }
    100% { top: 110%; transform: translateX(50px) rotate(225deg); opacity: 0; }
}
```

#### Moving Girl (`@keyframes moveBikeLeft`)

Creates the illusion of a girl on a bike moving across the background:

```css
@keyframes moveBikeLeft {
    0%   { transform: translateX(100vw); }  /* Starts off-screen right */
    100% { transform: translateX(-100vw); } /* Moves off-screen left */
}
```

### 3. 💬 CSS Toast Notifications

Success messages (`.toast1`, `.toast2`, `.toast3`) appear when the hidden checkbox `#popupTrigger` is checked, then fade out smoothly:

```css
.toast1, .toast2, .toast3 {
    opacity: 0; /* Hidden by default */
    visibility: hidden;
    transition: opacity 0.5s, bottom 0.5s;
}

#popupTrigger:checked ~ .toast1 {
    opacity: 1;
    visibility: visible;
    animation: fadeout 3s forwards; /* Fade out after appearing */
}

@keyframes fadeout {
    0%   { opacity: 1; bottom: 40px; }
    80%  { opacity: 1; }
    100% { opacity: 0; bottom: 30px; visibility: hidden; }
}
```

---

## 🚀 Getting Started

Follow these steps to set up and view the project locally:

1. **Save Files:** Place all HTML files [`index.html`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/index.html), [`Register.html`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/Register.html) [`forget.html`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/forget.html) and [`style.css`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/style.css) into a single folder.
2. **Add Image Assets:** Ensure all images [`bg.jpg`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/bg.jpg), [`girl.png`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/girl.png), [`trees.png`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/trees.png), leaf images, etc.) are in the same folder.
3. **Open in Browser:** Double-click [`index.html`](https://github.com/urjiiko1/code-craft/blob/main/CSS02/index.html) or open it via your preferred browser.
4. **Navigate & Explore:** Visit the Sign Up and Forget Password pages through the links to experience the full animated flow.

---

## 🤝 Contributing

Feel free to modify and improve this project! Your ideas for enhancing the design, adding functionalities or customizing animations are most welcome. 💖


-------


## 🔮 Future Enhancements

Here are some ideas for potential future improvements to this project:

📱 **Responsive Optimization:** Further refine responsiveness for an even smoother experience across a wider range of devices.

✨ **More Animations:** Introduce additional subtle animations, such as parallax scrolling effects for background elements or dynamic weather conditions.

🔒 **User Authentication (Backend):** Implement server-side logic and a database for actual user registration, login, and secure data handling.

🎨 **Theming Options:** Add options for users to switch between different seasonal themes (e.g., winter wonderland ❄️, spring bloom 🌸) or custom color schemes.

♿ **Accessibility Improvements:** Enhance accessibility features (e.g., keyboard navigation, ARIA attributes) for a more inclusive user experience.


----



## 📜 License

This project is open-source and free to use, modify and distribute.

-----

## 👤 My Profile

Connect with me and see more of my work here:

[`GitHub Profile`](https://github.com/urjiiko1) 🔗

[`LinkedIn Profile`](https://www.linkedin.com/in/gemachis-tesfaye-137196318) 💼

[`Telegram`](https://t.me/urjiiko1) 🌐

Website/Portfolio **Soon** 🚀



----
## 📅 Date of Completion


This project was completed on: July 28, 2025 🗓️

---

