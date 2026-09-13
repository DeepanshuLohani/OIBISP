/**
 * Temperature Converter - Vanilla JavaScript (script.js)
 * High-precision scientific conversion between Celsius, Fahrenheit, and Kelvin.
 * Real-time validation, MDN-compliant constraint handling, absolute zero checks.
 */

(() => {
  'use strict';

  // --- Physical Constants & Limits ---
  const ABSOLUTE_ZERO = {
    celsius: -273.15,
    fahrenheit: -459.67,
    kelvin: 0
  };

  const UNIT_SYMBOLS = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K'
  };

  const UNIT_NAMES = {
    celsius: 'Celsius',
    fahrenheit: 'Fahrenheit',
    kelvin: 'Kelvin'
  };

  // --- DOM Elements ---
  const tempInput = document.getElementById('tempInput');
  const inputWrapper = document.getElementById('inputWrapper');
  const unitSelect = document.getElementById('unitSelect');
  const convertBtn = document.getElementById('convertBtn');
  const resetBtn = document.getElementById('resetBtn');
  const clearBtn = document.getElementById('clearBtn');
  const swapUnitBtn = document.getElementById('swapUnitBtn');

  const inputError = document.getElementById('inputError');
  const inputErrorText = document.getElementById('inputErrorText');
  const absZeroWarning = document.getElementById('absZeroWarning');
  const absZeroText = document.getElementById('absZeroText');

  const outCelsius = document.getElementById('outCelsius');
  const outFahrenheit = document.getElementById('outFahrenheit');
  const outKelvin = document.getElementById('outKelvin');

  const subCelsius = document.getElementById('subCelsius');
  const subFahrenheit = document.getElementById('subFahrenheit');
  const subKelvin = document.getElementById('subKelvin');

  const cardCelsius = document.getElementById('cardCelsius');
  const cardFahrenheit = document.getElementById('cardFahrenheit');
  const cardKelvin = document.getElementById('cardKelvin');

  const thermalStatusBadge = document.getElementById('thermalStatusBadge');
  const gaugeFill = document.getElementById('gaugeFill');
  const gaugeMarker = document.getElementById('gaugeMarker');

  const formulaContent = document.getElementById('formulaContent');
  const toast = document.getElementById('toast');
  const presetChips = document.querySelectorAll('.chip');
  const copyBtns = document.querySelectorAll('.copy-btn');

  // --- Math & Conversion Functions ---
  const Converter = {
    toCelsius(val, unit) {
      switch (unit) {
        case 'celsius': return val;
        case 'fahrenheit': return (val - 32) * (5 / 9);
        case 'kelvin': return val - 273.15;
        default: return NaN;
      }
    },

    fromCelsius(celsiusVal, targetUnit) {
      switch (targetUnit) {
        case 'celsius': return celsiusVal;
        case 'fahrenheit': return (celsiusVal * (9 / 5)) + 32;
        case 'kelvin': return celsiusVal + 273.15;
        default: return NaN;
      }
    },

    convertAll(value, sourceUnit) {
      const c = this.toCelsius(value, sourceUnit);
      return {
        celsius: this.fromCelsius(c, 'celsius'),
        fahrenheit: this.fromCelsius(c, 'fahrenheit'),
        kelvin: this.fromCelsius(c, 'kelvin')
      };
    },

    formatNumber(num) {
      if (!Number.isFinite(num)) return '--';
      // Round to 2 decimal places, or up to 4 if needed for small fractions
      const rounded = Math.round((num + Number.EPSILON) * 100) / 100;
      return rounded.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }
  };

  // --- Real-time Validation ---
  function validateInput(rawStr, unit) {
    const trimmed = rawStr.trim();

    if (trimmed === '') {
      return {
        isValid: false,
        errorMsg: 'Please enter a temperature value.',
        isAbsoluteZeroViolation: false
      };
    }

    // Reject non-numeric input (allow optional leading minus and single decimal point)
    const numericRegex = /^-?(\d+(\.\d*)?|\.\d+)$/;
    if (!numericRegex.test(trimmed)) {
      return {
        isValid: false,
        errorMsg: 'Invalid input: Please enter a valid numeric temperature (e.g., -10, 25, 98.6).',
        isAbsoluteZeroViolation: false
      };
    }

    const num = parseFloat(trimmed);
    if (isNaN(num)) {
      return {
        isValid: false,
        errorMsg: 'Please enter a valid numeric temperature value.',
        isAbsoluteZeroViolation: false
      };
    }

    // Check for theoretical absolute zero violation
    const minAllowed = ABSOLUTE_ZERO[unit];
    const isAbsZero = num < minAllowed;

    return {
      isValid: true,
      value: num,
      isAbsoluteZeroViolation: isAbsZero,
      absZeroLimit: minAllowed
    };
  }

  // --- UI Update Methods ---
  function updateUI() {
    const rawValue = tempInput.value;
    const currentUnit = unitSelect.value;
    const validation = validateInput(rawValue, currentUnit);

    // Highlight active input card
    [cardCelsius, cardFahrenheit, cardKelvin].forEach(card => {
      card.classList.toggle('is-active-input', card.dataset.unit === currentUnit);
    });

    if (!validation.isValid) {
      // Show error state
      showError(validation.errorMsg);
      hideAbsZeroWarning();
      setEmptyOutputs();
      resetGauge();
      renderFormulas(null, currentUnit);
      return;
    }

    // Clear regular error
    hideError();

    const val = validation.value;

    // Handle absolute zero violation
    if (validation.isAbsoluteZeroViolation) {
      showAbsZeroWarning(val, currentUnit, validation.absZeroLimit);
    } else {
      hideAbsZeroWarning();
    }

    // Perform conversions
    const results = Converter.convertAll(val, currentUnit);

    // Render output numbers
    outCelsius.textContent = Converter.formatNumber(results.celsius);
    outFahrenheit.textContent = Converter.formatNumber(results.fahrenheit);
    outKelvin.textContent = Converter.formatNumber(results.kelvin);

    // Update subtitles in cards
    updateCardSubtitles(val, currentUnit);

    // Update thermal gauge & thermal status
    updateGauge(results.celsius, validation.isAbsoluteZeroViolation);

    // Render step-by-step formulas
    renderFormulas(val, currentUnit, results);
  }

  function updateCardSubtitles(val, unit) {
    if (unit === 'celsius') {
      subCelsius.textContent = 'Active input';
      subFahrenheit.textContent = `(${val} × 9/5) + 32`;
      subKelvin.textContent = `${val} + 273.15`;
    } else if (unit === 'fahrenheit') {
      subCelsius.textContent = `(${val} - 32) × 5/9`;
      subFahrenheit.textContent = 'Active input';
      subKelvin.textContent = `(${val} - 32) × 5/9 + 273.15`;
    } else {
      subCelsius.textContent = `${val} - 273.15`;
      subFahrenheit.textContent = `(${val} - 273.15) × 9/5 + 32`;
      subKelvin.textContent = 'Active input';
    }
  }

  function showError(msg) {
    inputErrorText.textContent = msg;
    inputError.hidden = false;
    tempInput.classList.add('is-invalid');
    tempInput.setAttribute('aria-invalid', 'true');
  }

  function hideError() {
    inputError.hidden = true;
    tempInput.classList.remove('is-invalid');
    tempInput.setAttribute('aria-invalid', 'false');
  }

  function showAbsZeroWarning(val, unit, limit) {
    const symbol = UNIT_SYMBOLS[unit];
    absZeroText.textContent = `${val}${symbol} is below absolute zero (${limit}${symbol}). Classical thermodynamics prohibits temperatures below 0 Kelvin.`;
    absZeroWarning.hidden = false;
  }

  function hideAbsZeroWarning() {
    absZeroWarning.hidden = true;
  }

  function setEmptyOutputs() {
    outCelsius.textContent = '--';
    outFahrenheit.textContent = '--';
    outKelvin.textContent = '--';
    subCelsius.textContent = 'Awaiting valid input';
    subFahrenheit.textContent = 'Awaiting valid input';
    subKelvin.textContent = 'Awaiting valid input';
  }

  function resetGauge() {
    thermalStatusBadge.textContent = 'Awaiting input';
    thermalStatusBadge.style.background = 'rgba(255, 255, 255, 0.1)';
    thermalStatusBadge.style.color = 'var(--text-secondary)';
    gaugeFill.style.width = '0%';
    gaugeMarker.style.left = '0%';
  }

  function updateGauge(celsiusVal, isBelowAbsZero) {
    if (isBelowAbsZero) {
      thermalStatusBadge.textContent = '⚠️ Below Absolute Zero';
      thermalStatusBadge.style.background = 'rgba(56, 189, 248, 0.25)';
      thermalStatusBadge.style.color = '#7dd3fc';
      gaugeFill.style.width = '0%';
      gaugeMarker.style.left = '0%';
      return;
    }

    let statusText = '';
    let badgeBg = '';
    let badgeColor = '';

    if (celsiusVal <= -273.15) {
      statusText = 'Absolute Zero';
      badgeBg = 'rgba(56, 189, 248, 0.25)';
      badgeColor = '#38bdf8';
    } else if (celsiusVal < 0) {
      statusText = 'Sub-Zero Freezing';
      badgeBg = 'rgba(14, 165, 233, 0.2)';
      badgeColor = '#38bdf8';
    } else if (celsiusVal < 15) {
      statusText = 'Chilly / Cool';
      badgeBg = 'rgba(20, 184, 166, 0.2)';
      badgeColor = '#2dd4bf';
    } else if (celsiusVal <= 26) {
      statusText = 'Pleasant / Room Temp';
      badgeBg = 'rgba(16, 185, 129, 0.2)';
      badgeColor = '#34d399';
    } else if (celsiusVal <= 42) {
      statusText = 'Warm / Body Temp';
      badgeBg = 'rgba(245, 158, 11, 0.2)';
      badgeColor = '#fbbf24';
    } else if (celsiusVal < 100) {
      statusText = 'Hot / Approaching Boiling';
      badgeBg = 'rgba(249, 115, 22, 0.2)';
      badgeColor = '#fb923c';
    } else if (celsiusVal === 100) {
      statusText = 'Water Boiling Point';
      badgeBg = 'rgba(239, 68, 68, 0.25)';
      badgeColor = '#f87171';
    } else {
      statusText = 'Superheated / Extreme';
      badgeBg = 'rgba(220, 38, 38, 0.3)';
      badgeColor = '#fca5a5';
    }

    thermalStatusBadge.textContent = statusText;
    thermalStatusBadge.style.background = badgeBg;
    thermalStatusBadge.style.color = badgeColor;

    // Map Celsius scale [-40 to 120] to 0% - 100% for the gauge
    const minScale = -40;
    const maxScale = 120;
    let percentage = ((celsiusVal - minScale) / (maxScale - minScale)) * 100;
    percentage = Math.max(0, Math.min(100, percentage));

    gaugeFill.style.width = `${percentage}%`;
    gaugeMarker.style.left = `${percentage}%`;
  }

  function renderFormulas(val, unit, results) {
    if (val === null || !results) {
      formulaContent.innerHTML = '<p class="formula-empty">Enter a valid numeric value above to view the calculation breakdown.</p>';
      return;
    }

    let itemsHtml = '';

    if (unit === 'celsius') {
      itemsHtml += `
        <div class="formula-item">
          <strong>Celsius to Fahrenheit:</strong>
          <span class="formula-calc">°F = (°C × 9/5) + 32</span>
          <span>°F = (${val} × 1.8) + 32 = <strong>${Converter.formatNumber(results.fahrenheit)}°F</strong></span>
        </div>
        <div class="formula-item">
          <strong>Celsius to Kelvin:</strong>
          <span class="formula-calc">K = °C + 273.15</span>
          <span>K = ${val} + 273.15 = <strong>${Converter.formatNumber(results.kelvin)} K</strong></span>
        </div>
      `;
    } else if (unit === 'fahrenheit') {
      const stepC = Converter.formatNumber(results.celsius);
      itemsHtml += `
        <div class="formula-item">
          <strong>Fahrenheit to Celsius:</strong>
          <span class="formula-calc">°C = (°F - 32) × 5/9</span>
          <span>°C = (${val} - 32) × 0.5556 = <strong>${stepC}°C</strong></span>
        </div>
        <div class="formula-item">
          <strong>Fahrenheit to Kelvin:</strong>
          <span class="formula-calc">K = (°F - 32) × 5/9 + 273.15</span>
          <span>K = ${stepC} + 273.15 = <strong>${Converter.formatNumber(results.kelvin)} K</strong></span>
        </div>
      `;
    } else if (unit === 'kelvin') {
      const stepC = Converter.formatNumber(results.celsius);
      itemsHtml += `
        <div class="formula-item">
          <strong>Kelvin to Celsius:</strong>
          <span class="formula-calc">°C = K - 273.15</span>
          <span>°C = ${val} - 273.15 = <strong>${stepC}°C</strong></span>
        </div>
        <div class="formula-item">
          <strong>Kelvin to Fahrenheit:</strong>
          <span class="formula-calc">°F = (K - 273.15) × 9/5 + 32</span>
          <span>°F = (${stepC} × 1.8) + 32 = <strong>${Converter.formatNumber(results.fahrenheit)}°F</strong></span>
        </div>
      `;
    }

    formulaContent.innerHTML = itemsHtml;
  }

  function triggerShake() {
    inputWrapper.classList.remove('shake');
    void inputWrapper.offsetWidth; // Trigger reflow
    inputWrapper.classList.add('shake');
    setTimeout(() => {
      inputWrapper.classList.remove('shake');
    }, 450);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // --- Event Listeners ---

  // Live input update
  tempInput.addEventListener('input', () => {
    updateUI();
  });

  // Unit dropdown change
  unitSelect.addEventListener('change', () => {
    updateUI();
  });

  // Convert button click
  convertBtn.addEventListener('click', () => {
    const raw = tempInput.value;
    const unit = unitSelect.value;
    const validation = validateInput(raw, unit);

    if (!validation.isValid) {
      triggerShake();
    }
    updateUI();
  });

  // Enter key in input field
  tempInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      convertBtn.click();
    }
  });

  // Clear button click
  clearBtn.addEventListener('click', () => {
    tempInput.value = '';
    tempInput.focus();
    updateUI();
  });

  // Reset button click
  resetBtn.addEventListener('click', () => {
    tempInput.value = '25';
    unitSelect.value = 'celsius';
    hideError();
    hideAbsZeroWarning();
    tempInput.focus();
    updateUI();
    showToast('Reset to default (25°C)');
  });

  // Cycle / Swap Unit button click
  swapUnitBtn.addEventListener('click', () => {
    const units = ['celsius', 'fahrenheit', 'kelvin'];
    const currentIdx = units.indexOf(unitSelect.value);
    const nextIdx = (currentIdx + 1) % units.length;
    unitSelect.value = units[nextIdx];
    updateUI();
    showToast(`Switched unit to ${UNIT_NAMES[units[nextIdx]]}`);
  });

  // Common preset chips
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = chip.dataset.val;
      const unit = chip.dataset.unit;
      tempInput.value = val;
      unitSelect.value = unit;
      updateUI();
      showToast(`Loaded preset: ${chip.textContent}`);
    });
  });

  // Copy to clipboard buttons
  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const targetId = btn.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (!targetEl || targetEl.textContent === '--') return;

      const card = btn.closest('.result-card');
      const unitSymbol = card ? card.querySelector('.unit-symbol').textContent : '';
      const textToCopy = `${targetEl.textContent} ${unitSymbol}`.trim();

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied ${textToCopy} to clipboard!`);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied ${textToCopy} to clipboard!`);
      }
    });
  });

  // Initial render on page load
  updateUI();
})();
