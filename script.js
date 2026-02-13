/**
 * CORE LOGIC ENGINE
 */

const App = {
    CORRECT_DATES: [
        '11/2/2026',
        '11/02/2026',
        '١١/٢/٢٠٢٦',
        '١١/٠٢/٢٠٢٦'
    ],

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.checkSession();
    },

    cacheDOM() {
        this.loginPage = document.getElementById('login-page');
        this.contentPage = document.getElementById('content-page');
        this.loginForm = document.getElementById('login-form');
        this.passwordInput = document.getElementById('password-input');
        this.errorMessage = document.getElementById('error-message');
    },

    bindEvents() {
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        if (this.passwordInput) {
            this.passwordInput.addEventListener('input', (e) => this.formatDateInput(e));
        }
    },

    checkSession() {
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            this.showContent(true);
        }
    },

    formatDateInput(e) {
        let value = e.target.value.replace(/[^\d]/g, '');
        if (value.length > 8) value = value.slice(0, 8);

        if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length >= 5) value = value.slice(0, 5) + '/' + value.slice(5);

        e.target.value = value;
    },

    handleLogin(e) {
        e.preventDefault();
        const enteredDate = this.passwordInput.value.trim();
        const normalizedDate = this.normalizeNumbers(enteredDate);

        if (this.isDateCorrect(normalizedDate)) {
            this.loginSuccess();
        } else {
            this.loginFailure();
        }
    },

    normalizeNumbers(str) {
        const ar = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        const en = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let res = str;
        ar.forEach((a, i) => res = res.replace(new RegExp(a, 'g'), en[i]));
        return res;
    },

    isDateCorrect(date) {
        if (this.CORRECT_DATES.includes(date)) return true;
        const noZeros = date.replace(/\/0/g, '/');
        return this.CORRECT_DATES.some(d => d === noZeros);
    },

    loginSuccess() {
        sessionStorage.setItem('isLoggedIn', 'true');
        this.errorMessage.textContent = '';

        // Premium transition sequence
        const tl = gsap.timeline();

        tl.to('.login-box', {
            duration: 0.8,
            y: -20,
            opacity: 0,
            scale: 0.95,
            ease: "power4.inOut"
        })
            .to(this.loginPage, {
                duration: 0.5,
                opacity: 0,
                display: 'none'
            }, "-=0.2")
            .fromTo(this.contentPage, {
                display: 'block',
                opacity: 0,
                y: 40
            }, {
                duration: 1.2,
                opacity: 1,
                y: 0,
                ease: "expo.out",
                onComplete: () => {
                    this.contentPage.classList.remove('hidden');
                    ScrollTrigger.refresh(); // Refresh scroll trigger for new content
                }
            });
    },

    loginFailure() {
        this.errorMessage.textContent = '❌ التاريخ غير صحيح، حاول مرة أخرى';
        gsap.to('.login-box', {
            x: 10,
            duration: 0.1,
            repeat: 5,
            yoyo: true,
            ease: 'linear'
        });
        this.passwordInput.value = '';
    },

    showContent(instant = false) {
        this.loginPage.classList.add('hidden');
        this.contentPage.classList.remove('hidden');

        if (!instant) {
            gsap.from(this.contentPage, {
                duration: 1.5,
                opacity: 0,
                y: 50,
                ease: 'expo.out'
            });
        } else {
            this.contentPage.style.opacity = '1';
        }
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
