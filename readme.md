# Polynomial Constant Term Calculator

**Duration:** 1.5 hours

**Testing Environment/IDE:** Use any IDE or environment you are comfortable with.

**Language:** JavaScript

**Submission:** Push your code to GitHub and add the link in the submission form along with outputs.

## Problem Statement

In this assignment, you'll develop a web application that calculates the constant term of a polynomial based on provided JSON data.

### Background

You are given a polynomial of degree `m` in the form:

\[ f(x) = a_m x^m + a_{m-1} x^{m-1} + \ldots + a_1 x + c \]

Where:

- `f(x)` is the polynomial function
- `m` is the degree of the polynomial
- \( a_m, a_{m-1}, \ldots, a_1, c \) are coefficients
- `a_m ≠ 0` ensures the polynomial is of degree `m`

The constant term `c` is the term we need to calculate. You have the polynomial roots in a JSON format, and your task is to calculate `c` using these roots.

### Approach

1. **File Upload and JSON Parsing:**
   - The application allows users to upload a JSON file or input JSON directly.
   - The JSON data should be parsed to extract the polynomial roots.

2. **JSON Structure:**
   - The JSON file contains a `keys` object with the properties `n` (number of roots) and `k` (minimum number of points needed).
   - Additional objects represent the roots in different bases.

3. **Data Handling:**
   - Decode the values from various bases.
   - Use Lagrange interpolation to solve for the constant term `c`.

### Sample JSON Input

```json
{
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
}
