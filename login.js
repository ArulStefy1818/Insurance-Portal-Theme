
/* =====================================================
   STACKLY INSURANCE - LOGIN & SIGNUP JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // ================================================
    // ELEMENT REFERENCES
    // ================================================

    const loginPanel = document.getElementById("stacklyInsuranceLoginPanel");
    const signupPanel = document.getElementById("stacklyInsuranceSignupPanel");

    const loginForm = document.getElementById("stacklyInsuranceLoginForm");
    const signupForm = document.getElementById("stacklyInsuranceSignupForm");

    const loginMessage = document.getElementById("stacklyLoginMessage");
    const signupMessage = document.getElementById("stacklySignupMessage");

    const showSignupBtn = document.getElementById("stacklyShowSignup");
    const showLoginBtn = document.getElementById("stacklyShowLogin");

    const forgotPassword = document.getElementById("stacklyForgotPassword");

    const loginEmail = document.getElementById("stacklyLoginEmail");
    const loginPassword = document.getElementById("stacklyLoginPassword");

    const signupName = document.getElementById("stacklySignupName");
    const signupEmail = document.getElementById("stacklySignupEmail");
    const signupPhone = document.getElementById("stacklySignupPhone");
    const signupPassword = document.getElementById("stacklySignupPassword");
    const signupConfirmPassword = document.getElementById("stacklySignupConfirmPassword");
    const signupTerms = document.getElementById("stacklySignupTerms");

    const authYear = document.getElementById("stacklyAuthYear");


    // ================================================
    // LOCAL STORAGE KEYS
    // ================================================

    const USERS_STORAGE_KEY = "stacklyInsuranceUsers";
    const LOGIN_EMAIL_KEY = "stacklyInsuranceLoginEmail";
    const LOGIN_ROLE_KEY = "stacklyInsuranceLoginRole";


    // ================================================
    // AOS INITIALIZATION
    // ================================================

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 950,
            once: true,
            offset: 70,
            easing: "ease-out-cubic",
            mirror: false
        });

    }


    // ================================================
    // HELPER FUNCTIONS
    // ================================================

    function showMessage(element, message, type) {

        if (!element) return;

        element.textContent = message;

        element.classList.remove("is-success", "is-error");

        element.classList.add(
            type === "success" ? "is-success" : "is-error"
        );

        element.style.display = "block";

    }


    function clearMessage(element) {

        if (!element) return;

        element.textContent = "";

        element.classList.remove("is-success", "is-error");

        element.style.display = "none";

    }


    function getRegisteredUsers() {

        try {

            const users = JSON.parse(
                localStorage.getItem(USERS_STORAGE_KEY)
            );

            return Array.isArray(users) ? users : [];

        } catch (error) {

            return [];

        }

    }


    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    }


    function isValidName(name) {

        return /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(name.trim());

    }


    function isValidPhone(phone) {

        return /^[0-9]{10}$/.test(phone);

    }


    // PASSWORD MUST CONTAIN AT LEAST 6 CHARACTERS

    function isValidPassword(password) {

        return password.length >= 6;

    }


    function getSelectedRole(form) {

        const roleInput = form.querySelector(
            ".stackly-insurance-role-value"
        );

        return roleInput ? roleInput.value.trim() : "";

    }


    function showFieldError(input, messageElement, message) {

        const group = input.closest(
            ".stackly-insurance-auth-group"
        );

        if (group) {

            group.classList.add("has-error");

        }

        showMessage(messageElement, message, "error");

        input.focus();

    }


    function clearFieldErrors(form) {

        form.querySelectorAll(
            ".stackly-insurance-auth-group"
        ).forEach(group => {

            group.classList.remove("has-error");

        });

    }


    // ================================================
    // LOGIN / SIGNUP PANEL SWITCHING
    // ================================================

    function showLoginPanel() {

        signupPanel.classList.remove("active");
        loginPanel.classList.add("active");

        clearMessage(loginMessage);
        clearMessage(signupMessage);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    function showSignupPanel() {

        loginPanel.classList.remove("active");
        signupPanel.classList.add("active");

        clearMessage(loginMessage);
        clearMessage(signupMessage);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    if (showSignupBtn) {

        showSignupBtn.addEventListener(
            "click",
            showSignupPanel
        );

    }


    if (showLoginBtn) {

        showLoginBtn.addEventListener(
            "click",
            showLoginPanel
        );

    }


    // ================================================
    // PROFESSIONAL ROLE DROPDOWN
    // ================================================

    const roleDropdowns = document.querySelectorAll(
        "[data-role-dropdown]"
    );


    function closeAllRoleDropdowns() {

        roleDropdowns.forEach(dropdown => {

            dropdown.classList.remove("active");

            const trigger = dropdown.querySelector(
                ".stackly-insurance-role-trigger"
            );

            if (trigger) {

                trigger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    roleDropdowns.forEach(dropdown => {

        const trigger = dropdown.querySelector(
            ".stackly-insurance-role-trigger"
        );

        const selectedText = dropdown.querySelector(
            ".stackly-insurance-role-selected"
        );

        const options = dropdown.querySelectorAll(
            ".stackly-insurance-role-option"
        );

        const hiddenInput = dropdown.querySelector(
            ".stackly-insurance-role-value"
        );


        if (!trigger || !selectedText || !hiddenInput) return;


        // OPEN / CLOSE DROPDOWN

        trigger.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen = dropdown.classList.contains("active");

            closeAllRoleDropdowns();

            if (!isOpen) {

                dropdown.classList.add("active");

                trigger.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });


        // SELECT ROLE

        options.forEach(option => {

            option.addEventListener("click", function (event) {

                event.stopPropagation();

                const selectedRole = this.dataset.value;

                hiddenInput.value = selectedRole;

                selectedText.innerHTML = `
                    <i class="fa-solid ${
                        selectedRole === "Admin"
                            ? "fa-user-shield"
                            : "fa-user"
                    }"></i>
                    ${selectedRole}
                `;


                options.forEach(item => {

                    item.classList.remove("selected");

                    item.removeAttribute("aria-selected");

                });


                this.classList.add("selected");

                this.setAttribute(
                    "aria-selected",
                    "true"
                );


                closeAllRoleDropdowns();

                const form = dropdown.closest("form");

                if (form) {

                    clearMessage(
                        form.querySelector(
                            ".stackly-insurance-auth-message"
                        )
                    );

                }

            });

        });

    });


    // CLOSE DROPDOWN OUTSIDE CLICK

    document.addEventListener("click", function (event) {

        if (!event.target.closest("[data-role-dropdown]")) {

            closeAllRoleDropdowns();

        }

    });


    // CLOSE DROPDOWN WITH ESCAPE

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeAllRoleDropdowns();

        }

    });


    // ================================================
    // PASSWORD SHOW / HIDE
    // ================================================

    document.querySelectorAll(
        ".stackly-insurance-password-toggle"
    ).forEach(button => {

        button.addEventListener("click", function () {

            const inputId = this.dataset.password;

            const passwordInput = document.getElementById(inputId);

            const icon = this.querySelector("i");

            if (!passwordInput || !icon) return;


            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

                this.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                passwordInput.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

                this.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        });

    });


    // ================================================
    // LOGIN FORM - DIRECT ROLE-BASED REDIRECTION
    // ================================================

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            clearMessage(loginMessage);

            clearFieldErrors(loginForm);


            const email = loginEmail.value.trim().toLowerCase();

            const password = loginPassword.value;

            const role = getSelectedRole(loginForm);


            // EMPTY FIELD VALIDATION

            if (!email || !password || !role) {

                showMessage(
                    loginMessage,
                    "Please fill in all fields and select your login role.",
                    "error"
                );

                if (!email) loginEmail.focus();

                else if (!password) loginPassword.focus();

                else loginForm.querySelector(
                    ".stackly-insurance-role-trigger"
                ).focus();

                return;

            }


            // EMAIL VALIDATION

            if (!isValidEmail(email)) {

                showFieldError(
                    loginEmail,
                    loginMessage,
                    "Please enter a valid email address."
                );

                return;

            }


            // PASSWORD VALIDATION - 6 OR MORE CHARACTERS

            if (!isValidPassword(password)) {

                showFieldError(
                    loginPassword,
                    loginMessage,
                    "Password must contain at least 6 characters."
                );

                return;

            }


            // ROLE VALIDATION

            if (!["Admin", "Client"].includes(role)) {

                showMessage(
                    loginMessage,
                    "Please select a valid login role.",
                    "error"
                );

                return;

            }


            // SAVE EMAIL AND ROLE IN LOCAL STORAGE

            try {

                localStorage.setItem(
                    LOGIN_EMAIL_KEY,
                    email
                );

                localStorage.setItem(
                    LOGIN_ROLE_KEY,
                    role
                );

            } catch (error) {

                showMessage(
                    loginMessage,
                    "Unable to save login details in this browser.",
                    "error"
                );

                return;

            }


            // DASHBOARD REDIRECTION

            const dashboardPages = {

                Admin: "admin.html",

                Client: "client.html"

            };


            showMessage(
                loginMessage,
                "Login successful! Redirecting to your dashboard...",
                "success"
            );


            setTimeout(function () {

                window.location.href = dashboardPages[role];

            }, 1000);

        });

    }


    // ================================================
    // SIGNUP FORM - VALIDATION & ACCOUNT CREATION
    // ================================================

    if (signupForm) {

        signupForm.addEventListener("submit", function (event) {

            event.preventDefault();

            clearMessage(signupMessage);

            clearFieldErrors(signupForm);


            const name = signupName.value.trim();

            const email = signupEmail.value.trim().toLowerCase();

            const phone = signupPhone.value.trim();

            const password = signupPassword.value;

            const confirmPassword = signupConfirmPassword.value;

            const role = getSelectedRole(signupForm);


            // EMPTY FIELD VALIDATION

            if (
                !name ||
                !email ||
                !phone ||
                !password ||
                !confirmPassword ||
                !role
            ) {

                showMessage(
                    signupMessage,
                    "Please complete all fields and select your registration role.",
                    "error"
                );

                if (!name) signupName.focus();

                else if (!email) signupEmail.focus();

                else if (!phone) signupPhone.focus();

                else if (!password) signupPassword.focus();

                else if (!confirmPassword) signupConfirmPassword.focus();

                else signupForm.querySelector(
                    ".stackly-insurance-role-trigger"
                ).focus();

                return;

            }


            // NAME VALIDATION

            if (!isValidName(name)) {

                showFieldError(
                    signupName,
                    signupMessage,
                    "Please enter a valid name using alphabetic characters only."
                );

                return;

            }


            // EMAIL VALIDATION

            if (!isValidEmail(email)) {

                showFieldError(
                    signupEmail,
                    signupMessage,
                    "Please enter a valid email address."
                );

                return;

            }


            // PHONE VALIDATION

            if (!isValidPhone(phone)) {

                showFieldError(
                    signupPhone,
                    signupMessage,
                    "Phone number must contain exactly 10 digits."
                );

                return;

            }


            // SIGNUP PASSWORD VALIDATION
            // ACCEPTS 6, 7, 8, 9, 10 OR MORE CHARACTERS

            if (password.length < 6) {

                showFieldError(
                    signupPassword,
                    signupMessage,
                    "Create a password with at least 6 characters."
                );

                return;

            }


            // CONFIRM PASSWORD VALIDATION

            if (password !== confirmPassword) {

                showFieldError(
                    signupConfirmPassword,
                    signupMessage,
                    "Password and confirm password do not match."
                );

                return;

            }


            // ROLE VALIDATION

            if (!["Admin", "Client"].includes(role)) {

                showMessage(
                    signupMessage,
                    "Please select a valid registration role.",
                    "error"
                );

                return;

            }


            // TERMS VALIDATION

            if (!signupTerms.checked) {

                showMessage(
                    signupMessage,
                    "Please accept the Terms & Conditions and Privacy Policy.",
                    "error"
                );

                signupTerms.focus();

                return;

            }


            // DUPLICATE EMAIL VALIDATION

            const users = getRegisteredUsers();

            const existingUser = users.find(
                user => user.email === email
            );

            if (existingUser) {

                showFieldError(
                    signupEmail,
                    signupMessage,
                    "This email is already registered. Please use another email."
                );

                return;

            }


            // CREATE NEW ACCOUNT

            const newUser = {

                name: name,

                email: email,

                phone: phone,

                password: password,

                role: role,

                registeredAt: new Date().toISOString()

            };


            // SAVE ACCOUNT DETAILS

            try {

                users.push(newUser);

                localStorage.setItem(
                    USERS_STORAGE_KEY,
                    JSON.stringify(users)
                );

            } catch (error) {

                showMessage(
                    signupMessage,
                    "Unable to create your account. Please check your browser storage.",
                    "error"
                );

                return;

            }


            // SIGNUP SUCCESS MESSAGE

            showMessage(
                signupMessage,
                "Your account has been created successfully!",
                "success"
            );


            // COPY EMAIL INTO LOGIN FORM

            loginEmail.value = email;


            // RESET SIGNUP FORM

            signupForm.reset();


            // RESET ROLE DROPDOWN

            signupForm.querySelectorAll(
                ".stackly-insurance-role-value"
            ).forEach(input => {

                input.value = "";

            });


            signupForm.querySelectorAll(
                ".stackly-insurance-role-selected"
            ).forEach(selected => {

                selected.innerHTML = `
                    <i class="fa-solid fa-user"></i>
                    Select Your Role
                `;

            });


            signupForm.querySelectorAll(
                ".stackly-insurance-role-option"
            ).forEach(option => {

                option.classList.remove("selected");

                option.removeAttribute("aria-selected");

            });


            // RESET PASSWORD VISIBILITY

            signupForm.querySelectorAll(
                ".stackly-insurance-password-toggle"
            ).forEach(button => {

                const input = document.getElementById(
                    button.dataset.password
                );

                const icon = button.querySelector("i");

                if (input) {

                    input.type = "password";

                }

                if (icon) {

                    icon.classList.remove("fa-eye-slash");

                    icon.classList.add("fa-eye");

                }

                button.setAttribute(
                    "aria-label",
                    "Show password"
                );

            });


            // AUTOMATICALLY RETURN TO LOGIN

            setTimeout(function () {

                showLoginPanel();

                loginEmail.value = email;

                showMessage(
                    loginMessage,
                    "Registration successful! Please enter your password to continue.",
                    "success"
                );

                loginPassword.focus();

            }, 1200);

        });

    }


    // ================================================
    // FORGOT PASSWORD
    // ================================================

    if (forgotPassword) {

        forgotPassword.addEventListener("click", function (event) {

            event.preventDefault();

            showMessage(
                loginMessage,
                "For password assistance, please contact Stackly Insurance support.",
                "error"
            );

        });

    }


    // ================================================
    // CLEAR ERRORS WHEN USER TYPES
    // ================================================

    document.querySelectorAll(
        ".stackly-insurance-auth-form input"
    ).forEach(input => {

        input.addEventListener("input", function () {

            const group = this.closest(
                ".stackly-insurance-auth-group"
            );

            if (group) {

                group.classList.remove("has-error");

            }

            const form = this.closest("form");

            if (form) {

                clearMessage(
                    form.querySelector(
                        ".stackly-insurance-auth-message"
                    )
                );

            }

        });

    });


    // ================================================
    // PHONE NUMBER - ONLY 10 DIGITS
    // ================================================

    if (signupPhone) {

        signupPhone.addEventListener("input", function () {

            this.value = this.value
                .replace(/\D/g, "")
                .slice(0, 10);

        });

    }


    // ================================================
    // COPYRIGHT YEAR
    // ================================================

    if (authYear) {

        authYear.textContent = new Date().getFullYear();

    }

});
