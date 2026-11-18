
// =============================================
// STACKLY INSURANCE AOS INITIALIZATION
// =============================================

document.addEventListener("DOMContentLoaded", function () {

    if (window.AOS) {

        AOS.init({

            duration: 950,
            once: true,
            offset: 80,
            easing: "ease-out-cubic",
            mirror: false,
            anchorPlacement: "top-bottom"

        });

    }

});


// =============================================
// STACKLY INSURANCE PORTAL
// HEADER & HERO JAVASCRIPT
// =============================================

document.addEventListener("DOMContentLoaded", function () {


    // =====================================
    // GLOBAL ELEMENTS & SETTINGS
    // =====================================

    const insuranceReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // =====================================
    // HEADER SCROLL EFFECT
    // =====================================

    const insuranceHeader =
        document.getElementById("insuranceHeader");


    function insuranceHeaderScroll() {

        if (!insuranceHeader) return;

        if (window.scrollY > 50) {

            insuranceHeader.classList.add("scrolled");

        } else {

            insuranceHeader.classList.remove("scrolled");

        }

    }


    if (insuranceHeader) {

        window.addEventListener(
            "scroll",
            insuranceHeaderScroll,
            { passive: true }
        );

        insuranceHeaderScroll();

    }



    // =====================================
    // MOBILE MENU ELEMENTS
    // =====================================

    const insuranceMenuToggle =
        document.getElementById("insuranceMenuToggle");

    const insuranceMenuClose =
        document.getElementById("insuranceMenuClose");

    const insuranceMobileMenu =
        document.getElementById("insuranceMobileMenu");

    const insuranceMobileOverlay =
        document.getElementById("insuranceMobileOverlay");


    const insuranceMobileLinks =
        document.querySelectorAll(
            ".stackly-insurance-mobile-links a"
        );


    // OPEN MOBILE MENU

    function openInsuranceMenu() {

        if (
            !insuranceMobileMenu ||
            !insuranceMobileOverlay ||
            !insuranceMenuToggle
        ) return;

        insuranceMobileMenu.classList.add("active");

        insuranceMobileOverlay.classList.add("active");

        insuranceMenuToggle.classList.add("active");

        insuranceMenuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.style.overflow = "hidden";

        if (insuranceMenuClose) {
            insuranceMenuClose.focus();
        }

    }


    // CLOSE MOBILE MENU

    function closeInsuranceMenu() {

        if (
            !insuranceMobileMenu ||
            !insuranceMobileOverlay ||
            !insuranceMenuToggle
        ) return;

        insuranceMobileMenu.classList.remove("active");

        insuranceMobileOverlay.classList.remove("active");

        insuranceMenuToggle.classList.remove("active");

        insuranceMenuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.style.overflow = "";

    }


    // MENU TOGGLE

    if (insuranceMenuToggle) {

        insuranceMenuToggle.addEventListener(
            "click",
            function () {

                if (
                    insuranceMobileMenu &&
                    insuranceMobileMenu.classList.contains("active")
                ) {

                    closeInsuranceMenu();

                } else {

                    openInsuranceMenu();

                }

            }
        );

    }


    // EXIT BUTTON

    if (insuranceMenuClose) {

        insuranceMenuClose.addEventListener(
            "click",
            closeInsuranceMenu
        );

    }


    // OVERLAY CLICK

    if (insuranceMobileOverlay) {

        insuranceMobileOverlay.addEventListener(
            "click",
            closeInsuranceMenu
        );

    }


    // ESCAPE KEY

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            insuranceMobileMenu &&
            insuranceMobileMenu.classList.contains("active")
        ) {

            closeInsuranceMenu();

            if (insuranceMenuToggle) {
                insuranceMenuToggle.focus();
            }

        }

    });


    // CLOSE AFTER CLICKING NAVIGATION

    insuranceMobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeInsuranceMenu();

        });

    });


    // ACTIVE MOBILE NAVIGATION

    insuranceMobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            insuranceMobileLinks.forEach(function (item) {

                item.classList.remove("active");

            });

            link.classList.add("active");

        });

    });


    // CLOSE MENU IF WINDOW RESIZES TO DESKTOP

    window.addEventListener("resize", function () {

        if (window.innerWidth > 992) {

            closeInsuranceMenu();

        }

    });



    // =====================================
    // HERO VIDEO SLIDER
    // =====================================

    const insuranceVideos =
        document.querySelectorAll(
            ".stackly-insurance-video"
        );

    const insuranceVideoNumber =
        document.getElementById("insuranceVideoNumber");

    const insuranceVideoProgress =
        document.getElementById("insuranceVideoProgress");

    const insuranceVideoPause =
        document.getElementById("insuranceVideoPause");


    let currentInsuranceVideo = 0;

    let insuranceVideoTimer = null;

    let insuranceProgressTimer = null;

    let insuranceProgress = 0;

    let insurancePaused = false;

    let insurancePageHidden = document.hidden;

    const insuranceVideoDuration = 7000;

    const insuranceProgressInterval = 50;


    // =====================================
    // CLEAR VIDEO TIMERS
    // =====================================

    function clearInsuranceVideoTimers() {

        clearTimeout(insuranceVideoTimer);

        clearInterval(insuranceProgressTimer);

        insuranceVideoTimer = null;

        insuranceProgressTimer = null;

    }


    // =====================================
    // UPDATE VIDEO PAUSE BUTTON
    // =====================================

    function updateInsurancePauseButton() {

        if (!insuranceVideoPause) return;

        if (insurancePaused) {

            insuranceVideoPause.innerHTML =
                '<i class="fa-solid fa-play"></i>';

            insuranceVideoPause.setAttribute(
                "aria-label",
                "Play background videos"
            );

        } else {

            insuranceVideoPause.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

            insuranceVideoPause.setAttribute(
                "aria-label",
                "Pause background videos"
            );

        }

    }


    // =====================================
    // LOAD AND PLAY ACTIVE VIDEO
    // =====================================

    function playInsuranceVideo(index) {

        if (!insuranceVideos.length) return;

        currentInsuranceVideo =
            (index + insuranceVideos.length) %
            insuranceVideos.length;


        insuranceVideos.forEach(function (video, i) {

            video.classList.remove("active");

            video.pause();

            if (i !== currentInsuranceVideo) {

                video.currentTime = 0;

            }

        });


        const activeVideo =
            insuranceVideos[currentInsuranceVideo];

        activeVideo.classList.add("active");


        // LOAD VIDEO WHEN REQUIRED

        if (activeVideo.readyState === 0) {

            activeVideo.load();

        }


        // UPDATE VIDEO NUMBER

        if (insuranceVideoNumber) {

            insuranceVideoNumber.textContent =
                String(currentInsuranceVideo + 1).padStart(2, "0");

        }


        // RESET PROGRESS

        insuranceProgress = 0;

        if (insuranceVideoProgress) {

            insuranceVideoProgress.style.width = "0%";

        }


        // CLEAR OLD TIMERS

        clearInsuranceVideoTimers();


        // PLAY VIDEO IF ALLOWED

        if (!insurancePaused && !insurancePageHidden) {

            if (!insuranceReducedMotion) {

                const playPromise = activeVideo.play();

                if (playPromise !== undefined) {

                    playPromise.catch(function () {

                        // Browser autoplay restrictions may prevent playback.

                    });

                }

                startInsuranceVideoTimer();

            }

        }

        updateInsurancePauseButton();

    }



    // =====================================
    // VIDEO AUTOPLAY TIMER
    // =====================================

    function startInsuranceVideoTimer() {

        clearInsuranceVideoTimers();

        if (
            insurancePaused ||
            insurancePageHidden ||
            insuranceReducedMotion ||
            !insuranceVideos.length
        ) return;


        insuranceProgressTimer = setInterval(function () {

            insuranceProgress +=
                (insuranceProgressInterval / insuranceVideoDuration) * 100;


            if (insuranceProgress >= 100) {

                insuranceProgress = 100;

            }


            if (insuranceVideoProgress) {

                insuranceVideoProgress.style.width =
                    insuranceProgress + "%";

            }

        }, insuranceProgressInterval);


        insuranceVideoTimer = setTimeout(function () {

            nextInsuranceVideo();

        }, insuranceVideoDuration);

    }



    // =====================================
    // NEXT VIDEO
    // =====================================

    function nextInsuranceVideo() {

        if (!insuranceVideos.length) return;

        let nextIndex =
            (currentInsuranceVideo + 1) %
            insuranceVideos.length;

        playInsuranceVideo(nextIndex);

    }



    // =====================================
    // PAUSE VIDEO SLIDER
    // =====================================

    function pauseInsuranceSlider() {

        insurancePaused = true;

        clearInsuranceVideoTimers();

        if (insuranceVideos.length) {

            insuranceVideos[currentInsuranceVideo].pause();

        }

        updateInsurancePauseButton();

    }



    // =====================================
    // RESUME VIDEO SLIDER
    // =====================================

    function resumeInsuranceSlider() {

        insurancePaused = false;

        updateInsurancePauseButton();

        if (
            insuranceReducedMotion ||
            insurancePageHidden ||
            !insuranceVideos.length
        ) return;


        const activeVideo =
            insuranceVideos[currentInsuranceVideo];

        const playPromise = activeVideo.play();

        if (playPromise !== undefined) {

            playPromise.catch(function () {});

        }

        startInsuranceVideoTimer();

    }



    // =====================================
    // VIDEO PAUSE BUTTON
    // =====================================

    if (insuranceVideoPause) {

        insuranceVideoPause.addEventListener(
            "click",
            function () {

                if (insurancePaused) {

                    resumeInsuranceSlider();

                } else {

                    pauseInsuranceSlider();

                }

            }
        );

    }



    // =====================================
    // INITIAL VIDEO
    // =====================================

    if (insuranceVideos.length) {

        playInsuranceVideo(0);

    }


    // RESPECT REDUCED MOTION

    if (insuranceReducedMotion && insuranceVideos.length) {

        pauseInsuranceSlider();

    }



    // =====================================
    // TAB VISIBILITY CONTROL
    // =====================================

    document.addEventListener(
        "visibilitychange",
        function () {

            insurancePageHidden = document.hidden;

            if (insurancePageHidden) {

                clearInsuranceVideoTimers();

                if (insuranceVideos.length) {

                    insuranceVideos[currentInsuranceVideo].pause();

                }

            } else if (
                !insurancePaused &&
                !insuranceReducedMotion &&
                insuranceVideos.length
            ) {

                const activeVideo =
                    insuranceVideos[currentInsuranceVideo];

                const playPromise = activeVideo.play();

                if (playPromise !== undefined) {

                    playPromise.catch(function () {});

                }

                startInsuranceVideoTimer();

            }

        }
    );



    // =====================================
    // VIDEO ERROR HANDLING
    // =====================================

    insuranceVideos.forEach(function (video) {

        video.addEventListener("error", function () {

            console.warn(
                "Insurance background video could not be loaded."
            );

        });

    });

});



// =============================================
// STACKLY INSURANCE SERVICES SLIDER
// =============================================

document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById(
        "stacklyInsuranceServicesTrack"
    );

    const slides = document.querySelectorAll(
        ".stackly-insurance-service-card"
    );

    const dots = document.querySelectorAll(
        ".stackly-insurance-service-dot"
    );

    const prevBtn = document.getElementById(
        "stacklyInsuranceServicePrev"
    );

    const nextBtn = document.getElementById(
        "stacklyInsuranceServiceNext"
    );

    const slider = document.querySelector(
        ".stackly-insurance-services-slider"
    );


    if (!track || !slides.length || !dots.length) return;


    let currentSlide = 0;

    let autoPlay = null;

    const interval = 4500;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // =====================================
    // SHOW SERVICE
    // =====================================

    function showService(index) {

        currentSlide =
            (index + slides.length) % slides.length;


        slides.forEach(function (slide, i) {

            const isActive = i === currentSlide;

            slide.classList.toggle("active", isActive);

            slide.setAttribute(
                "aria-hidden",
                isActive ? "false" : "true"
            );

        });


        dots.forEach(function (dot, i) {

            const isActive = i === currentSlide;

            dot.classList.toggle("active", isActive);

            if (isActive) {

                dot.setAttribute("aria-current", "true");

            } else {

                dot.removeAttribute("aria-current");

            }

        });


        // REFRESH AOS

        if (window.AOS) {

            AOS.refreshHard();

        }

    }



    // =====================================
    // NEXT SERVICE
    // =====================================

    function nextService() {

        showService(currentSlide + 1);

    }



    // =====================================
    // PREVIOUS SERVICE
    // =====================================

    function previousService() {

        showService(currentSlide - 1);

    }



    // =====================================
    // AUTOPLAY CONTROLS
    // =====================================

    function stopAutoPlay() {

        clearInterval(autoPlay);

        autoPlay = null;

    }


    function startAutoPlay() {

        stopAutoPlay();

        if (
            reducedMotion ||
            document.hidden
        ) return;

        autoPlay = setInterval(function () {

            nextService();

        }, interval);

    }


    function restartAutoPlay() {

        startAutoPlay();

    }



    // =====================================
    // NEXT BUTTON
    // =====================================

    if (nextBtn) {

        nextBtn.addEventListener("click", function () {

            nextService();

            restartAutoPlay();

        });

    }



    // =====================================
    // PREVIOUS BUTTON
    // =====================================

    if (prevBtn) {

        prevBtn.addEventListener("click", function () {

            previousService();

            restartAutoPlay();

        });

    }



    // =====================================
    // PAGINATION DOTS
    // =====================================

    dots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showService(index);

            restartAutoPlay();

        });

    });



    // =====================================
    // PAUSE ON HOVER
    // =====================================

    if (slider) {

        slider.addEventListener(
            "mouseenter",
            stopAutoPlay
        );

        slider.addEventListener(
            "mouseleave",
            startAutoPlay
        );

        slider.addEventListener(
            "focusin",
            stopAutoPlay
        );

        slider.addEventListener(
            "focusout",
            function (event) {

                if (!slider.contains(event.relatedTarget)) {

                    startAutoPlay();

                }

            }
        );

    }



    // =====================================
    // TAB VISIBILITY CONTROL
    // =====================================

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                stopAutoPlay();

            } else {

                startAutoPlay();

            }

        }
    );



    // =====================================
    // INITIALIZE SERVICES SLIDER
    // =====================================

    showService(0);

    startAutoPlay();

});



// =============================================
// STACKLY INSURANCE FOOTER
// NEWSLETTER FORM
// =============================================

document.addEventListener("DOMContentLoaded", function () {

    const newsletterForm =
        document.getElementById("insuranceNewsletterForm");

    const newsletterEmail =
        document.getElementById("insuranceNewsletterEmail");

    const newsletterMessage =
        document.getElementById("insuranceNewsletterMessage");


    if (
        !newsletterForm ||
        !newsletterEmail ||
        !newsletterMessage
    ) return;


    let messageTimer = null;


    // =====================================
    // SHOW NEWSLETTER MESSAGE
    // =====================================

    function showNewsletterMessage(message, type) {

        clearTimeout(messageTimer);

        newsletterMessage.textContent = message;

        newsletterMessage.classList.remove(
            "success",
            "error",
            "show"
        );

        newsletterMessage.classList.add(
            type,
            "show"
        );


        // HIDE MESSAGE AFTER 4 SECONDS

        messageTimer = setTimeout(function () {

            newsletterMessage.classList.remove(
                "show",
                "success",
                "error"
            );

            newsletterMessage.textContent = "";

        }, 4000);

    }



    // =====================================
    // NEWSLETTER FORM SUBMISSION
    // =====================================

    newsletterForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            // CLEAR PREVIOUS MESSAGE

            clearTimeout(messageTimer);

            newsletterMessage.textContent = "";

            newsletterMessage.classList.remove(
                "success",
                "error",
                "show"
            );


            // GET EMAIL VALUE

            const email = newsletterEmail.value.trim();


            // EMPTY EMAIL VALIDATION

            if (email === "") {

                showNewsletterMessage(
                    "Please enter your email address.",
                    "error"
                );

                newsletterEmail.focus();

                return;

            }


            // EMAIL FORMAT VALIDATION

            const emailPattern =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


            if (
                !emailPattern.test(email) ||
                !newsletterEmail.checkValidity()
            ) {

                showNewsletterMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                newsletterEmail.focus();

                return;

            }


            // SUCCESS MESSAGE

            showNewsletterMessage(
                "Thank you for subscribing! Stay tuned for updates.",
                "success"
            );


            // CLEAR FORM AFTER SUCCESS

            newsletterForm.reset();

        }
    );

});



// =============================================
// STACKLY INSURANCE FOOTER
// DYNAMIC COPYRIGHT YEAR
// =============================================

document.addEventListener("DOMContentLoaded", function () {

    const insuranceFooterYear =
        document.getElementById("insuranceFooterYear");

    if (insuranceFooterYear) {

        insuranceFooterYear.textContent =
            new Date().getFullYear();

    }

});



/* =========================================
   STACKLY INSURANCE ACTIVE NAVIGATION
   DESKTOP + MOBILE
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const desktopLinks = document.querySelectorAll(
        ".stackly-insurance-navigation .stackly-insurance-nav-link"
    );

    const mobileLinks = document.querySelectorAll(
        ".stackly-insurance-mobile-links a"
    );

    // Get current page filename
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";


    // =====================================
    // UPDATE ACTIVE LINK
    // =====================================

    function setActiveInsuranceLink(links) {

        links.forEach(function (link) {

            const linkPage = link.getAttribute("href");

            if (!linkPage || linkPage.startsWith("#")) return;

            const linkFilename = linkPage.split("/").pop();

            const isActive = linkFilename === currentPage;

            link.classList.toggle("active", isActive);

            if (isActive) {

                link.setAttribute("aria-current", "page");

            } else {

                link.removeAttribute("aria-current");

            }

        });

    }


    // =====================================
    // INITIALIZE DESKTOP NAVIGATION
    // =====================================

    setActiveInsuranceLink(desktopLinks);


    // =====================================
    // INITIALIZE MOBILE NAVIGATION
    // =====================================

    setActiveInsuranceLink(mobileLinks);


    // =====================================
    // MOBILE NAVIGATION CLICK
    // =====================================

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileLinks.forEach(function (item) {

                item.classList.remove("active");

                item.removeAttribute("aria-current");

            });

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

        });

    });

});



/* =====================================================
   STACKLY INSURANCE CONTACT FORM
   CUSTOM DROPDOWNS + FORM VALIDATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("stacklyInsuranceInquiryForm");
    const formMessage = document.getElementById("stacklyInsuranceFormMessage");

    if (!form || !formMessage) return;

    const nameInput = document.getElementById("stacklyInsuranceName");
    const emailInput = document.getElementById("stacklyInsuranceEmail");
    const phoneInput = document.getElementById("stacklyInsurancePhone");
    const messageInput = document.getElementById("stacklyInsuranceMessage");
    const consentInput = document.getElementById("stacklyInsuranceConsent");

    const dropdowns = document.querySelectorAll(
        ".stackly-insurance-custom-dropdown"
    );

    const submitButton = form.querySelector(
        ".stackly-insurance-contact-submit"
    );

    let messageTimer;


    // =============================================
    // FORM MESSAGE
    // =============================================

    function showFormMessage(message, type) {

        clearTimeout(messageTimer);

        formMessage.textContent = message;
        formMessage.classList.remove("is-success", "is-error");
        formMessage.classList.add(
            type === "success" ? "is-success" : "is-error"
        );

        formMessage.style.display = "block";

        messageTimer = setTimeout(function () {

            formMessage.textContent = "";
            formMessage.classList.remove("is-success", "is-error");
            formMessage.style.display = "none";

        }, 4000);

    }


    // =============================================
    // CLOSE ALL CUSTOM DROPDOWNS
    // =============================================

    function closeAllDropdowns() {

        dropdowns.forEach(function (dropdown) {

            dropdown.classList.remove("active");

            const trigger = dropdown.querySelector(
                ".stackly-insurance-dropdown-trigger"
            );

            if (trigger) {
                trigger.setAttribute("aria-expanded", "false");
            }

        });

    }


    // =============================================
    // CUSTOM DROPDOWN FUNCTIONALITY
    // =============================================

    dropdowns.forEach(function (dropdown) {

        const trigger = dropdown.querySelector(
            ".stackly-insurance-dropdown-trigger"
        );

        const selectedText = dropdown.querySelector(
            ".stackly-insurance-dropdown-selected"
        );

        const hiddenInput = dropdown.querySelector(
            ".stackly-insurance-dropdown-value"
        );

        const options = dropdown.querySelectorAll(
            ".stackly-insurance-dropdown-option"
        );

        // Save the original placeholder
        const placeholder = selectedText.textContent.trim();

        trigger.addEventListener("click", function () {

            const isOpen = dropdown.classList.contains("active");

            closeAllDropdowns();

            if (!isOpen) {

                dropdown.classList.add("active");
                trigger.setAttribute("aria-expanded", "true");

            }

        });


        // Select dropdown option
        options.forEach(function (option) {

            option.addEventListener("click", function () {

                const value = this.dataset.value;

                selectedText.textContent = this.textContent.trim();
                hiddenInput.value = value;

                options.forEach(function (item) {
                    item.classList.remove("selected");
                    item.setAttribute("aria-selected", "false");
                });

                this.classList.add("selected");
                this.setAttribute("aria-selected", "true");

                hiddenInput.dispatchEvent(
                    new Event("change", { bubbles: true })
                );

                closeAllDropdowns();

            });

        });


        // Store placeholder for form reset
        dropdown.dataset.placeholder = placeholder;

    });


    // Close dropdown when clicking outside
    document.addEventListener("click", function (event) {

        if (!event.target.closest(
            ".stackly-insurance-custom-dropdown"
        )) {

            closeAllDropdowns();

        }

    });


    // Close dropdown with Escape key
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeAllDropdowns();
        }

    });


    // =============================================
    // VALIDATION HELPERS
    // =============================================

    function isValidName(name) {

        // Allows letters, spaces, hyphens and apostrophes
        return /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u.test(name);

    }


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    }


    function isValidPhone(phone) {

        const digits = phone.replace(/\D/g, "");

        return /^\d{10}$/.test(digits);

    }


    function showError(message, field) {

        showFormMessage(message, "error");

        if (field) {
            field.focus();
        }

    }


    // =============================================
    // FORM SUBMISSION
    // =============================================

    form.noValidate = true;

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        closeAllDropdowns();


        // Get field values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const inquiryType = form.querySelector(
            'input[name="inquiryType"]'
        ).value.trim();

        const contactMethod = form.querySelector(
            'input[name="contactMethod"]'
        ).value.trim();

        const message = messageInput.value.trim();


        // -----------------------------------------
        // CHECK EMPTY FIELDS
        // -----------------------------------------

        if (!name || !email || !phone || !inquiryType ||
            !message || !consentInput.checked) {

            showError(
                "Please fill in all required fields and accept the privacy policy.",
                !name ? nameInput :
                !email ? emailInput :
                !phone ? phoneInput :
                !inquiryType ? form.querySelector(
                    ".stackly-insurance-custom-dropdown .stackly-insurance-dropdown-trigger"
                ) :
                !message ? messageInput :
                consentInput
            );

            return;

        }


        // -----------------------------------------
        // NAME VALIDATION
        // -----------------------------------------

        if (!isValidName(name)) {

            showError(
                "Please enter a valid name using letters only.",
                nameInput
            );

            return;

        }


        // -----------------------------------------
        // EMAIL VALIDATION
        // -----------------------------------------

        if (!isValidEmail(email)) {

            showError(
                "Please enter a valid email address.",
                emailInput
            );

            return;

        }


        // -----------------------------------------
        // PHONE VALIDATION
        // -----------------------------------------

        if (!isValidPhone(phone)) {

            showError(
                "Please enter a valid 10-digit phone number.",
                phoneInput
            );

            return;

        }


        // -----------------------------------------
        // MESSAGE VALIDATION
        // -----------------------------------------

        if (message.length < 10) {

            showError(
                "Please enter a message with at least 10 characters.",
                messageInput
            );

            return;

        }


        // -----------------------------------------
        // SUCCESS
        // -----------------------------------------

        showFormMessage(
            "Thank you! Your message has been submitted successfully.",
            "success"
        );


        // Optional: collect the submitted values
        // Connect this data to your backend to receive inquiries.

        const inquiryData = {
            name: name,
            email: email,
            phone: phone.replace(/\D/g, ""),
            inquiryType: inquiryType,
            contactMethod: contactMethod,
            message: message
        };

        console.log("Stackly Insurance Inquiry:", inquiryData);


        // -----------------------------------------
        // CLEAR FORM FIELDS
        // -----------------------------------------

        form.reset();


        // Reset custom dropdowns
        dropdowns.forEach(function (dropdown) {

            const selectedText = dropdown.querySelector(
                ".stackly-insurance-dropdown-selected"
            );

            const hiddenInput = dropdown.querySelector(
                ".stackly-insurance-dropdown-value"
            );

            const options = dropdown.querySelectorAll(
                ".stackly-insurance-dropdown-option"
            );

            selectedText.textContent = dropdown.dataset.placeholder;
            hiddenInput.value = "";

            options.forEach(function (option) {

                option.classList.remove("selected");
                option.setAttribute("aria-selected", "false");

            });

            dropdown.classList.remove("active");

        });


        // Reset submit button text
        if (submitButton) {

            submitButton.innerHTML = `
                Send Your Message
                <i class="fa-solid fa-arrow-right"></i>
            `;

        }

    });

});



/* =====================================================
   STACKLY INSURANCE FAQ ACCORDION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const faqItems = document.querySelectorAll(
        ".stackly-insurance-faq-item"
    );

    faqItems.forEach(function (item) {

        const question = item.querySelector(
            ".stackly-insurance-faq-question"
        );

        question.addEventListener("click", function () {

            const isActive = item.classList.contains("active");

            // Close all FAQ items
            faqItems.forEach(function (faq) {

                faq.classList.remove("active");

                const faqButton = faq.querySelector(
                    ".stackly-insurance-faq-question"
                );

                faqButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

            // Open selected item
            if (!isActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

});



/* =====================================================
   STACKLY INSURANCE PREMIUM PAGE LOADER
   SLOW & SMOOTH LOADING ANIMATION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const loader = document.getElementById("stacklyInsuranceLoader");
    const progressBar = document.getElementById("stacklyInsuranceLoaderProgress");
    const percentageText = document.getElementById("stacklyInsuranceLoaderPercentage");
    const loadingText = document.getElementById("stacklyInsuranceLoadingText");

    if (!loader || !progressBar || !percentageText) return;

    let progress = 0;
    let loaderFinished = false;
    let progressInterval;

    const loadingMessages = [
        "Securing Your Future",
        "Preparing Your Protection",
        "Building Your Confidence",
        "Almost Ready"
    ];

    // UPDATE LOADING PROGRESS

    function updateProgress(value) {

        progress = Math.min(value, 100);

        progressBar.style.width = progress + "%";

        percentageText.textContent = Math.floor(progress) + "%";

        if (loadingText) {

            const messageIndex = Math.min(
                Math.floor(progress / 25),
                loadingMessages.length - 1
            );

            loadingText.textContent = loadingMessages[messageIndex];

        }

    }


    // SLOW AND SMOOTH PROGRESS ANIMATION

    progressInterval = setInterval(function () {

        if (loaderFinished) {

            clearInterval(progressInterval);

            return;

        }

        if (progress < 85) {

            // Smaller increments create slower progress.

            updateProgress(progress + Math.random() * 1.5 + 0.5);

            if (progress > 85) {

                updateProgress(85);

            }

        }

    }, 350);


    // FINISH LOADING

    function finishLoader() {

        if (loaderFinished) return;

        loaderFinished = true;

        clearInterval(progressInterval);

        // Complete the progress bar smoothly.

        updateProgress(100);

        setTimeout(function () {

            loader.classList.add("loader-hidden");

            document.body.classList.add("stackly-insurance-page-loaded");

            // Completely remove loader after fade-out.

            setTimeout(function () {

                loader.style.display = "none";

            }, 850);

        }, 1600);

    }


    // WAIT UNTIL ALL PAGE RESOURCES ARE LOADED

    if (document.readyState === "complete") {

        finishLoader();

    } else {

        window.addEventListener("load", finishLoader, {
            once: true
        });

    }

});
