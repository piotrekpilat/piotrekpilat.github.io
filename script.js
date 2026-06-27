document.addEventListener('DOMContentLoaded', () => {
    let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('pl') ? 'pl' : 'en');
    let translations = {};

    // Translations are loaded externally from lang/en.js and lang/pl.js

    function getNestedValue(obj, path) {
        return path.split('.').reduce((acc, part) => acc && acc[part], obj);
    }

    function t(key, defaultValue = '') {
        return getNestedValue(translations, key) || defaultValue;
    }


    function getTypingPhrases(lang) {
        if (lang === 'pl') {
            return ['Ekspert PHP', 'Programista Symfony', 'Certyfikowany AWS', 'Architekt Mikrousług'];
        }
        return ['PHP Expert', 'Symfony Developer', 'AWS Certified', 'Microservices Architect'];
    }

    function applyTranslations() {
        // 1. Translate elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = getNestedValue(translations, key);
            if (translation !== undefined && translation !== null) {
                el.innerHTML = translation;
            }
        });

        document.querySelectorAll('[data-i18n-attr]').forEach(el => {
            const attrPairs = el.getAttribute('data-i18n-attr').split(',');
            attrPairs.forEach(pair => {
                const parts = pair.split(':');
                if (parts.length >= 2) {
                    const attrName = parts[0].trim();
                    const key = parts.slice(1).join(':').trim();
                    const translation = getNestedValue(translations, key);
                    if (translation !== undefined && translation !== null) {
                        el.setAttribute(attrName, translation);
                    }
                }
            });
        });

        const langBtnText = document.getElementById('lang-btn-text');
        if (langBtnText) {
            langBtnText.textContent = currentLang === 'en' ? 'PL' : 'EN';
        }

        generateCaptcha();

        startTypingEffect();
    }

    async function setLanguage(lang) {
        translations = lang === 'pl' ? window.translationsPl : window.translationsEn;
        currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;
        applyTranslations();
    }


    setLanguage(currentLang);

    // Lang toggle click handler
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            const nextLang = currentLang === 'en' ? 'pl' : 'en';
            setLanguage(nextLang);
        });
    }

    document.querySelectorAll('[data-text-decode]').forEach(el => {
        const encoded = el.getAttribute('data-text-decode');
        if (encoded) {
            el.textContent = atob(encoded);
        }
    });

    document.querySelectorAll('.contact-trigger').forEach(el => {
        const mailtoEncoded = el.getAttribute('data-mailto');
        const telEncoded = el.getAttribute('data-tel');
        
        if (mailtoEncoded) {
            el.href = 'mailto:' + atob(mailtoEncoded);
        } else if (telEncoded) {
            el.href = 'tel:' + atob(telEncoded);
        }
    });

    // ----------------------------------------------------
    // Dark/Light Theme Toggle
    // ----------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.className = savedTheme;
        updateThemeIcon(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        } else {
            document.body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
    });

    function updateThemeIcon(theme) {
        if (theme === 'light-theme') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    }

    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scroll-active');
        } else {
            header.classList.remove('scroll-active');
        }
    });

    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active classes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active classes to current tab
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    const typingElement = document.getElementById('typing-text');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    let typingTimeout = null;

    function startTypingEffect() {
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }
        phraseIndex = 0;
        charIndex = 0;
        isDeleting = false;
        typeSpeed = 100;
        typeEffect();
    }

    function typeEffect() {
        if (!typingElement) return;
        const phrases = getTypingPhrases(currentLang);
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        typingTimeout = setTimeout(typeEffect, typeSpeed);
    }
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            let textToCopy = btn.getAttribute('data-copy');
            const obfuscatedText = btn.getAttribute('data-copy-obfuscated');
            
            if (obfuscatedText) {
                textToCopy = atob(obfuscatedText);
            }
            
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                // Change icon temporarily to success checkmark
                const icon = btn.querySelector('i');
                icon.className = 'fa-solid fa-check';
                icon.style.color = '#10B981';
                
                setTimeout(() => {
                    icon.className = 'fa-regular fa-copy';
                    icon.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Error copying to clipboard: ', err);
            });
        });
    });

    // ----------------------------------------------------
    // Contact Form Submission & Math Captcha Validation
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formToast = document.getElementById('form-toast');
    const captchaLabel = document.getElementById('captcha-label');
    const captchaInput = document.getElementById('form-captcha');

    let correctCaptchaAnswer = 0;

    function generateCaptcha() {
        if (!captchaLabel || !captchaInput) return;
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        correctCaptchaAnswer = num1 + num2;
        
        let labelTemplate = t('js.captcha_label', 'Security Check: What is <strong>{num1} + {num2}</strong>?');
        labelTemplate = labelTemplate.replace('{num1}', num1).replace('{num2}', num2);
        
        captchaLabel.innerHTML = labelTemplate;
        captchaInput.value = '';
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 1. Verify Math Captcha answer
            const userAnswer = parseInt(captchaInput.value, 10);
            if (userAnswer !== correctCaptchaAnswer) {
                alert(t('js.captcha_incorrect', 'Security answer is incorrect. Please try again with the new question.'));
                generateCaptcha(); // Refresh question
                return;
            }
            
            const actionUrl = contactForm.getAttribute('action');
            if (!actionUrl || actionUrl.includes('YOUR_FORM_ID')) {
                alert(t('js.form_id_error', 'Please configure your Formspree Form ID in HTML (action attribute)!'));
                return;
            }

            const formData = new FormData(contactForm);
            contactForm.style.opacity = '0.3';
            contactForm.style.pointerEvents = 'none';

            fetch(actionUrl, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success toast on success
                    formToast.classList.add('show');
                    contactForm.style.opacity = '0.1';
                    contactForm.reset();
                    generateCaptcha();
                    
                    // Reset UI after 5 seconds
                    setTimeout(() => {
                        contactForm.style.opacity = '1';
                        contactForm.style.pointerEvents = 'auto';
                        formToast.classList.remove('show');
                    }, 5000);
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert(t('js.submit_error', 'Oops! There was a problem submitting your form.'));
                        }
                        generateCaptcha();
                        contactForm.style.opacity = '1';
                        contactForm.style.pointerEvents = 'auto';
                    });
                }
            })
            .catch(error => {
                alert(t('js.network_error', 'Oops! There was a problem submitting your form. Please check your network connection.'));
                generateCaptcha();
                contactForm.style.opacity = '1';
                contactForm.style.pointerEvents = 'auto';
            });
        });
    }
});
