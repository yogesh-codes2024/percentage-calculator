// Get DOM elements
const expectedReturnInput = document.getElementById('expectedReturn');
const totalInvestmentInput = document.getElementById('totalInvestment');
const calculateBtn = document.getElementById('calculateBtn');
const resultDiv = document.getElementById('result');
const percentageDisplay = document.getElementById('percentage');

// Calculate percentage return on capital
function calculateROC() {
    const expectedReturn = parseFloat(expectedReturnInput.value);
    const totalInvestment = parseFloat(totalInvestmentInput.value);
    
    // Validate inputs
    if (isNaN(expectedReturn) || isNaN(totalInvestment)) {
        alert('Please enter valid numbers for both fields');
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

// Event listeners
calculateBtn.addEventListener('click', calculateROC);

// Allow Enter key to trigger calculation
expectedReturnInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateROC();
    }
});

totalInvestmentInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateROC();
    }
});

// Real-time calculation on input change (optional enhancement)
expectedReturnInput.addEventListener('input', () => {
    if (expectedReturnInput.value && totalInvestmentInput.value) {
        calculateROC();
    }
});

totalInvestmentInput.addEventListener('input', () => {
    if (expectedReturnInput.value && totalInvestmentInput.value) {
        calculateROC();
    }
});
