
/* =====================================================
   STACKLY INSURANCE CLIENT DASHBOARD
   COMPLETE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       01. GET CLIENT INFORMATION FROM LOCAL STORAGE
    ===================================================== */

    function getClientEmail() {

        const emailKeys = [
            "stacklyInsuranceLoginEmail",
            "loginEmail",
            "userEmail",
            "email"
        ];

        for (const key of emailKeys) {

            const storedEmail = localStorage.getItem(key);

            if (storedEmail && storedEmail.trim() !== "") {

                return storedEmail.trim().toLowerCase();

            }

        }

        return "";

    }


    /* =====================================================
       02. GENERATE CLIENT NAME FROM EMAIL
    ===================================================== */

    function getClientName(email) {

        if (!email || !email.includes("@")) {

            return "Client";

        }

        // Get the first part before @
        const emailName = email.split("@")[0];

        // Get the first word before dot, underscore,
        // hyphen, plus sign, or numbers
        const firstWord = emailName
            .split(/[._+\-\s0-9]+/)
            .filter(Boolean)[0];

        if (!firstWord) {

            return "Client";

        }

        // Convert first word into professional title case
        return firstWord.charAt(0).toUpperCase() +
            firstWord.slice(1).toLowerCase();

    }


    /* =====================================================
       03. DISPLAY CLIENT NAME AND EMAIL
    ===================================================== */

    function updateClientDetails() {

        const clientEmail = getClientEmail();

        const clientName = getClientName(clientEmail);

        // Get first letter for avatar
        const clientInitial = clientName.charAt(0).toUpperCase();


        // HTML elements
        const emailElement =
            document.getElementById("stacklyInsuranceClientEmail");

        const nameElement =
            document.getElementById("stacklyInsuranceClientName");

        const welcomeNameElement =
            document.getElementById("stacklyInsuranceClientWelcomeName");

        const avatarElement =
            document.getElementById("stacklyInsuranceClientAvatar");

        const headerAvatarElement =
            document.getElementById("stacklyInsuranceClientHeaderAvatar");


        // Display email
        if (emailElement) {

            emailElement.textContent =
                clientEmail || "Not signed in";

        }


        // Display client name in sidebar
        if (nameElement) {

            nameElement.textContent = clientName;

        }


        // Display name in welcome heading
        if (welcomeNameElement) {

            welcomeNameElement.textContent = clientName;

        }


        // Display sidebar avatar initial
        if (avatarElement) {

            avatarElement.textContent = clientInitial;

        }


        // Display header avatar initial
        if (headerAvatarElement) {

            headerAvatarElement.textContent = clientInitial;

        }

    }


    // Run client information update
    updateClientDetails();


    /* =====================================================
       04. AUTOMATICALLY UPDATE CURRENT DATE
    ===================================================== */

    function updateClientDate() {

        const dateElement =
            document.getElementById("stacklyInsuranceClientDate");

        if (!dateElement) return;

        const currentDate = new Date();

        const formattedDate = currentDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

        dateElement.textContent = formattedDate;

    }


    updateClientDate();


    /* =====================================================
       05. MOBILE SIDEBAR ELEMENTS
    ===================================================== */

    const sidebar =
        document.getElementById("stacklyInsuranceClientSidebar");

    const overlay =
        document.getElementById("stacklyInsuranceClientOverlay");

    const menuToggle =
        document.getElementById("stacklyInsuranceClientMenuToggle");

    const closeButton =
        document.getElementById("stacklyInsuranceClientClose");


    /* =====================================================
       06. OPEN MOBILE SIDEBAR
    ===================================================== */

    function openClientSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.add("active");

        overlay.classList.add("active");

        document.body.classList.add("stackly-insurance-client-menu-open");

        if (menuToggle) {

            menuToggle.setAttribute("aria-expanded", "true");

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        }

    }


    /* =====================================================
       07. CLOSE MOBILE SIDEBAR
    ===================================================== */

    function closeClientSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("active");

        overlay.classList.remove("active");

        document.body.classList.remove("stackly-insurance-client-menu-open");

        if (menuToggle) {

            menuToggle.setAttribute("aria-expanded", "false");

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    }


    /* =====================================================
       08. HAMBURGER BUTTON CLICK
    ===================================================== */

    if (menuToggle) {

        menuToggle.addEventListener("click", function () {

            const isOpen = sidebar &&
                sidebar.classList.contains("active");

            if (isOpen) {

                closeClientSidebar();

            } else {

                openClientSidebar();

            }

        });

    }


    /* =====================================================
       09. MOBILE EXIT BUTTON CLICK
    ===================================================== */

    if (closeButton) {

        closeButton.addEventListener("click", function () {

            closeClientSidebar();

        });

    }


    /* =====================================================
       10. OVERLAY CLICK TO CLOSE SIDEBAR
    ===================================================== */

    if (overlay) {

        overlay.addEventListener("click", function () {

            closeClientSidebar();

        });

    }


    /* =====================================================
       11. CLOSE SIDEBAR USING ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeClientSidebar();

        }

    });


    /* =====================================================
       12. CLOSE SIDEBAR AFTER CLICKING NAVIGATION LINK
    ===================================================== */

    const navigationLinks = document.querySelectorAll(
        ".stackly-insurance-client-nav-link"
    );

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeClientSidebar();

        });

    });


    /* =====================================================
       13. CLOSE SIDEBAR WHEN WINDOW RESIZES
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 1024) {

            closeClientSidebar();

        }

    });


    /* =====================================================
       14. UPDATE DETAILS WHEN LOCAL STORAGE CHANGES
    ===================================================== */

    window.addEventListener("storage", function (event) {

        if (
            event.key === "stacklyInsuranceLoginEmail" ||
            event.key === "loginEmail" ||
            event.key === "userEmail" ||
            event.key === "email"
        ) {

            updateClientDetails();

        }

    });


    /* =====================================================
       15. AOS ANIMATION INITIALIZATION
    ===================================================== */

    if (typeof AOS !== "undefined") {

        AOS.init({

            duration: 950,

            once: true,

            offset: 75,

            easing: "ease-out-cubic",

            mirror: false,

            anchorPlacement: "top-bottom"

        });

    }


    /* =====================================================
       16. REFRESH AOS AFTER PAGE CONTENT LOADS
    ===================================================== */

    window.addEventListener("load", function () {

        if (typeof AOS !== "undefined") {

            AOS.refresh();

        }

    });


});


// =====================================================
// STACKLY INSURANCE CLIENT DASHBOARD
// ACTIVE SIDEBAR NAVIGATION
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const navLinks = document.querySelectorAll(
        ".stackly-insurance-client-nav-link"
    );

    // Get current page filename
    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    navLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        // Remove existing active state
        link.classList.remove("active");
        link.removeAttribute("aria-current");

        // Highlight current page link
        if (linkPage === currentPage) {

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

        }

    });

});



/* =====================================================
   STACKLY INSURANCE - COPY POLICY NUMBER
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const policyNumberBlocks = document.querySelectorAll(
        ".stackly-insurance-policy-number"
    );

    policyNumberBlocks.forEach(function (block) {

        const copyIcon = block.querySelector("i");
        const policyNumber = block.querySelector("strong");

        if (!copyIcon || !policyNumber) return;

        copyIcon.style.cursor = "pointer";
        copyIcon.setAttribute("title", "Copy policy number");
        copyIcon.setAttribute("role", "button");
        copyIcon.setAttribute("tabindex", "0");
        copyIcon.setAttribute("aria-label", "Copy policy number");

        async function copyPolicyNumber() {

            const text = policyNumber.textContent.trim();

            try {

                await navigator.clipboard.writeText(text);

                copyIcon.classList.remove("fa-copy");
                copyIcon.classList.add("fa-check");

                copyIcon.style.color = "#15966B";
                copyIcon.setAttribute("title", "Copied!");

                // Restore the original icon
                setTimeout(function () {

                    copyIcon.classList.remove("fa-check");
                    copyIcon.classList.add("fa-copy");

                    copyIcon.style.color = "";
                    copyIcon.setAttribute("title", "Copy policy number");

                }, 1800);

            } catch (error) {

                // Fallback for browsers without Clipboard API support
                const temporaryInput = document.createElement("textarea");

                temporaryInput.value = text;
                temporaryInput.style.position = "fixed";
                temporaryInput.style.opacity = "0";

                document.body.appendChild(temporaryInput);

                temporaryInput.select();

                try {

                    document.execCommand("copy");

                    copyIcon.classList.remove("fa-copy");
                    copyIcon.classList.add("fa-check");

                    copyIcon.style.color = "#15966B";
                    copyIcon.setAttribute("title", "Copied!");

                    setTimeout(function () {

                        copyIcon.classList.remove("fa-check");
                        copyIcon.classList.add("fa-copy");

                        copyIcon.style.color = "";
                        copyIcon.setAttribute("title", "Copy policy number");

                    }, 1800);

                } catch (fallbackError) {

                    copyIcon.setAttribute("title", "Unable to copy");

                }

                temporaryInput.remove();

            }

        }

        // Mouse click
        copyIcon.addEventListener("click", copyPolicyNumber);

        // Keyboard accessibility
        copyIcon.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {

                event.preventDefault();
                copyPolicyNumber();

            }

        });

    });

});



/* =========================================================
   STACKLY INSURANCE CLIENT PROFILE JAVASCRIPT
   DISPLAY LOGGED-IN CLIENT NAME AND EMAIL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       01. GET LOGGED-IN EMAIL
    ========================================= */

    function getClientEmail() {

        const emailKeys = [
            "stacklyInsuranceLoginEmail",
            "loginEmail",
            "userEmail",
            "email"
        ];

        for (const key of emailKeys) {

            const storedEmail = localStorage.getItem(key);

            if (storedEmail && storedEmail.includes("@")) {
                return storedEmail.trim().toLowerCase();
            }

        }

        return "client@example.com";

    }


    /* =========================================
       02. GENERATE NAME FROM EMAIL
    ========================================= */

    function getClientName(email) {

        const emailName = email.split("@")[0];

        const firstWord = emailName
            .split(/[._+\-\s0-9]+/)
            .filter(Boolean)[0] || "Client";

        return firstWord.charAt(0).toUpperCase() +
            firstWord.slice(1).toLowerCase();

    }


    /* =========================================
       03. UPDATE CLIENT PROFILE
    ========================================= */

    function updateClientProfile() {

        const email = getClientEmail();

        const clientName = getClientName(email);

        const initial = clientName.charAt(0).toUpperCase();


        /* PROFILE NAME */

        const profileName =
            document.getElementById("stacklyInsuranceProfileName");

        if (profileName) {
            profileName.textContent = clientName;
        }


        /* PROFILE INITIAL */

        const profileInitial =
            document.getElementById("stacklyInsuranceProfileInitial");

        if (profileInitial) {
            profileInitial.textContent = initial;
        }


        /* PROFILE EMAIL */

        const profileEmail =
            document.getElementById("stacklyInsuranceProfileEmail");

        if (profileEmail) {
            profileEmail.textContent = email;
        }


        /* CONTACT EMAIL */

        const contactEmail =
            document.getElementById("stacklyInsuranceProfileContactEmail");

        if (contactEmail) {
            contactEmail.textContent = email;
        }


        /* PERSONAL INFORMATION NAME */

        const fullName =
            document.getElementById("stacklyInsuranceProfileFullName");

        if (fullName) {
            fullName.textContent = clientName;
        }


        /* SIDEBAR CLIENT NAME */

        const sidebarName =
            document.getElementById("stacklyInsuranceClientName");

        if (sidebarName) {
            sidebarName.textContent = clientName;
        }


        /* SIDEBAR AVATAR */

        const sidebarAvatar =
            document.getElementById("stacklyInsuranceClientAvatar");

        if (sidebarAvatar) {
            sidebarAvatar.textContent = initial;
        }


        /* HEADER AVATAR */

        const headerAvatar =
            document.getElementById("stacklyInsuranceClientHeaderAvatar");

        if (headerAvatar) {
            headerAvatar.textContent = initial;
        }


        /* HEADER EMAIL */

        const headerEmail =
            document.getElementById("stacklyInsuranceClientEmail");

        if (headerEmail) {
            headerEmail.textContent = email;
        }

    }


    /* =========================================
       04. INITIAL PROFILE UPDATE
    ========================================= */

    updateClientProfile();


    /* =========================================
       05. UPDATE WHEN LOGIN EMAIL CHANGES
    ========================================= */

    window.addEventListener("storage", function (event) {

        const emailKeys = [
            "stacklyInsuranceLoginEmail",
            "loginEmail",
            "userEmail",
            "email"
        ];

        if (emailKeys.includes(event.key)) {
            updateClientProfile();
        }

    });

});
