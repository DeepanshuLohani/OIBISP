# 🌡️ Temperature Converter Web Tool

An interactive, responsive web application built with **Vanilla HTML5, CSS3, and JavaScript** that converts temperature values seamlessly between **Celsius (°C)**, **Fahrenheit (°F)**, and **Kelvin (K)**. Includes real-time input validation, scientific absolute zero boundary checks, multi-unit simultaneous output, and dynamic formula breakdowns.

---

## 🚀 Features

- **Numeric Input & Real-Time Validation**:
  - Rejects non-numeric characters, multiple decimals, and malformed input with helpful error messages.
  - Aligns with MDN Web Docs input validation standards (`inputmode="decimal"`, `aria-invalid`, `aria-describedby`).
  - Animated visual feedback (subtle shake and border highlight on invalid input).
- **Unit Selector**:
  - Choose input unit via dropdown menu or cycle through units quickly using the **Cycle Unit** button.
  - Supports **Celsius (°C)**, **Fahrenheit (°F)**, and **Kelvin (K)**.
- **Simultaneous Multi-Unit Output**:
  - Displays all converted units at the same time in dedicated cards.
  - Active input card is highlighted for visual clarity.
- **Convert Action & Live Updates**:
  - Calculates live as you type.
  - Dedicated **⚡ Convert** button and `Enter` key support for explicit submission.
- **Edge Case & Absolute Zero Handling**:
  - Enforces physical laws of thermodynamics.
  - Displays an informative warning if input drops below theoretical absolute zero:
    - Below **−273.15°C**
    - Below **−459.67°F**
    - Below **0 K**
- **Thermal Status Gauge**:
  - Visual color-coded progress scale and badge indicating thermal state (*Absolute Zero*, *Sub-Zero Freezing*, *Chilly*, *Room Temp*, *Body Temp*, *Boiling Point*, *Superheated*).
- **Step-by-Step Formula Breakdown**:
  - Expandable accordion displaying the exact mathematical formula applied to each conversion step.
- **Quick Benchmark Chips**:
  - One-click presets for common reference temperatures:
    - Absolute Zero (−273.15°C)
    - Water Freezing (0°C / 32°F)
    - Room Temperature (21°C / ~70°F)
    - Human Body Temperature (37°C / 98.6°F)
    - Water Boiling Point (100°C / 212°F)
- **Copy to Clipboard**:
  - One-click copy buttons on each output card with animated toast feedback.

---

## 📐 Conversion Formulas

| From \ To | Celsius (°C) | Fahrenheit (°F) | Kelvin (K) |
| :--- | :--- | :--- | :--- |
| **Celsius (°C)** | — | $F = (C \times 9/5) + 32$ | $K = C + 273.15$ |
| **Fahrenheit (°F)** | $C = (F - 32) \times 5/9$ | — | $K = (F - 32) \times 5/9 + 273.15$ |
| **Kelvin (K)** | $C = K - 273.15$ | $F = (K - 273.15) \times 9/5 + 32$ | — |

---

## 📁 Project Structure

```text
WebDev-Task3-TemperatureConverter/
├── index.html          # Semantic HTML5 markup, ARIA accessibility attributes
├── style.css           # Modern CSS3 with custom properties, glassmorphism & responsive layout
├── script.js           # Vanilla JavaScript for validation, formulas, DOM & event handling
├── test_converter.py   # Automated test suite (conversions, regex validation & edge cases)
└── README.md           # Project documentation and usage guide
```

---

## 🛠️ Tech Stack

- **HTML5**: Semantic tags, accessible form controls, ARIA live regions.
- **CSS3**: CSS Custom Properties, Flexbox, CSS Grid, Glassmorphism, Keyframe animations, Mobile-first responsive design.
- **JavaScript (ES6+)**: Vanilla JS, zero third-party dependencies, modular architecture.
- **Python 3**: For automated testing and local server hosting.

---

## 🚦 Getting Started

### Method 1: Direct Browser Opening
Simply double-click [`index.html`](index.html) or drag it into any modern web browser (Chrome, Edge, Firefox, Safari).

### Method 2: Local HTTP Server
Run a lightweight server using Python:

```powershell
# Navigate to the project directory
cd C:\Users\hp\.gemini\antigravity\scratch\WebDev-Task3-TemperatureConverter

# Start local HTTP server on port 8080
python -m http.server 8080
```

Then visit:
```text
http://localhost:8080
```

---

## 🧪 Running the Automated Tests

The repository includes a Python test script ([`test_converter.py`](test_converter.py)) that validates all conversion mathematics, boundary conditions, and regex inputs.

Run the test suite via PowerShell:

```powershell
python test_converter.py
```

### Test Coverage Summary
- **Suite 1 (Formulas)**: 0°C, 100°C, -40° (crossover point), 98.6°F, 0 K, 212°F.
- **Suite 2 (Absolute Zero Checks)**: Boundary values for °C, °F, and K.
- **Suite 3 (Validation & Edge Cases)**: Empty input, negative numbers, decimals, invalid strings, extra decimals.
- **Pass Rate**: 31 / 31 tests passed (100%).

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).
