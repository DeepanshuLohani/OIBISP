# Nova AI — Modern Static Landing Page

A visually polished, responsive static landing page for **Nova AI**—a high-velocity team workspace and autonomous AI agent platform.

Built with **pure HTML5 and CSS3** (zero JavaScript required).

---

## 🚀 Live Preview / How to Open

You can view the page immediately in any web browser:

1. **Directly**: Double-click or open `index.html` in your browser:
   ```
   C:\Users\hp\.gemini\antigravity\scratch\WebDev-L1-LandingPage\index.html
   ```
2. **Local HTTP Server** (Optional):
   ```bash
   npx serve C:\Users\hp\.gemini\antigravity\scratch\WebDev-L1-LandingPage
   # or with Python:
   cd C:\Users\hp\.gemini\antigravity\scratch\WebDev-L1-LandingPage
   python -m http.server 3000
   ```

---

## 📋 Feature Checklist Verification

| Feature | Implementation Details | Status |
| :--- | :--- | :---: |
| **Sticky Navigation Bar** | Pinned to top with `position: sticky; top: 0; z-index: 1000;`, glassmorphic backdrop blur (`backdrop-filter: blur(14px)`), brand logo mark, 4 nav links (Features, How It Works, Testimonials, Pricing), and CTA button. | ✅ Complete |
| **Hero Section** | Eye-catching announcement badge ("Nova 2.0"), gradient headline (`clamp()` scaled), clear subheadline, dual action buttons ("Start 14-Day Free Trial", "Watch 2-Min Demo"), and a pure CSS interactive-style dashboard UI mockup preview. | ✅ Complete |
| **Social Proof Strip** | "Trusted by" logo cloud featuring 5 tech partner brands with sleek inline SVGs. | ✅ Complete |
| **Distinct Content Sections** | **1. Features Grid**: 6 bento-style feature cards with custom SVG icons and hover lifts.<br>**2. How It Works**: 3-step numbered workflow timeline.<br>**3. Testimonials**: 3 verified customer quotes with avatars, roles, and 5-star ratings.<br>**4. Pricing**: 3 transparent tiers (Starter, Pro with popular badge, Enterprise). | ✅ Complete |
| **CTA Banner Section** | High-conversion closing banner with radial glow effect, subtext, and quick signup buttons. | ✅ Complete |
| **Comprehensive Footer** | 4-column layout with brand mission, newsletter input box, links for Product, Resources, Company, hiring pill badge, copyright, and 4 SVG social icons (X, GitHub, LinkedIn, Discord). | ✅ Complete |
| **Consistent Colour Palette** | CSS Custom Properties (`:root`) with Deep Obsidian (`#090D16`), Midnight Surface (`#0D1322`), Indigo (`#6366F1`), Violet (`#8B5CF6`), Cyan (`#06B6D4`), and Emerald (`#10B981`). | ✅ Complete |
| **Responsive Layout** | Fully responsive using CSS Grid (`auto-fit`, `minmax()`), Flexbox, and media queries at `1024px`, `768px`, and `480px`. Tested to ensure zero horizontal scrolling or breaking on mobile devices down to 320px width. | ✅ Complete |
| **No Element Overlap** | Universal `box-sizing: border-box; margin: 0; padding: 0;` reset, structured spacing scale (`--space-xs` to `--space-4xl`), and intentional margins/paddings. | ✅ Complete |
| **Clean Typography** | Google Font `Plus Jakarta Sans` with 8 size scale levels (`--font-size-xs` through `--font-size-5xl`) and distinct weights (400, 500, 600, 700, 800) for heading vs. body hierarchy. | ✅ Complete |
| **Pure HTML/CSS** | Zero JavaScript dependencies or external runtime libraries. | ✅ Complete |

---

## 🎨 Design Decisions & Layout Highlights

- **Visual Depth**: Utilizes subtle multi-layer borders (`rgba(255, 255, 255, 0.08)`), radial gradient glows, and card elevation shadows.
- **Glassmorphism**: Backdrop blur used on the sticky navigation and dashboard mockup elements for a modern tech feel.
- **Accessibility**: Semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), descriptive ARIA labels, and high-contrast text ratios for readability.
