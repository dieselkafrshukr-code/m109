// ==================== المتغيرات الأساسية ====================
const loginPage = document.getElementById('login-page');
const contentPage = document.getElementById('content-page');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password-input');
const errorMessage = document.getElementById('error-message');

// التاريخ الصحيح (يمكن كتابته بأكثر من طريقة)
const CORRECT_DATES = [
    '11/2/2026',
    '11/02/2026',
    '١١/٢/٢٠٢٦',
    '١١/٠٢/٢٠٢٦'
];

// ==================== التحقق من الحالة عند تحميل الصفحة ====================
window.addEventListener('DOMContentLoaded', () => {
    // التحقق من وجود جلسة مفتوحة
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn === 'true') {
        showContent();
    }

    // إضافة تنسيق تلقائي للتاريخ أثناء الكتابة
    passwordInput.addEventListener('input', formatDateInput);
});

// ==================== تنسيق المدخلات ====================
function formatDateInput(e) {
    let value = e.target.value.replace(/[^\d]/g, ''); // إزالة كل شيء ما عدا الأرقام

    if (value.length > 8) {
        value = value.slice(0, 8);
    }

    // تنسيق DD/MM/YYYY
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
        value = value.slice(0, 5) + '/' + value.slice(5);
    }

    e.target.value = value;
}

// ==================== معالج تسجيل الدخول ====================
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const enteredDate = passwordInput.value.trim();

    // تحويل الأرقام العربية إلى إنجليزية إذا لزم الأمر
    const normalizedDate = convertArabicToEnglishNumbers(enteredDate);

    // التحقق من التاريخ
    if (isDateCorrect(normalizedDate)) {
        successfulLogin();
    } else {
        wrongPassword();
    }
});

// ==================== التحقق من صحة التاريخ ====================
function isDateCorrect(date) {
    // التحقق المباشر
    if (CORRECT_DATES.includes(date)) {
        return true;
    }

    // التحقق مع تحويل الأرقام العربية
    const arabicToEnglish = convertArabicToEnglishNumbers(date);
    if (CORRECT_DATES.some(correctDate => correctDate === arabicToEnglish)) {
        return true;
    }

    // التحقق مع إزالة الأصفار البادئة
    const withoutLeadingZeros = date.replace(/\/0/g, '/');
    if (CORRECT_DATES.some(correctDate => correctDate === withoutLeadingZeros)) {
        return true;
    }

    return false;
}

// ==================== تحويل الأرقام العربية إلى إنجليزية ====================
function convertArabicToEnglishNumbers(str) {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let result = str;
    arabicNumbers.forEach((arabic, index) => {
        result = result.replace(new RegExp(arabic, 'g'), englishNumbers[index]);
    });

    return result;
}

// ==================== تسجيل دخول ناجح ====================
function successfulLogin() {
    // حفظ حالة تسجيل الدخول في الجلسة
    sessionStorage.setItem('isLoggedIn', 'true');

    // إخفاء رسالة الخطأ
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    // تأثير انتقالي سلس
    loginPage.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    loginPage.style.opacity = '0';
    loginPage.style.transform = 'scale(0.9)';

    setTimeout(() => {
        showContent();

        // Trigger Valentine's Day special effects
        if (window.valentineAnimations) {
            window.valentineAnimations.createFireworks();
            window.valentineAnimations.initConfetti();
        }

        // Dispatch custom event for animations
        document.dispatchEvent(new Event('loginSuccess'));
    }, 600);
}

// ==================== عرض المحتوى ====================
function showContent() {
    loginPage.classList.add('hidden');
    contentPage.classList.remove('hidden');

    // تأثير ظهور المحتوى
    contentPage.style.opacity = '0';
    setTimeout(() => {
        contentPage.style.transition = 'opacity 0.8s ease-in';
        contentPage.style.opacity = '1';
    }, 100);

    // تشغيل الأنيميشن للأبيات
    animateVerses();
}

// ==================== كلمة مرور خاطئة ====================
function wrongPassword() {
    // عرض رسالة خطأ
    errorMessage.textContent = '❌ التاريخ غير صحيح، حاول تاني';
    errorMessage.style.display = 'block';

    // تأثير اهتزاز لصندوق الدخول
    const loginBox = document.querySelector('.login-box');
    loginBox.style.animation = 'none';
    setTimeout(() => {
        loginBox.style.animation = 'shake 0.5s';
    }, 10);

    // مسح المدخل
    passwordInput.value = '';
    passwordInput.focus();

    // إخفاء رسالة الخطأ بعد 3 ثواني
    setTimeout(() => {
        errorMessage.style.opacity = '0';
        errorMessage.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            errorMessage.style.display = 'none';
            errorMessage.style.opacity = '1';
        }, 500);
    }, 3000);
}

// ==================== أنيميشن الأبيات ====================
function animateVerses() {
    const verses = document.querySelectorAll('.verse');

    verses.forEach((verse, index) => {
        verse.style.opacity = '0';
        verse.style.transform = 'translateY(30px)';

        setTimeout(() => {
            verse.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            verse.style.opacity = '1';
            verse.style.transform = 'translateY(0)';
        }, index * 150); // تأخير تدريجي لكل بيت
    });
}

// ==================== منع الزر الأيمن والحفظ ====================
// (اختياري - لحماية المحتوى)
document.addEventListener('contextmenu', (e) => {
    if (contentPage.classList.contains('hidden') === false) {
        // يمكنك تفعيل هذا إذا أردت منع النسخ
        // e.preventDefault();
    }
});

// منع F12 و Ctrl+Shift+I (اختياري)
document.addEventListener('keydown', (e) => {
    if (contentPage.classList.contains('hidden') === false) {
        // يمكنك تفعيل هذا لمنع فتح Developer Tools
        // if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        //     e.preventDefault();
        // }
    }
});

// ==================== تنظيف الجلسة عند إغلاق المتصفح ====================
window.addEventListener('beforeunload', () => {
    // يمكنك إزالة التعليق التالي إذا أردت أن تطلب كلمة السر في كل مرة
    // sessionStorage.removeItem('isLoggedIn');
});

// ==================== تأثيرات إضافية ====================
// تأثير الماوس على القلوب
document.addEventListener('mousemove', (e) => {
    if (loginPage.classList.contains('hidden') === false) {
        const hearts = document.querySelectorAll('.heart');
        hearts.forEach((heart, index) => {
            const speed = (index + 1) * 0.01;
            const x = (window.innerWidth - e.pageX * speed) / 100;
            const y = (window.innerHeight - e.pageY * speed) / 100;

            heart.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});

// تأثير التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== رسائل التشجيع في الكونسول ====================
console.log('%c♥ رسالة خاصة ♥', 'color: #ff6b9d; font-size: 24px; font-weight: bold;');
console.log('%cهذا الموقع صنع بحب ♥', 'color: #f093fb; font-size: 14px;');
