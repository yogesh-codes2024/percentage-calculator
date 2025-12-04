// Get DOM elements - ROI Calculator
const expectedReturnInput = document.getElementById('expectedReturn');
const totalInvestmentInput = document.getElementById('totalInvestment');
const resultDiv = document.getElementById('result');
const percentageDisplay = document.getElementById('percentage');

// Get DOM elements - Stock Calculator
const currentPriceInput = document.getElementById('currentPrice');
const percentChangeInput = document.getElementById('percentChange');
const targetPriceInput = document.getElementById('targetPrice');
const stockResultDiv = document.getElementById('stockResult');
const calculatedTargetDisplay = document.getElementById('calculatedTarget');
const calculatedPercentDisplay = document.getElementById('calculatedPercent');

// ===== ROI CALCULATOR =====
// Calculate percentage return on capital
function calculateROC() {
    const expectedReturn = parseFloat(expectedReturnInput.value);
    const totalInvestment = parseFloat(totalInvestmentInput.value);
    
    // Validate inputs
    if (isNaN(expectedReturn) || isNaN(totalInvestment)) {
        return;
    }
    
    if (totalInvestment <= 0) {
        alert('Total investment must be greater than 0');
        return;
    }
    
    // Calculate percentage: (Expected Return / Total Investment) × 100
    const percentage = (expectedReturn / totalInvestment) * 100;
    
    // Display result
    percentageDisplay.textContent = percentage.toFixed(2) + '%';
    resultDiv.classList.remove('hidden', 'positive', 'negative');
    
    // Add color class based on positive/negative return
    if (percentage > 0) {
        resultDiv.classList.add('positive');
    } else if (percentage < 0) {
        resultDiv.classList.add('negative');
    }
}

// Real-time calculation on input change
expectedReturnInput.addEventListener('input', () => {
    if (expectedReturnInput.value && totalInvestmentInput.value) {
        calculateROC();
    } else {
        resultDiv.classList.add('hidden');
    }
});

totalInvestmentInput.addEventListener('input', () => {
    if (expectedReturnInput.value && totalInvestmentInput.value) {
        calculateROC();
    } else {
        resultDiv.classList.add('hidden');
    }
});

// ===== STOCK PRICE CALCULATOR =====
let isUpdatingStock = false; // Prevent circular updates

// Calculate target price from percent change
function calculateTargetFromPercent() {
    if (isUpdatingStock) return;
    
    const currentPrice = parseFloat(currentPriceInput.value);
    const percentChange = parseFloat(percentChangeInput.value);
    
    if (isNaN(currentPrice) || currentPrice <= 0) {
        stockResultDiv.classList.add('hidden');
        return;
    }
    
    if (isNaN(percentChange)) {
        stockResultDiv.classList.add('hidden');
        return;
    }
    
    // Calculate target price: currentPrice * (1 + percentChange/100)
    const targetPrice = currentPrice * (1 + percentChange / 100);
    
    // Update target price input
    isUpdatingStock = true;
    targetPriceInput.value = targetPrice.toFixed(2);
    isUpdatingStock = false;
    
    // Display results
    displayStockResults(targetPrice, percentChange);
}

// Calculate percent change from target price
function calculatePercentFromTarget() {
    if (isUpdatingStock) return;
    
    const currentPrice = parseFloat(currentPriceInput.value);
    const targetPrice = parseFloat(targetPriceInput.value);
    
    if (isNaN(currentPrice) || currentPrice <= 0) {
        stockResultDiv.classList.add('hidden');
        return;
    }
    
    if (isNaN(targetPrice) || targetPrice < 0) {
        stockResultDiv.classList.add('hidden');
        return;
    }
    
    // Calculate percent change: ((targetPrice - currentPrice) / currentPrice) * 100
    const percentChange = ((targetPrice - currentPrice) / currentPrice) * 100;
    
    // Update percent change input
    isUpdatingStock = true;
    percentChangeInput.value = percentChange.toFixed(2);
    isUpdatingStock = false;
    
    // Display results
    displayStockResults(targetPrice, percentChange);
}

// Display stock calculator results
function displayStockResults(targetPrice, percentChange) {
    calculatedTargetDisplay.textContent = '$' + targetPrice.toFixed(2);
    calculatedPercentDisplay.textContent = percentChange.toFixed(2) + '%';
    
    stockResultDiv.classList.remove('hidden', 'positive', 'negative');
    
    if (percentChange > 0) {
        stockResultDiv.classList.add('positive');
    } else if (percentChange < 0) {
        stockResultDiv.classList.add('negative');
    }
}

// Stock calculator event listeners
currentPriceInput.addEventListener('input', () => {
    if (percentChangeInput.value) {
        calculateTargetFromPercent();
    } else if (targetPriceInput.value) {
        calculatePercentFromTarget();
    } else {
        stockResultDiv.classList.add('hidden');
    }
});

percentChangeInput.addEventListener('input', () => {
    if (!isUpdatingStock && currentPriceInput.value) {
        // Clear target price when user types in percent change
        isUpdatingStock = true;
        targetPriceInput.value = '';
        isUpdatingStock = false;
        calculateTargetFromPercent();
    }
});

targetPriceInput.addEventListener('input', () => {
    if (!isUpdatingStock && currentPriceInput.value) {
        // Clear percent change when user types in target price
        isUpdatingStock = true;
        percentChangeInput.value = '';
        isUpdatingStock = false;
        calculatePercentFromTarget();
    }
});

// Enter key support for stock calculator
currentPriceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (percentChangeInput.value) {
            calculateTargetFromPercent();
        } else if (targetPriceInput.value) {
            calculatePercentFromTarget();
        }
    }
});

percentChangeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && currentPriceInput.value) {
        calculateTargetFromPercent();
    }
});

targetPriceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && currentPriceInput.value) {
        calculatePercentFromTarget();
    }
});

