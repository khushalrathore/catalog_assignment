let jsonData = null;

// Handle file upload and parse JSON
document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                jsonData = JSON.parse(e.target.result);
                displayData();
                document.getElementById('result').innerHTML = "File loaded successfully.";
            } catch (error) {
                document.getElementById('result').innerHTML = "Invalid JSON format in file.";
            }
        };
        reader.readAsText(file);
    }
});

// Handle custom JSON input
document.getElementById('customJsonInput').addEventListener('input', function () {
    const customJson = this.value;
    try {
        jsonData = JSON.parse(customJson);
        displayData();
        document.getElementById('result').innerHTML = "Custom JSON loaded successfully.";
    } catch (error) {
        document.getElementById('result').innerHTML = "Invalid custom JSON format.";
    }
});

// Function to decode values from various bases
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Function to solve for constant term using Lagrange interpolation
function lagrangeInterpolation(points) {
    let c = 0;
    for (let i = 0; i < points.length; i++) {
        let xi = points[i][0], yi = points[i][1];
        let term = yi;
        for (let j = 0; j < points.length; j++) {
            if (i !== j) {
                let xj = points[j][0];
                term *= (0 - xj) / (xi - xj);  // Calculate L(0)
            }
        }
        c += term; // Add the result for each term
    }
    return c;
}

// Function to display JSON data on the page
function displayData() {
    if (!jsonData) {
        document.getElementById('dataDisplay').innerHTML = "No data available.";
        return;
    }

    const dataDisplay = document.getElementById('dataDisplay');
    dataDisplay.innerHTML = JSON.stringify(jsonData, null, 2); // Pretty-print JSON
}

// Main function to read the data and solve the polynomial
function solvePolynomial() {
    if (!jsonData) {
        document.getElementById('result').innerHTML = "Please load a valid JSON file or enter custom JSON.";
        return;
    }

    const keys = jsonData.keys;
    const n = keys.n;
    const k = keys.k;

    const points = [];

    // Collect points (x, y) from the JSON
    for (let key in jsonData) {
        if (key !== 'keys') {
            const base = parseInt(jsonData[key].base);
            const value = jsonData[key].value;
            const x = parseInt(key);  // x is the key of the object
            const y = decodeValue(base, value);  // y is decoded based on its base
            points.push([x, y]);
        }
    }

    if (points.length < k) {
        document.getElementById('result').innerHTML = "Not enough points to solve for the polynomial.";
        return;
    }

    // Solve for constant term using Lagrange interpolation
    const constantTerm = lagrangeInterpolation(points);
    const output = {
        "constantTerm": constantTerm
    };
    document.getElementById('result').innerHTML = `The constant term (c) is: ${constantTerm}`;
    console.log("Output in JSON:", JSON.stringify(output, null, 2));
}
