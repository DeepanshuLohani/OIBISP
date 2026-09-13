"""
Test Suite for Temperature Converter Calculations & Validation
"""
import re
import math

ABSOLUTE_ZERO = {
    'celsius': -273.15,
    'fahrenheit': -459.67,
    'kelvin': 0.0
}

def to_celsius(val, unit):
    if unit == 'celsius':
        return val
    elif unit == 'fahrenheit':
        return (val - 32.0) * (5.0 / 9.0)
    elif unit == 'kelvin':
        return val - 273.15
    raise ValueError(f"Unknown unit: {unit}")

def from_celsius(c, target_unit):
    if target_unit == 'celsius':
        return c
    elif target_unit == 'fahrenheit':
        return (c * (9.0 / 5.0)) + 32.0
    elif target_unit == 'kelvin':
        return c + 273.15
    raise ValueError(f"Unknown target unit: {target_unit}")

def convert_all(val, unit):
    c = to_celsius(val, unit)
    return {
        'celsius': from_celsius(c, 'celsius'),
        'fahrenheit': from_celsius(c, 'fahrenheit'),
        'kelvin': from_celsius(c, 'kelvin')
    }

def validate_input(raw_str, unit):
    trimmed = raw_str.strip()
    if not trimmed:
        return {'is_valid': False, 'error': 'Empty'}
    
    numeric_regex = r'^-?(\d+(\.\d*)?|\.\d+)$'
    if not re.match(numeric_regex, trimmed):
        return {'is_valid': False, 'error': 'Non-numeric'}
    
    try:
        num = float(trimmed)
    except ValueError:
        return {'is_valid': False, 'error': 'Parse error'}
    
    is_abs_zero = num < ABSOLUTE_ZERO[unit]
    return {
        'is_valid': True,
        'value': num,
        'is_abs_zero_violation': is_abs_zero
    }

def run_tests():
    passed = 0
    total = 0

    def assert_almost_equal(a, b, delta=0.01, test_name=""):
        nonlocal passed, total
        total += 1
        if abs(a - b) <= delta:
            passed += 1
            print(f"  [PASS] {test_name}: {a:.2f} ~= {b:.2f}")
        else:
            print(f"  [FAIL] {test_name}: Expected {b:.2f}, got {a:.2f}")

    def assert_true(cond, test_name=""):
        nonlocal passed, total
        total += 1
        if cond:
            passed += 1
            print(f"  [PASS] {test_name}")
        else:
            print(f"  [FAIL] {test_name}")

    print("=== TEST SUITE 1: Conversion Formulas ===")
    
    # 0°C -> 32°F, 273.15 K
    res = convert_all(0, 'celsius')
    assert_almost_equal(res['fahrenheit'], 32.0, test_name="0°C to °F")
    assert_almost_equal(res['kelvin'], 273.15, test_name="0°C to K")

    # 100°C -> 212°F, 373.15 K
    res = convert_all(100, 'celsius')
    assert_almost_equal(res['fahrenheit'], 212.0, test_name="100°C to °F")
    assert_almost_equal(res['kelvin'], 373.15, test_name="100°C to K")

    # -40°C -> -40°F (cross-over point)
    res = convert_all(-40, 'celsius')
    assert_almost_equal(res['fahrenheit'], -40.0, test_name="-40°C to °F (crossover)")
    assert_almost_equal(res['kelvin'], 233.15, test_name="-40°C to K")

    # 98.6°F -> 37°C
    res = convert_all(98.6, 'fahrenheit')
    assert_almost_equal(res['celsius'], 37.0, test_name="98.6°F to °C")
    assert_almost_equal(res['kelvin'], 310.15, test_name="98.6°F to K")

    # 0 K -> -273.15°C, -459.67°F
    res = convert_all(0, 'kelvin')
    assert_almost_equal(res['celsius'], -273.15, test_name="0 K to °C")
    assert_almost_equal(res['fahrenheit'], -459.67, test_name="0 K to °F")

    print("\n=== TEST SUITE 2: Absolute Zero Edge Cases ===")
    # -273.15°C is exactly absolute zero -> violation should be False
    v = validate_input("-273.15", 'celsius')
    assert_true(v['is_valid'] and not v['is_abs_zero_violation'], "C: -273.15 is valid, not violation")

    # -274°C is below absolute zero -> violation should be True
    v = validate_input("-274", 'celsius')
    assert_true(v['is_valid'] and v['is_abs_zero_violation'], "C: -274 is below absolute zero violation")

    # -460°F is below absolute zero -> violation should be True
    v = validate_input("-460", 'fahrenheit')
    assert_true(v['is_valid'] and v['is_abs_zero_violation'], "F: -460 is below absolute zero violation")

    # -1 K is below absolute zero -> violation should be True
    v = validate_input("-1", 'kelvin')
    assert_true(v['is_valid'] and v['is_abs_zero_violation'], "K: -1 is below absolute zero violation")

    # 0 K is absolute zero -> violation should be False
    v = validate_input("0", 'kelvin')
    assert_true(v['is_valid'] and not v['is_abs_zero_violation'], "K: 0 is valid, not violation")

    print("\n=== TEST SUITE 3: Input Validation & String Edge Cases ===")
    valid_inputs = ["0", "25", "-10", "36.6", ".5", "100.000", "-0.15"]
    for inp in valid_inputs:
        v = validate_input(inp, 'celsius')
        assert_true(v['is_valid'], f"Valid input recognized: '{inp}'")

    invalid_inputs = ["", "  ", "abc", "12a", "25..5", "--5", "++10", "NaN", "e10"]
    for inp in invalid_inputs:
        v = validate_input(inp, 'celsius')
        assert_true(not v['is_valid'], f"Invalid input correctly rejected: '{inp}'")

    print(f"\n==========================================")
    print(f"Results: {passed}/{total} tests passed ({passed/total*100:.1f}%)")
    print(f"==========================================")

    if passed != total:
        exit(1)

if __name__ == '__main__':
    run_tests()
