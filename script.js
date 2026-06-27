document.addEventListener('DOMContentLoaded', () => {
    let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('pl') ? 'pl' : 'en');
    let translations = {};

    const translationsEn = {
      "head": {
        "description": "Professional profile of Piotr Piłat - PHP Developer with 14 years of commercial experience building web applications, backend systems, and microservices."
      },
      "nav": {
        "about": "About",
        "skills": "Skills",
        "experience": "Experience",
        "certs": "Certifications",
        "contact": "Contact",
        "download_resume": "Download Resume"
      },
      "logo": {
        "text": "piotrekpilat"
      },
      "hero": {
        "badge": "PHP & Symfony Specialist",
        "greeting": "Hi, I'm ",
        "name": "Piotr Piłat",
        "subtitle": "Backend Developer & ",
        "description": "I build stable, scalable backend systems and microservices-based architectures. For 14 years, I have been translating business requirements into efficient and clean code.",
        "btn_contact": "Get in Touch",
        "btn_resume": "View Resume (PDF)",
        "xp_label": "Years of Experience",
        "tech_label": "PHP & Symfony",
        "scroll_down": "Scroll Down"
      },
      "about": {
        "tag": "Who I am",
        "title": "About Me",
        "lead": "I am a PHP Developer with 14 years of commercial experience in designing and maintaining advanced web applications and backend systems.",
        "body1": "On a daily basis, I work mainly with <strong>PHP 8.3</strong> and the <strong>Symfony 6</strong> framework. I have extensive experience in creating distributed systems in microservices architecture and event-driven communication using <strong>RabbitMQ</strong>.",
        "body2": "My work is not just about writing new code from scratch. I frequently engage in modernizing legacy systems, refactoring technical debt, optimizing database performance, and improving the stability of systems in the <strong>AWS</strong> cloud.",
        "stat1_title": "14 Years",
        "stat1_desc": "Commercial Experience",
        "stat2_desc": "Certified Developer",
        "stat3_title": "Microservices",
        "stat3_desc": "& Event-driven architecture",
        "stat4_title": "AI Integrations"
      },
      "skills": {
        "tag": "My Skillset",
        "title": "Tech Stack",
        "tab_backend": "Backend",
        "tab_cloud": "Cloud",
        "tab_tools": "Tools",
        "backend": {
          "php": "Advanced object-oriented programming, code optimization, OOP, design patterns.",
          "symfony": "Primary framework for building microservices, APIs, and business applications.",
          "legacy": "Experience with legacy frameworks and refactoring/migrating older codebases.",
          "api": "API Gateway design and implementation, integration with external third-party systems.",
          "rabbitmq": "Asynchronous messaging and event-driven communication configurations.",
          "db": "Relational data modeling, SQL query optimizations, and caching mechanisms."
        },
        "cloud": {
          "aws": "EC2, RDS, S3, API Gateway, IAM permissions, and cloud service integrations.",
          "docker": "Containerization of applications, maintaining dev and production environments.",
          "terraform": "Infrastructure as Code (IaC) principles, focusing on managing API Gateway.",
          "k8s_jenkins": "Basic container orchestration and configuring automation CI/CD pipelines."
        },
        "tools": {
          "testing": "Unit testing, static code analysis, and ensuring PSR code quality standards.",
          "ai_title": "AI Assistance & APIs",
          "ai_desc": "Using AI tools (Claude / Gemini / Codex) and integrations with LLM configurations (Ollama).",
          "git": "Code version control systems, team workflows, and GitFlow practices.",
          "other": "Technological experiments, helper script creation, and process automation."
        }
      },
      "experience": {
        "tag": "My Career Path",
        "title": "Work Experience",
        "date1": "09/2013 - Current",
        "intro1": "Developing complex business applications for Healthcare, HR, and E-commerce sectors, including patient management modules, HR workflow automation, and payment integrations.",
        "bullet1_1": "Designing and implementing high-performance systems using <strong>PHP 8.3</strong> and <strong>Symfony 5/6</strong> framework.",
        "bullet1_2": "Working mostly within the <strong>AWS, Kubernetes, and Jenkins</strong> stack.",
        "bullet1_3": "Maintaining API Gateway structures using <strong>Terraform</strong>.",
        "bullet1_4": "Optimizing data handling and messaging architectures with <strong>MySQL, Redis, and RabbitMQ</strong>.",
        "bullet1_5": "Integrating external third-party APIs, including payment gateways and external data providers.",
        "date2": "09/2012 - 09/2013",
        "intro2": "Handled professional CMS deployments and developed automation scripts supporting marketing and SEO activities.",
        "bullet2_1": "Integrating and modifying professional websites based on Joomla! and WordPress platforms.",
        "bullet2_2": "Developing standalone PHP scripts dedicated to SEO optimization and automation.",
        "bullet2_3": "Working on Joomla/WordPress modules and database query optimizations.",
        "bullet2_4": "Customizing CMS plugins to meet specific client requirements.",
        "bullet2_5": "Managing database operations with MySQL and version control via SVN.",
        "date3": "02/2012 - 08/2012",
        "intro3": "Development of dedicated auction management systems and transaction integrations.",
        "bullet3_1": "Developed backend features for specialized applications using the <strong>Kohana 2</strong> framework.",
        "bullet3_2": "Engineered a SOAP API system (WSDL) for automated auction management and transaction data collection.",
        "bullet3_3": "Utilized jQuery library to build dynamic and interactive UI features."
      },
      "certs": {
        "tag": "Verified Knowledge",
        "title": "Certifications",
        "google_issuer": "Issued by Google | 2026-06-08"
      },
      "edu": {
        "tag": "Foundations",
        "title": "Education",
        "degree": "Master of Science / Bachelor of Engineering",
        "field": "Major: Computer Science, Electrical and Computer Engineering",
        "school": "Rzeszów University of Technology - Poland",
        "lang_hobbies_title": "Languages & Hobbies",
        "lang_pl_name": "Polish",
        "lang_pl_level": "Native (C2)",
        "lang_en_name": "English",
        "lang_en_level": "Upper Intermediate (B2)",
        "hobby1": "Rock Music",
        "hobby2": "Coding Experiments (Python/Delphi)",
        "hobby3": "Psychology"
      },
      "contact": {
        "tag": "Get in Touch",
        "title": "Contact",
        "intro": "Looking for an experienced PHP/Symfony developer for a project, architectural consulting, or code refactoring? Feel free to contact me directly:",
        "card1_label": "Send an Email",
        "card1_copy_aria": "Copy email",
        "card2_label": "Call Me",
        "card2_copy_aria": "Copy phone number",
        "card3_label": "LinkedIn Profile",
        "card3_open_aria": "Open LinkedIn",
        "card4_label": "Location",
        "location": "Kościuszki 97A, 37-100 Łańcut, Poland",
        "loading": "Loading...",
        "form": {
          "name_label": "Full Name",
          "name_placeholder": "e.g. John Doe",
          "email_label": "Your Email Address",
          "email_placeholder": "e.g. john@doe.com",
          "message_label": "Message",
          "message_placeholder": "How can I help you?",
          "captcha_loading": "Security Check: Loading challenge...",
          "submit_btn": "Send Message",
          "success_toast": "Message sent successfully! Thank you for reaching out."
        }
      },
      "footer": {
        "copyright": "&copy; 2026 Piotr Piłat. All rights reserved.",
        "resume": "View Resume (PDF)",
        "gdpr": "GDPR consent included inside the Resume PDF."
      },
      "js": {
        "captcha_incorrect": "Security answer is incorrect. Please try again with the new question.",
        "form_id_error": "Please configure your Formspree Form ID in HTML (action attribute)!",
        "submit_error": "Oops! There was a problem submitting your form.",
        "network_error": "Oops! There was a problem submitting your form. Please check your network connection.",
        "captcha_label": "Security Check: What is <strong>{num1} + {num2}</strong>?"
      }
    };

    const translationsPl = {
      "head": {
        "description": "Profil zawodowy Piotra Piłata - Programisty PHP z 14-letnim doświadczeniem w budowaniu aplikacji webowych, systemów backendowych i mikrousług."
      },
      "nav": {
        "about": "O mnie",
        "skills": "Technologie",
        "experience": "Doświadczenie",
        "certs": "Certyfikaty",
        "contact": "Kontakt",
        "download_resume": "Pobierz Resume"
      },
      "logo": {
        "text": "piotr.piłat"
      },
      "hero": {
        "badge": "PHP & Symfony Specialist",
        "greeting": "Cześć, tu ",
        "name": "Piotr Piłat",
        "subtitle": "Senior Backend Developer & ",
        "description": "Tworzę stabilne, skalowalne systemy backendowe i architektury oparte na mikrousługach. Od 14 lat przekładam wymagania biznesowe na wydajny i czysty kod.",
        "btn_contact": "Skontaktuj się",
        "btn_resume": "Zobacz Resume (PDF)",
        "xp_label": "Lat w branży",
        "tech_label": "PHP & Symfony",
        "scroll_down": "Przewiń w dół"
      },
      "about": {
        "tag": "Kim jestem",
        "title": "O mnie",
        "lead": "Jestem programistą PHP z 14-letnim komercyjnym doświadczeniem w projektowaniu i utrzymywaniu zaawansowanych aplikacji internetowych oraz systemów backendowych.",
        "body1": "Na co dzień pracuję głównie z <strong>PHP 8.3</strong> oraz frameworkiem <strong>Symfony 6</strong>. Posiadam bogate doświadczenie w tworzeniu systemów rozproszonych w architekturze mikrousług oraz komunikacji sterowanej zdarzeniami (event-driven) z użyciem brokera <strong>RabbitMQ</strong>.",
        "body2": "Moja praca to nie tylko pisanie nowego kodu od zera. Często angażuję się w modernizację systemów legacy, refaktoryzację długu technologicznego, optymalizację wydajnościową baz danych oraz poprawę stabilności systemów w chmurze <strong>AWS</strong>.",
        "stat1_title": "14 lat",
        "stat1_desc": "Doświadczenia komercyjnego",
        "stat2_desc": "Certified Developer",
        "stat3_title": "Mikrousługi",
        "stat3_desc": "I Event-driven architecture",
        "stat4_title": "AI Integracje"
      },
      "skills": {
        "tag": "Co potrafię",
        "title": "Stack Technologiczny",
        "tab_backend": "Backend",
        "tab_cloud": "Chmura",
        "tab_tools": "Narzędzia",
        "backend": {
          "php": "Zaawansowane programowanie obiektowe, optymalizacja kodu, OOP, design patterns.",
          "symfony": "Główny framework do budowy mikrousług, API i aplikacji biznesowych.",
          "legacy": "Doświadczenie w starszych frameworkach, migracja systemów legacy.",
          "api": "Projektowanie i implementacja API gateway, integracje z zewnętrznymi dostawcami.",
          "rabbitmq": "Komunikacja asynchroniczna i architektury sterowane zdarzeniami.",
          "db": "Modelowanie relacyjne, optymalizacja zapytań SQL, cache-owanie danych."
        },
        "cloud": {
          "aws": "EC2, RDS, S3, API Gateway, uprawnienia IAM i integracje chmurowe.",
          "docker": "Konteneryzacja aplikacji, tworzenie środowisk deweloperskich i produkcyjnych.",
          "terraform": "Podejście Infrastructure as Code (IaC), zarządzanie API Gateway.",
          "k8s_jenkins": "Podstawy orkiestracji kontenerów oraz utrzymywanie procesów CI/CD."
        },
        "tools": {
          "testing": "Testy jednostkowe, statyczna analiza kodu, dbanie o standardy PSR.",
          "ai_title": "AI (Claude / Gemini / Codex)",
          "ai_desc": "Wspieranie pracy deweloperskiej za pomocą AI, integracja z modelami LLM (Ollama).",
          "git": "Zarządzanie wersjami kodu, praca w zespole (GitFlow).",
          "other": "Eksperymenty technologiczne, skrypty pomocnicze i automatyzacja procesów."
        }
      },
      "experience": {
        "tag": "Moja ścieżka",
        "title": "Doświadczenie Zawodowe",
        "date1": "09/2013 - Obecnie",
        "intro1": "Praca nad złożonymi aplikacjami biznesowymi dla sektorów Healthcare, HR i E-commerce, w tym modułami zarządzania pacjentami, automatyzacją procesów HR oraz integracjami płatności.",
        "bullet1_1": "Projektowanie i implementacja systemów o wysokiej wydajności przy użyciu <strong>PHP 8.3</strong> i <strong>Symfony 5/6</strong>.",
        "bullet1_2": "Praca w architekturze opartej na <strong>AWS, Kubernetes i Jenkins</strong>.",
        "bullet1_3": "Wdrażanie infrastruktury dla API Gateway za pomocą <strong>Terraform</strong>.",
        "bullet1_4": "Optymalizacja systemów przetwarzania danych i kolejek komunikatów (<strong>MySQL, Redis, RabbitMQ</strong>).",
        "bullet1_5": "Integracja zewnętrznych dostawców usług i bramek płatniczych za pośrednictwem <strong>REST APIs</strong>.",
        "date2": "09/2012 - 09/2013",
        "intro2": "Dedykowane wdrożenia CMS oraz rozwój oprogramowania wspierającego procesy marketingowe i e-commerce.",
        "bullet2_1": "Integracja i modyfikacja stron internetowych opartych o Joomla! oraz WordPress.",
        "bullet2_2": "Tworzenie skryptów PHP wspierających automatyzację pod kątem SEO.",
        "bullet2_3": "Optymalizacja zapytań bazodanowych MySQL w modułach CMS.",
        "bullet2_4": "Pisanie dedykowanych wtyczek na zamówienie klienta.",
        "bullet2_5": "Wersjonowanie kodu w systemie SVN.",
        "date3": "02/2012 - 08/2012",
        "intro3": "Wdrażanie i rozwój funkcjonalności dedykowanych systemów aukcyjnych i sprzedażowych.",
        "bullet3_1": "Rozwój kodu aplikacji przy użyciu frameworka <strong>Kohana 2</strong> (PHP).",
        "bullet3_2": "Budowa integracji API typu SOAP (WSDL) do automatyzacji procesów aukcyjnych.",
        "bullet3_3": "Stosowanie biblioteki jQuery do dynamicznych elementów interfejsu."
      },
      "certs": {
        "tag": "Wiedza potwierdzona",
        "title": "Certyfikaty",
        "google_issuer": "Wydany przez Google | 2026-06-08"
      },
      "edu": {
        "tag": "Fundamenty",
        "title": "Edukacja",
        "degree": "Magister Inżynier (MSc/BEng)",
        "field": "Kierunek: Informatyka (Computer Science), Elektrotechnika i Informatyka",
        "school": "Politechnika Rzeszowska (Rzeszów University of Technology)",
        "lang_hobbies_title": "Języki & Hobby",
        "lang_pl_name": "Polski",
        "lang_pl_level": "Ojczysty (C2)",
        "lang_en_name": "Angielski",
        "lang_en_level": "Średniozaawansowany (B2)",
        "hobby1": "Muzyka Rockowa",
        "hobby2": "Eksperymenty z nowymi językami (Python/Delphi)",
        "hobby3": "Psychologia"
      },
      "contact": {
        "tag": "Napisz do mnie",
        "title": "Kontakt",
        "intro": "Szukasz doświadczonego programisty PHP/Symfony do projektu, konsultacji architektonicznych lub refaktoryzacji kodu? Odezwij się bezpośrednio:",
        "card1_label": "Napisz e-mail",
        "card1_copy_aria": "Kopiuj email",
        "card2_label": "Zadzwoń",
        "card2_copy_aria": "Kopiuj telefon",
        "card3_label": "Profil LinkedIn",
        "card3_open_aria": "Otwórz LinkedIn",
        "card4_label": "Lokalizacja",
        "location": "Kościuszki 97A, 37-100 Łańcut, Polska",
        "loading": "Ładowanie...",
        "form": {
          "name_label": "Imię i nazwisko",
          "name_placeholder": "np. Jan Kowalski",
          "email_label": "Twój adres e-mail",
          "email_placeholder": "np. jan@kowalski.pl",
          "message_label": "Wiadomość",
          "message_placeholder": "W czym mogę Ci pomóc?",
          "captcha_loading": "Test bezpieczeństwa: Ładowanie zagadki...",
          "submit_btn": "Wyślij wiadomość",
          "success_toast": "Wiadomość została wysłana! Dziękuję za kontakt."
        }
      },
      "footer": {
        "copyright": "&copy; 2026 Piotr Piłat. Wszelkie prawa zastrzeżone.",
        "resume": "Zobacz Resume w PDF",
        "gdpr": "Zgoda RODO załączona w pliku Resume PDF."
      },
      "js": {
        "captcha_incorrect": "Wynik testu bezpieczeństwa jest niepoprawny. Spróbuj ponownie z nowym pytaniem.",
        "form_id_error": "Skonfiguruj swój Form ID z Formspree w pliku HTML (atrybut action)!",
        "submit_error": "Wystąpił problem podczas wysyłania formularza.",
        "network_error": "Wystąpił problem z wysłaniem wiadomości. Sprawdź swoje połączenie internetowe.",
        "captcha_label": "Test bezpieczeństwa: Ile to jest <strong>{num1} + {num2}</strong>?"
      }
    };

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
        try {
            const response = await fetch(`lang/${lang}.json`);
            if (!response.ok) throw new Error(`Could not load translations for language: ${lang}`);
            translations = await response.json();
        } catch (error) {
            console.warn("Could not fetch translations dynamically, using embedded fallback.", error);
            translations = lang === 'pl' ? translationsPl : translationsEn;
        } finally {
            currentLang = lang;
            localStorage.setItem('lang', lang);
            document.documentElement.lang = lang;
            applyTranslations();
        }
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
