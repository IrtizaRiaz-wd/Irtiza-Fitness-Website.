/**
 * Irtiza Fitness — Main Script
 */

document.addEventListener("DOMContentLoaded", () => {

    // ---------- Preloader ----------
    const preloader = document.querySelector(".preloader");

    if (preloader) {
        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";

        setTimeout(() => {
            preloader.style.display = "none";
        }, 300);
    }


    // ---------- AOS ----------
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 700,
            easing: "ease-out-cubic",
            once: true,
            offset: 80,
            disable: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches
        });
    }


    // ---------- Mobile Navigation ----------
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (hamburger && navMenu) {

        hamburger.addEventListener("click", () => {

            const isOpen = hamburger.classList.toggle("active");

            navMenu.classList.toggle("active");

            hamburger.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.style.overflow = isOpen ? "hidden" : "";
        });


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                hamburger.classList.remove("active");
                navMenu.classList.remove("active");

                hamburger.setAttribute("aria-expanded", "false");

                document.body.style.overflow = "";
            });

        });
    }


    // ---------- Navbar Scroll ----------
    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    // ---------- Active Navigation ----------
    const sections = document.querySelectorAll("section[id]");

    function updateActiveLink() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop;

            if (window.scrollY >= sectionTop - 180) {
                current = section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href && href.substring(1) === current) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    updateActiveLink();


    // ---------- Smooth Scroll ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", event => {

            const href = anchor.getAttribute("href");

            if (!href || href === "#") return;

            const target = document.querySelector(href);

            if (!target) return;

            event.preventDefault();

            const top =
                target.getBoundingClientRect().top +
                window.scrollY -
                70;

            window.scrollTo({
                top: top,
                behavior: "smooth"
            });

        });

    });


    // ---------- Statistics Counter ----------
    const counters = document.querySelectorAll(".stat-number");

    let counterStarted = false;

    function startCounters() {

        counters.forEach(counter => {

            const target =
                parseInt(counter.getAttribute("data-target"), 10) || 0;

            const duration = 1800;

            const startTime = performance.now();


            function animateCounter(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const eased =
                    1 - Math.pow(1 - progress, 3);

                counter.textContent =
                    Math.floor(eased * target);

                if (progress < 1) {

                    requestAnimationFrame(
                        animateCounter
                    );

                } else {

                    counter.textContent = target;

                }
            }

            requestAnimationFrame(animateCounter);

        });
    }


    function checkCounters() {

        if (counterStarted) return;

        const statsSection =
            document.querySelector(".stats");

        if (!statsSection) return;

        const rect =
            statsSection.getBoundingClientRect();

        if (rect.top < window.innerHeight - 80) {

            counterStarted = true;

            startCounters();
        }
    }

    window.addEventListener("scroll", checkCounters, {
        passive: true
    });

    checkCounters();


    // ---------- Contact Form ----------
    const contactForm =
        document.getElementById("contactForm");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();


            const nameInput =
                document.getElementById("name");

            const emailInput =
                document.getElementById("email");

            const phoneInput =
                document.getElementById("phone");

            const messageInput =
                document.getElementById("message");


            const name =
                nameInput?.value.trim() || "";

            const email =
                emailInput?.value.trim() || "";

            const phone =
                phoneInput?.value.trim() || "";

            const message =
                messageInput?.value.trim() || "";


            if (!name || !email || !message) {

                showNotification(
                    "Please fill in all required fields.",
                    "error"
                );

                return;
            }


            if (!isValidEmail(email)) {

                showNotification(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            const whatsappMessage = encodeURIComponent(
                `Hello Irtiza Fitness,

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

Message: ${message}`
            );


            showNotification(
                "Opening WhatsApp...",
                "success"
            );


            setTimeout(() => {

                window.open(
                    `https://wa.me/923022669408?text=${whatsappMessage}`,
                    "_blank"
                );

            }, 400);


            contactForm.reset();

        });
    }


    // ---------- Email Validation ----------
    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    // ---------- Notification ----------
    function showNotification(message, type) {

        const existing =
            document.querySelector(".notification");

        if (existing) {
            existing.remove();
        }


        const notification =
            document.createElement("div");

        notification.className =
            `notification notification-${type}`;

        notification.textContent = message;

        notification.setAttribute(
            "role",
            "alert"
        );


        document.body.appendChild(notification);


        setTimeout(() => {

            notification.style.animation =
                "slideOut 0.3s ease-out forwards";


            setTimeout(() => {

                notification.remove();

            }, 300);

        }, 2800);
    }


    // ---------- Scroll To Top ----------
    const scrollButton =
        document.getElementById("scrollToTop");

    if (scrollButton) {

        function updateScrollButton() {

            if (window.scrollY > 350) {

                scrollButton.classList.add("show");

            } else {

                scrollButton.classList.remove("show");

            }
        }


        window.addEventListener(
            "scroll",
            updateScrollButton,
            { passive: true }
        );


        scrollButton.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


        updateScrollButton();
    }


    // ---------- Escape Closes Mobile Menu ----------
    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            hamburger &&
            navMenu
        ) {

            hamburger.classList.remove("active");

            navMenu.classList.remove("active");

            hamburger.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.style.overflow = "";
        }

    });


    // ---------- Dynamic Footer Year ----------
    const yearElement =
        document.getElementById("footerYear");

    if (yearElement) {

        yearElement.textContent 
            new Date().getFullYear();

    }

});