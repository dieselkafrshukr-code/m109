// Get elements
const loginScreen = document.getElementById('loginScreen');
const messageScreen = document.getElementById('messageScreen');
const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const unlockBtn = document.getElementById('unlockBtn');
const errorMessage = document.getElementById('errorMessage');

// Correct date
const CORRECT_DAY = 26;
const CORRECT_MONTH = 6;
const CORRECT_YEAR = 2025;

// Auto-focus first input
dayInput.focus();

// Handle Enter key navigation between inputs
dayInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        monthInput.focus();
    }
});

monthInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        yearInput.focus();
    }
});

yearInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkDate();
    }
});

// Limit input length
dayInput.addEventListener('input', (e) => {
    if (e.target.value.length > 2) {
        e.target.value = e.target.value.slice(0, 2);
    }
});

monthInput.addEventListener('input', (e) => {
    if (e.target.value.length > 2) {
        e.target.value = e.target.value.slice(0, 2);
    }
});

yearInput.addEventListener('input', (e) => {
    if (e.target.value.length > 4) {
        e.target.value = e.target.value.slice(0, 4);
    }
});

// Check date function
function checkDate() {
    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    // Hide error message first
    errorMessage.classList.remove('show');

    // Validate inputs
    if (!day || !month || !year) {
        showError();
        return;
    }

    // Check if date is correct
    if (day === CORRECT_DAY && month === CORRECT_MONTH && year === CORRECT_YEAR) {
        // Correct date - show message
        unlockMessage();
    } else {
        // Wrong date - show error
        showError();
        shakeInputs();
    }
}

// Show error message
function showError() {
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
}

// Shake inputs animation
function shakeInputs() {
    const inputs = [dayInput, monthInput, yearInput];
    inputs.forEach(input => {
        input.style.animation = 'shake 0.5s';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    });
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Unlock message
function unlockMessage() {
    // Add success animation to button
    unlockBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    unlockBtn.innerHTML = '<span class="btn-text">✓ صحيح!</span>';
    
    // Wait a bit then transition
    setTimeout(() => {
        loginScreen.style.animation = 'fadeOut 0.8s ease-out forwards';
        
        setTimeout(() => {
            loginScreen.style.display = 'none';
            messageScreen.classList.add('show');
            
            // Create confetti effect
            createConfetti();
        }, 800);
    }, 500);
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
`;
document.head.appendChild(fadeOutStyle);

// Create confetti effect
function createConfetti() {
    const colors = ['#ffd700', '#ff6b6b', '#4CAF50', '#2196F3', '#ff69b4'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }, i * 30);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Button click handler
unlockBtn.addEventListener('click', checkDate);

// Add input validation for numbers only
[dayInput, monthInput, yearInput].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') return;
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
});

// Add placeholder animation
const inputs = [dayInput, monthInput, yearInput];
inputs.forEach((input, index) => {
    input.addEventListener('focus', () => {
        input.style.transform = 'scale(1.05)';
    });
    
    input.addEventListener('blur', () => {
        input.style.transform = 'scale(1)';
    });
});
