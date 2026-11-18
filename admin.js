
/* =====================================================
   STACKLY INSURANCE ADMIN DASHBOARD
   COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   01. AOS INITIALIZATION
===================================================== */

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 950,

        once: true,

        offset: 70,

        easing: "ease-out-cubic",

        mirror: false

    });

}


/* =====================================================
   02. MAIN ADMIN DASHBOARD
   SIDEBAR, USER DETAILS & COPYRIGHT
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    // =============================================
    // SIDEBAR ELEMENTS
    // =============================================

    const sidebar = document.getElementById(
        "stacklyInsuranceAdminSidebar"
    );

    const overlay = document.getElementById(
        "stacklyInsuranceAdminOverlay"
    );

    const menuToggle = document.getElementById(
        "stacklyInsuranceAdminMenuToggle"
    );

    const closeButton = document.getElementById(
        "stacklyInsuranceAdminClose"
    );


    // =============================================
    // OPEN SIDEBAR
    // =============================================

    function openSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.add("active");

        overlay.classList.add("active");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "true"
            );

        }

        document.body.style.overflow = "hidden";

    }


    // =============================================
    // CLOSE SIDEBAR
    // =============================================

    function closeSidebar() {

        if (!sidebar || !overlay) return;

        sidebar.classList.remove("active");

        overlay.classList.remove("active");

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        document.body.style.overflow = "";

    }


    // =============================================
    // SIDEBAR EVENT LISTENERS
    // =============================================

    menuToggle?.addEventListener("click", openSidebar);

    closeButton?.addEventListener("click", closeSidebar);

    overlay?.addEventListener("click", closeSidebar);


    // =============================================
    // CLOSE SIDEBAR WITH ESCAPE KEY
    // =============================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeSidebar();

        }

    });


    // =============================================
    // CLOSE SIDEBAR AFTER MOBILE NAVIGATION
    // =============================================

    if (sidebar) {

        sidebar.querySelectorAll(
            ".stackly-insurance-admin-nav-link"
        ).forEach(function (link) {

            link.addEventListener("click", function () {

                if (window.innerWidth <= 850) {

                    closeSidebar();

                }

            });

        });

    }


    // =============================================
    // RESET SIDEBAR ON DESKTOP RESIZE
    // =============================================

    window.addEventListener("resize", function () {

        if (window.innerWidth > 850) {

            closeSidebar();

        }

    });


    // =============================================
    // AUTOMATIC COPYRIGHT YEAR
    // =============================================

    const year = document.getElementById(
        "stacklyInsuranceAdminYear"
    );

    if (year) {

        year.textContent = new Date().getFullYear();

    }


    // =============================================
    // USER DETAILS
    // =============================================

    const emailElement = document.getElementById(
        "stacklyInsuranceAdminEmail"
    );

    const nameElement = document.getElementById(
        "stacklyInsuranceAdminName"
    );

    const avatarElement = document.getElementById(
        "stacklyInsuranceAdminAvatar"
    );


    // =============================================
    // GENERATE USER NAME FROM EMAIL
    // =============================================

    function generateUserName(email) {

        if (!email || !email.includes("@")) {

            return "Administrator";

        }

        const emailName = email
            .trim()
            .split("@")[0];

        const firstWord = emailName
            .split(/[._+\-\s0-9]+/)
            .filter(Boolean)[0];

        if (!firstWord) {

            return "Administrator";

        }

        return firstWord.charAt(0).toUpperCase() +
            firstWord.slice(1).toLowerCase();

    }


    // =============================================
    // GET SAVED USER EMAIL
    // =============================================

    function getAdminEmail() {

        try {

            return (
                localStorage.getItem(
                    "stacklyInsuranceAdminEmailValue"
                ) ||

                localStorage.getItem("loginEmail") ||

                localStorage.getItem(
                    "stacklyInsuranceLoginEmail"
                ) ||

                localStorage.getItem("userEmail") ||

                localStorage.getItem("email") ||

                "admin@stacklyinsurance.com"
            );

        } catch (error) {

            console.warn(
                "Unable to retrieve administrator email.",
                error
            );

            return "admin@stacklyinsurance.com";

        }

    }


    // =============================================
    // DISPLAY USER DETAILS
    // =============================================

    function displayAdminDetails() {

        const userEmail = getAdminEmail();

        const userName = generateUserName(userEmail);


        if (emailElement) {

            emailElement.textContent = userEmail;

        }

        if (nameElement) {

            nameElement.textContent = userName;

        }

        if (avatarElement) {

            avatarElement.textContent =
                userName.charAt(0).toUpperCase();

        }

    }


    displayAdminDetails();


    // =============================================
    // ACTIVE SIDEBAR NAVIGATION
    // =============================================

    const navLinks = document.querySelectorAll(
        ".stackly-insurance-admin-nav-link"
    );

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase() || "admin.html";


    navLinks.forEach(function (link) {

        const linkPage = link.getAttribute("href")
            ?.split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

        } else {

            link.classList.remove("active");

            link.removeAttribute("aria-current");

        }

    });

});



/* =====================================================
   03. REVENUE OVERVIEW & POLICY DISTRIBUTION
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    // =============================================
    // REVENUE CHART ELEMENTS
    // =============================================

    const revenueDropdown = document.getElementById(
        "revenuePeriodDropdown"
    );

    const revenueDropdownBtn = revenueDropdown?.querySelector(
        ".stackly-insurance-admin-dropdown-btn"
    );

    const revenueDropdownValue = revenueDropdown?.querySelector(
        ".stackly-insurance-admin-dropdown-value"
    );

    const revenueOptions = revenueDropdown?.querySelectorAll(
        ".stackly-insurance-admin-dropdown-option"
    );

    const revenueAmount = document.querySelector(
        ".stackly-insurance-admin-revenue-summary h2"
    );

    const revenueGrowth = document.querySelector(
        ".stackly-insurance-admin-revenue-summary span"
    );

    const chartBars = document.querySelector(
        ".stackly-insurance-admin-chart-bars"
    );


    // =============================================
    // REVENUE DATA
    // =============================================

    const revenueData = {

        year: {

            amount: "₹24,85,620",

            growth: "18.4% increase",

            bars: [
                38, 52, 45, 65, 58, 76,
                69, 88, 80, 94, 85, 100
            ],

            labels: [
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"
            ]

        },

        month: {

            amount: "₹3,85,420",

            growth: "12.8% increase",

            bars: [
                42, 55, 48, 68, 60, 78,
                72, 88, 82, 95, 90, 100
            ],

            labels: [
                "01", "03", "05", "07",
                "09", "11", "13", "15",
                "17", "19", "21", "23"
            ]

        },

        week: {

            amount: "₹98,650",

            growth: "8.6% increase",

            bars: [
                45, 62, 55, 75, 68, 88, 100
            ],

            labels: [
                "Mon", "Tue", "Wed", "Thu",
                "Fri", "Sat", "Sun"
            ]

        }

    };


    // =============================================
    // UPDATE REVENUE CHART
    // =============================================

    function updateRevenueChart(period) {

        const data = revenueData[period];

        if (!data) return;


        // Update revenue amount

        if (revenueAmount) {

            revenueAmount.style.opacity = "0";

            setTimeout(function () {

                revenueAmount.textContent = data.amount;

                revenueAmount.style.opacity = "1";

            }, 180);

        }


        // Update revenue growth

        if (revenueGrowth) {

            const icon = document.createElement("i");

            icon.className = "fa-solid fa-arrow-trend-up";

            revenueGrowth.replaceChildren(
                icon,
                document.createTextNode(" " + data.growth)
            );

        }


        // Update chart bars

        if (chartBars) {

            chartBars.style.opacity = "0";

            setTimeout(function () {

                chartBars.replaceChildren();

                data.bars.forEach(function (height, index) {

                    const group = document.createElement("div");

                    group.className =
                        "stackly-insurance-admin-bar-group";


                    const bar = document.createElement("div");

                    bar.className =
                        "stackly-insurance-admin-bar";

                    bar.style.setProperty(
                        "--bar-height",
                        height + "%"
                    );


                    const label = document.createElement("span");

                    label.textContent = data.labels[index];


                    group.appendChild(bar);

                    group.appendChild(label);

                    chartBars.appendChild(group);

                });


                chartBars.style.opacity = "1";

            }, 180);

        }

    }


    // =============================================
    // CUSTOM REVENUE DROPDOWN
    // =============================================

    if (revenueDropdown && revenueDropdownBtn) {


        revenueDropdownBtn.setAttribute(
            "aria-expanded",
            "false"
        );


        // Toggle dropdown

        revenueDropdownBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                const isOpen =
                    revenueDropdown.classList.toggle("open");

                revenueDropdownBtn.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );


        // Select revenue period

        revenueOptions?.forEach(function (option) {

            option.addEventListener("click", function () {

                const selectedPeriod = this.dataset.value;

                const selectedText = this.textContent.trim();


                // Update dropdown label

                if (revenueDropdownValue) {

                    revenueDropdownValue.textContent =
                        selectedText;

                }


                // Update active option

                revenueOptions.forEach(function (item) {

                    item.classList.remove("active");

                });

                this.classList.add("active");


                // Close dropdown

                revenueDropdown.classList.remove("open");

                revenueDropdownBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );


                // Update chart

                updateRevenueChart(selectedPeriod);


                // Dispatch custom event

                revenueDropdown.dispatchEvent(
                    new CustomEvent("periodChange", {

                        bubbles: true,

                        detail: {

                            value: selectedPeriod,

                            label: selectedText

                        }

                    })
                );

            });

        });


        // Close on outside click

        document.addEventListener("click", function (event) {

            if (!revenueDropdown.contains(event.target)) {

                revenueDropdown.classList.remove("open");

                revenueDropdownBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        // Close on Escape

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                revenueDropdown.classList.remove("open");

                revenueDropdownBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                revenueDropdownBtn.focus();

            }

        });

    }


    // =============================================
    // INITIAL REVENUE CHART
    // =============================================

    updateRevenueChart("year");


    // =============================================
    // POLICY DISTRIBUTION DONUT
    // =============================================

    const policyDonut = document.querySelector(
        ".stackly-insurance-admin-donut"
    );

    const policyTotal = document.querySelector(
        ".stackly-insurance-admin-donut-inner h3"
    );


    if (policyDonut) {

        policyDonut.style.transition =
            "background 1.2s ease";

        policyDonut.style.background =
            "conic-gradient(" +
            "#1557A6 0% 42%, " +
            "#087F8C 42% 70%, " +
            "#E9B75A 70% 88%, " +
            "#B49AE8 88% 100%)";

    }


    // =============================================
    // POLICY TOTAL COUNTER
    // =============================================

    if (policyTotal) {

        const target = 2846;

        const duration = 1400;

        const startTime = performance.now();


        function animatePolicyCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            const currentValue = Math.floor(
                target * easedProgress
            );

            policyTotal.textContent =
                currentValue.toLocaleString("en-IN");


            if (progress < 1) {

                requestAnimationFrame(
                    animatePolicyCounter
                );

            }

        }


        requestAnimationFrame(
            animatePolicyCounter
        );

    }


    // =============================================
    // POLICY LEGEND ANIMATION
    // =============================================

    const policyLegendItems = document.querySelectorAll(
        ".stackly-insurance-admin-legend > div"
    );


    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    policyLegendItems.forEach(function (item, index) {

        if (reduceMotion) return;

        item.style.opacity = "0";

        item.style.transform = "translateY(10px)";

        item.style.transition =
            "opacity 0.5s ease, transform 0.5s ease";


        setTimeout(function () {

            item.style.opacity = "1";

            item.style.transform = "translateY(0)";

        }, 300 + (index * 150));

    });

});



/* =====================================================
   04. POLICY TABLE MANAGEMENT
   SEARCH, FILTER & EMPTY STATE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    // =============================================
    // SELECT ELEMENTS
    // =============================================

    const policySearch = document.getElementById(
        "stacklyInsurancePolicySearch"
    );

    const policyFilter = document.getElementById(
        "stacklyInsurancePolicyFilter"
    );

    const filterContainer = document.querySelector(
        ".stackly-insurance-policy-filter"
    );

    const filterButton = document.getElementById(
        "stacklyInsurancePolicyFilterBtn"
    );

    const filterText = document.getElementById(
        "stacklyInsurancePolicyFilterText"
    );

    const filterMenu = document.getElementById(
        "stacklyInsurancePolicyFilterMenu"
    );

    const filterOptions = document.querySelectorAll(
        ".stackly-insurance-policy-filter-option"
    );

    const tableBody = document.getElementById(
        "stacklyInsurancePolicyTableBody"
    );

    const emptyState = document.getElementById(
        "stacklyInsurancePolicyEmpty"
    );

    const policyCount = document.getElementById(
        "stacklyInsurancePolicyCount"
    );


    // =============================================
    // VALIDATE ELEMENTS
    // =============================================

    if (
        !tableBody ||
        !policySearch ||
        !policyFilter ||
        !filterContainer ||
        !filterButton ||
        !filterMenu
    ) {

        return;

    }


    const policyRows = Array.from(
        tableBody.querySelectorAll("tr")
    );


    // =============================================
    // OPEN / CLOSE DROPDOWN
    // =============================================

    function closePolicyDropdown() {

        filterContainer.classList.remove("open");

        filterButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    filterButton.setAttribute(
        "aria-expanded",
        "false"
    );


    filterButton.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen =
            filterContainer.classList.toggle("open");

        filterButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    // =============================================
    // STATUS OPTION SELECTION
    // =============================================

    filterOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            const selectedValue = this.dataset.value;

            const selectedLabel = this.textContent.trim();


            policyFilter.value = selectedValue;


            if (filterText) {

                filterText.textContent = selectedLabel;

            }


            filterOptions.forEach(function (item) {

                item.classList.remove("active");

                item.removeAttribute("aria-current");

            });


            this.classList.add("active");

            this.setAttribute("aria-current", "true");


            closePolicyDropdown();

            filterPolicies();

        });

    });


    // =============================================
    // OUTSIDE CLICK
    // =============================================

    document.addEventListener("click", function (event) {

        if (!filterContainer.contains(event.target)) {

            closePolicyDropdown();

        }

    });


    // =============================================
    // ESCAPE KEY
    // =============================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closePolicyDropdown();

        }

    });


    // =============================================
    // POLICY SEARCH
    // =============================================

    policySearch.addEventListener("input", function () {

        filterPolicies();

    });


    // =============================================
    // FILTER POLICIES
    // =============================================

    function filterPolicies() {

        const searchValue = policySearch.value
            .trim()
            .toLowerCase();

        const selectedStatus = policyFilter.value
            .toLowerCase();

        let visibleCount = 0;


        policyRows.forEach(function (row) {

            const rowStatus = (
                row.dataset.status || ""
            ).toLowerCase();

            const rowText = row.textContent.toLowerCase();


            const matchesSearch =
                rowText.includes(searchValue);

            const matchesStatus =
                selectedStatus === "all" ||
                rowStatus === selectedStatus;

            const shouldDisplay =
                matchesSearch && matchesStatus;


            row.hidden = !shouldDisplay;

            if (shouldDisplay) {

                visibleCount++;

            }

        });


        // Update visible count

        if (policyCount) {

            policyCount.textContent = visibleCount;

        }


        // Empty state

        if (emptyState) {

            emptyState.hidden = visibleCount !== 0;

        }

    }


    // =============================================
    // INITIALIZE POLICY TABLE
    // =============================================

    filterPolicies();


    // =============================================
    // RESET FILTERS
    // =============================================

    window.resetInsurancePolicyFilters = function () {

        policySearch.value = "";

        policyFilter.value = "all";


        if (filterText) {

            filterText.textContent = "All Status";

        }


        filterOptions.forEach(function (option) {

            const isAll = option.dataset.value === "all";

            option.classList.toggle("active", isAll);

        });


        closePolicyDropdown();

        filterPolicies();

    };

});



/* =====================================================
   05. CLAIMS TABLE MANAGEMENT
   SEARCH, STATUS FILTER & EMPTY STATE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    // =============================================
    // SELECT ELEMENTS
    // =============================================

    const claimsSearch = document.getElementById(
        "stacklyInsuranceClaimsSearch"
    );

    const claimsFilterBtn = document.getElementById(
        "stacklyInsuranceClaimsFilterBtn"
    );

    const claimsFilterMenu = document.getElementById(
        "stacklyInsuranceClaimsFilterMenu"
    );

    const claimsFilterText = document.getElementById(
        "stacklyInsuranceClaimsFilterText"
    );

    const claimsFilterInput = document.getElementById(
        "stacklyInsuranceClaimsFilter"
    );

    const claimsTableBody = document.getElementById(
        "stacklyInsuranceClaimsTableBody"
    );

    const claimsEmpty = document.getElementById(
        "stacklyInsuranceClaimsEmpty"
    );

    const claimsCount = document.getElementById(
        "stacklyInsuranceClaimsCount"
    );


    // =============================================
    // VALIDATE ELEMENTS
    // =============================================

    if (
        !claimsSearch ||
        !claimsFilterBtn ||
        !claimsFilterMenu ||
        !claimsFilterText ||
        !claimsFilterInput ||
        !claimsTableBody ||
        !claimsEmpty ||
        !claimsCount
    ) {

        return;

    }


    const claimRows = Array.from(
        claimsTableBody.querySelectorAll("tr")
    );


    const filterOptions = claimsFilterMenu.querySelectorAll(
        ".stackly-insurance-claims-filter-option"
    );


    let activeStatus = "all";


    // =============================================
    // OPEN FILTER MENU
    // =============================================

    function openFilterMenu() {

        claimsFilterMenu.classList.add("active");

        claimsFilterBtn.classList.add("active");

        claimsFilterBtn.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    // =============================================
    // CLOSE FILTER MENU
    // =============================================

    function closeFilterMenu() {

        claimsFilterMenu.classList.remove("active");

        claimsFilterBtn.classList.remove("active");

        claimsFilterBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    claimsFilterBtn.setAttribute(
        "aria-expanded",
        "false"
    );

    claimsFilterBtn.setAttribute(
        "aria-controls",
        "stacklyInsuranceClaimsFilterMenu"
    );


    // =============================================
    // TOGGLE FILTER MENU
    // =============================================

    claimsFilterBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen =
            claimsFilterMenu.classList.contains("active");

        if (isOpen) {

            closeFilterMenu();

        } else {

            openFilterMenu();

        }

    });


    // =============================================
    // OUTSIDE CLICK
    // =============================================

    document.addEventListener("click", function (event) {

        if (
            !claimsFilterMenu.contains(event.target) &&
            !claimsFilterBtn.contains(event.target)
        ) {

            closeFilterMenu();

        }

    });


    // =============================================
    // ESCAPE KEY
    // =============================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeFilterMenu();

        }

    });


    // =============================================
    // STATUS FILTER OPTIONS
    // =============================================

    filterOptions.forEach(function (option) {

        option.setAttribute("aria-pressed", "false");


        option.addEventListener("click", function () {

            activeStatus = (
                this.dataset.value || "all"
            ).toLowerCase();

            const selectedText = this.textContent.trim();


            claimsFilterText.textContent = selectedText;

            claimsFilterInput.value = activeStatus;


            filterOptions.forEach(function (item) {

                item.classList.remove("active");

                item.setAttribute("aria-pressed", "false");

            });


            this.classList.add("active");

            this.setAttribute("aria-pressed", "true");


            closeFilterMenu();

            filterClaims();

        });

    });


    // =============================================
    // LIVE SEARCH
    // =============================================

    claimsSearch.addEventListener("input", function () {

        filterClaims();

    });


    // =============================================
    // FILTER CLAIMS
    // =============================================

    function filterClaims() {

        const searchValue = claimsSearch.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;


        claimRows.forEach(function (row) {

            const rowStatus = (
                row.dataset.status || ""
            ).toLowerCase();

            const rowText = row.textContent.toLowerCase();


            const matchesSearch =
                rowText.includes(searchValue);

            const matchesStatus =
                activeStatus === "all" ||
                rowStatus === activeStatus;

            const shouldShow =
                matchesSearch && matchesStatus;


            row.hidden = !shouldShow;

            row.classList.toggle(
                "claims-row-hidden",
                !shouldShow
            );


            if (shouldShow) {

                visibleCount++;

            }

        });


        // Update count

        claimsCount.textContent = visibleCount;


        // Empty state

        claimsEmpty.hidden = visibleCount !== 0;

        claimsTableBody.classList.toggle(
            "claims-no-results",
            visibleCount === 0
        );

    }


    // =============================================
    // INITIALIZE CLAIM TABLE
    // =============================================

    filterClaims();


    // =============================================
    // ROW HOVER EFFECT
    // =============================================

    claimRows.forEach(function (row) {

        row.addEventListener("mouseenter", function () {

            this.classList.add("claims-row-hover");

        });


        row.addEventListener("mouseleave", function () {

            this.classList.remove("claims-row-hover");

        });

    });

});



/* =====================================================
   06. CUSTOMER MANAGEMENT
   SEARCH, STATUS FILTER & EMPTY STATE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {


    // =============================================
    // SELECT ELEMENTS
    // =============================================

    const customersSearch = document.getElementById(
        "stacklyInsuranceCustomersSearch"
    );

    const filterButton = document.getElementById(
        "stacklyInsuranceCustomersFilterBtn"
    );

    const filterMenu = document.getElementById(
        "stacklyInsuranceCustomersFilterMenu"
    );

    const filterText = document.getElementById(
        "stacklyInsuranceCustomersFilterText"
    );

    const filterInput = document.getElementById(
        "stacklyInsuranceCustomersFilter"
    );

    const customersTableBody = document.getElementById(
        "stacklyInsuranceCustomersTableBody"
    );

    const customersCount = document.getElementById(
        "stacklyInsuranceCustomersCount"
    );

    const emptyState = document.getElementById(
        "stacklyInsuranceCustomersEmpty"
    );


    // =============================================
    // VALIDATE ELEMENTS
    // =============================================

    if (
        !customersSearch ||
        !filterButton ||
        !filterMenu ||
        !filterText ||
        !filterInput ||
        !customersTableBody ||
        !customersCount ||
        !emptyState
    ) {

        return;

    }


    const customerRows = Array.from(
        customersTableBody.querySelectorAll("tr")
    );

    const filterOptions = filterMenu.querySelectorAll(
        ".stackly-insurance-customers-filter-option"
    );


    // =============================================
    // OPEN FILTER
    // =============================================

    function openCustomerFilter() {

        filterMenu.classList.add("is-open");

        filterButton.classList.add("is-active");

        filterButton.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    // =============================================
    // CLOSE FILTER
    // =============================================

    function closeCustomerFilter() {

        filterMenu.classList.remove("is-open");

        filterButton.classList.remove("is-active");

        filterButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    filterButton.setAttribute(
        "aria-expanded",
        "false"
    );


    // =============================================
    // TOGGLE FILTER
    // =============================================

    filterButton.addEventListener("click", function (event) {

        event.stopPropagation();

        const isOpen =
            filterButton.getAttribute("aria-expanded") === "true";

        if (isOpen) {

            closeCustomerFilter();

        } else {

            openCustomerFilter();

        }

    });


    // =============================================
    // FILTER CUSTOMERS
    // =============================================

    function filterCustomers() {

        const searchValue = customersSearch.value
            .trim()
            .toLowerCase();

        const selectedStatus = filterInput.value
            .toLowerCase();

        let visibleCount = 0;


        customerRows.forEach(function (row) {

            const customerDetails =
                row.textContent.toLowerCase();

            const customerStatus = (
                row.getAttribute("data-status") || ""
            ).toLowerCase();


            const matchesSearch =
                customerDetails.includes(searchValue);

            const matchesStatus =
                selectedStatus === "all" ||
                customerStatus === selectedStatus;

            const shouldShow =
                matchesSearch && matchesStatus;


            row.hidden = !shouldShow;


            if (shouldShow) {

                visibleCount++;


                // Row entrance animation

                if (
                    !window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches &&
                    typeof row.animate === "function"
                ) {

                    row.animate(
                        [
                            {
                                opacity: 0,
                                transform: "translateY(8px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 280,
                            easing: "ease-out"
                        }
                    );

                }

            }

        });


        // Update customer count

        customersCount.textContent = visibleCount;


        // Empty state

        emptyState.hidden = visibleCount !== 0;

    }


    // =============================================
    // LIVE SEARCH
    // =============================================

    customersSearch.addEventListener(
        "input",
        filterCustomers
    );


    // =============================================
    // STATUS FILTER OPTIONS
    // =============================================

    filterOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            const selectedValue = this.dataset.value;

            const selectedLabel = this.textContent.trim();


            filterInput.value = selectedValue;

            filterText.textContent = selectedLabel;


            filterOptions.forEach(function (item) {

                item.classList.remove("active");

                item.setAttribute("aria-pressed", "false");

            });


            this.classList.add("active");

            this.setAttribute("aria-pressed", "true");


            filterCustomers();

            closeCustomerFilter();

        });

    });


    // =============================================
    // OUTSIDE CLICK
    // =============================================

    document.addEventListener("click", function (event) {

        const clickedInsideFilter =
            filterButton.contains(event.target) ||
            filterMenu.contains(event.target);

        if (!clickedInsideFilter) {

            closeCustomerFilter();

        }

    });


    // =============================================
    // ESCAPE KEY
    // =============================================

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeCustomerFilter();

        }

    });


    // =============================================
    // INITIALIZE CUSTOMER TABLE
    // =============================================

    filterCustomers();

});



/* =====================================================
   07. ADMIN PROFILE SETTINGS
   NAME, EMAIL, PHONE & LOCAL STORAGE
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    // =============================================
    // PROFILE ELEMENTS
    // =============================================

    const profileForm = document.getElementById(
        "insuranceProfileForm"
    );

    const fullNameInput = document.getElementById(
        "insuranceAdminFullName"
    );

    const emailInput = document.getElementById(
        "insuranceAdminEmail"
    );

    const phoneInput = document.getElementById(
        "insuranceAdminPhone"
    );

    const profileName = document.getElementById(
        "stacklyInsuranceSettingsProfileName"
    );

    const profileEmail = document.getElementById(
        "stacklyInsuranceSettingsProfileEmail"
    );

    const profileMessage = document.getElementById(
        "stacklyInsuranceProfileMessage"
    );


    // =============================================
    // DASHBOARD ELEMENTS
    // =============================================

    const sidebarName = document.getElementById(
        "stacklyInsuranceAdminName"
    );

    const headerEmail = document.getElementById(
        "stacklyInsuranceAdminEmail"
    );

    const avatarElement = document.getElementById(
        "stacklyInsuranceAdminAvatar"
    );


    // =============================================
    // VALIDATE PROFILE SECTION
    // =============================================

    if (
        !profileForm ||
        !fullNameInput ||
        !emailInput ||
        !phoneInput
    ) {

        return;

    }


    // =============================================
    // LOCAL STORAGE KEYS
    // =============================================

    const STORAGE_KEYS = {

        name: "stacklyInsuranceAdminNameValue",

        email: "stacklyInsuranceAdminEmailValue",

        phone: "stacklyInsuranceAdminPhoneValue"

    };


    // =============================================
    // GET NAME FROM EMAIL
    // =============================================

    function getNameFromEmail(email) {

        if (!email || !email.includes("@")) {

            return "Administrator";

        }


        const emailName = email
            .trim()
            .split("@")[0];


        const firstWord = emailName
            .split(/[._+\-\s0-9]+/)
            .filter(Boolean)[0];


        if (!firstWord) {

            return "Administrator";

        }


        return firstWord.charAt(0).toUpperCase() +
            firstWord.slice(1).toLowerCase();

    }


    // =============================================
    // UPDATE ALL PROFILE DISPLAY ELEMENTS
    // =============================================

    function updateProfileDisplay(name, email) {

        const adminName = name || "Administrator";

        const adminEmail = email || "";


        // Profile name

        if (profileName) {

            profileName.textContent = adminName;

        }


        // Profile email

        if (profileEmail) {

            profileEmail.textContent = adminEmail;

        }


        // Sidebar name

        if (sidebarName) {

            sidebarName.textContent = adminName;

        }


        // Header email

        if (headerEmail) {

            headerEmail.textContent = adminEmail;

        }


        // Dashboard avatar

        if (avatarElement) {

            avatarElement.textContent =
                adminName.charAt(0).toUpperCase();

        }

    }


    // =============================================
    // SHOW PROFILE MESSAGE
    // =============================================

    function showProfileMessage(message, type) {

        if (!profileMessage) return;


        profileMessage.textContent = message;

        profileMessage.classList.remove(
            "success",
            "error"
        );

        profileMessage.classList.add(type);

        profileMessage.hidden = false;

    }


    // =============================================
    // HIDE PROFILE MESSAGE
    // =============================================

    function hideProfileMessage() {

        if (!profileMessage) return;


        profileMessage.textContent = "";

        profileMessage.classList.remove(
            "success",
            "error"
        );

        profileMessage.hidden = true;

    }


    // =============================================
    // LOAD SAVED ADMIN PROFILE
    // =============================================

    function loadAdminProfile() {

        let savedEmail = "";

        let savedPhone = "";


        try {

            savedEmail =

                localStorage.getItem(STORAGE_KEYS.email) ||

                localStorage.getItem("loginEmail") ||

                localStorage.getItem(
                    "stacklyInsuranceLoginEmail"
                ) ||

                localStorage.getItem("userEmail") ||

                localStorage.getItem("email") ||

                emailInput.value.trim();


            savedPhone =
                localStorage.getItem(STORAGE_KEYS.phone) || "";


        } catch (error) {

            console.warn(
                "Unable to load administrator profile.",
                error
            );

            savedEmail = emailInput.value.trim();

        }


        // Generate name from email

        const generatedName = getNameFromEmail(savedEmail);


        // Populate form

        emailInput.value = savedEmail;

        fullNameInput.value = generatedName;

        phoneInput.value = savedPhone;


        // Update dashboard and profile

        updateProfileDisplay(
            generatedName,
            savedEmail
        );

    }


    // =============================================
    // AUTOMATIC NAME GENERATION ON EMAIL INPUT
    // =============================================

    emailInput.addEventListener("input", function () {

        const enteredEmail = emailInput.value.trim();

        const generatedName = getNameFromEmail(
            enteredEmail
        );


        // Update full name automatically

        fullNameInput.value = generatedName;


        // Synchronize dashboard details

        updateProfileDisplay(
            generatedName,
            enteredEmail
        );


        hideProfileMessage();

    });


    // =============================================
    // SAVE PROFILE INFORMATION
    // =============================================

    profileForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email = emailInput.value.trim();

        const phone = phoneInput.value.trim();


        // Validate full form

        if (!profileForm.checkValidity()) {

            profileForm.reportValidity();

            return;

        }


        // Validate email format

        if (!emailInput.checkValidity()) {

            emailInput.reportValidity();

            return;

        }


        // Generate name from email

        const adminName = getNameFromEmail(email);


        if (adminName === "Administrator") {

            showProfileMessage(
                "Please enter a valid email address.",
                "error"
            );

            return;

        }


        // Update full name

        fullNameInput.value = adminName;


        // Save profile details

        try {

            localStorage.setItem(
                STORAGE_KEYS.name,
                adminName
            );

            localStorage.setItem(
                STORAGE_KEYS.email,
                email
            );

            localStorage.setItem(
                STORAGE_KEYS.phone,
                phone
            );


        } catch (error) {

            console.error(
                "Unable to save administrator profile.",
                error
            );

            showProfileMessage(
                "Unable to save your profile. Please try again.",
                "error"
            );

            return;

        }


        // Update profile and dashboard

        updateProfileDisplay(
            adminName,
            email
        );


        // Success message

        showProfileMessage(
            "Your administrator profile has been updated successfully!",
            "success"
        );

    });


    // =============================================
    // RESET PROFILE FORM
    // =============================================

    profileForm.addEventListener("reset", function () {

        setTimeout(function () {

            // Restore saved details

            loadAdminProfile();

            // Remove previous messages

            hideProfileMessage();

        }, 0);

    });


    // =============================================
    // INITIALIZE PROFILE
    // =============================================

    loadAdminProfile();


});
