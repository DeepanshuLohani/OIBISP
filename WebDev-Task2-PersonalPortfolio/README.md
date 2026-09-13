# Deepanshu Lohani — Personal Portfolio & Digital Résumé

A modern, responsive personal portfolio website built with **HTML5, CSS3, and lightweight vanilla JavaScript** for **Deepanshu Lohani** (Full-Stack Developer & Software Engineer).

---

## 🚀 How to Preview & Run

1. **Directly in Browser**:
   Open [index.html](file:///C:\Users\hp\.gemini\antigravity\scratch\WebDev-Task2-PersonalPortfolio\index.html) in any web browser:
   ```
   C:\Users\hp\.gemini\antigravity\scratch\WebDev-Task2-PersonalPortfolio\index.html
   ```
2. **Local HTTP Server (Optional)**:
   ```bash
   python -m http.server 8000 --directory "C:\Users\hp\.gemini\antigravity\scratch\WebDev-Task2-PersonalPortfolio"
   ```
   Then open `http://localhost:8000`.

---

## 📋 Feature Checklist Verification

| Feature | Implementation Details | Status |
| :--- | :--- | :---: |
| **Profile / Hero Section** | Name ("Deepanshu Lohani"), Role ("Full-Stack Developer & Software Engineer"), bio pitch, custom illustrated developer SVG avatar with glowing gradient border & live status ping, CTA buttons ("View Projects", "Get In Touch", "Resume"), and social quick links (GitHub, LinkedIn, Twitter/X, Email). | ✅ Complete |
| **About Me Section** | Multi-paragraph background describing engineering passions and interests, quick details list (Degree, Focus, Location, Languages), and 3 key metric cards (3+ Years Experience, 15+ Projects, 100% Code Standards). | ✅ Complete |
| **Skills Section** | Visual grid organized into 3 core categories: Frontend (HTML5, CSS3, JS, React, Next.js, Tailwind), Backend & Database (Node.js, Express, Python, PostgreSQL, MongoDB, REST APIs), and DevOps/Tools (Git, Docker, Postman, Linux, Vite, Vercel). | ✅ Complete |
| **Projects Section** | 3 featured projects: **DevFlow** (Kanban platform), **PulseCommerce** (Headless e-commerce), and **CloudTelemetry** (Metrics dashboard). Includes interactive visual previews, descriptions, tech stack tags, and links to GitHub repository & live demo. | ✅ Complete |
| **Experience Timeline** | Chronological résumé timeline covering full-stack development, software engineering internship, and B.Tech in Computer Science with bulleted accomplishments. | ✅ Complete |
| **Contact Section** | 4 direct contact cards (Email, LinkedIn, GitHub, Location) + interactive contact form with Name, Email, Subject, Message, and simulated feedback toast. | ✅ Complete |
| **Smooth Scrolling** | `scroll-behavior: smooth` enabled in CSS, with anchor links linking all header and footer items to respective section IDs (`#home`, `#about`, `#skills`, `#projects`, `#experience`, `#contact`). | ✅ Complete |
| **Consistent Branding** | Developer dark theme with Deep Obsidian (`#0A0E17`), Emerald (`#10B981`), and Cyan (`#06B6D4`) accents, paired with Google Fonts `Plus Jakarta Sans` and `JetBrains Mono`. | ✅ Complete |
| **Fully Responsive** | Built using CSS Grid and Flexbox, with media query breakpoints for desktop, tablet (`1024px`), mobile (`768px`), and small mobile (`480px`). Mobile drawer navigation and touch-friendly controls. | ✅ Complete |

---

## 🎨 Customizing Details

- **Update Links & Socials**: Search for `github.com` or `linkedin.com` in `index.html` and replace placeholders with your actual profile URLs.
- **Resume Download**: Update the `href` on the "Resume" button in the hero section to point to your PDF file (e.g. `href="assets/Deepanshu_Lohani_Resume.pdf"`).
