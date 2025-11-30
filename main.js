document.addEventListener("DOMContentLoaded", () => {
    const loginButtons = document.querySelectorAll("[data-open-login]");
    const modalBackdrop = document.getElementById("auth-modal-backdrop");
    const modalClose = document.getElementById("auth-modal-close");
    const tabButtons = document.querySelectorAll(".modal-tab");
    const formTitle = document.getElementById("auth-form-title");
    const authSubmit = document.getElementById("auth-submit");
    const demoNote = document.getElementById("demo-note");
    const logoutButtons = document.querySelectorAll("[data-logout]");

    // -------- LOGIN / SIGNUP (Landing page only) --------
    const modeConfig = {
        login: {
            title: "Log in to Bachat Khata",
            buttonText: "Login (Demo)",
            note: "This is a demo banking interface. Any email/password will let you in."
        },
        signup: {
            title: "Create your Bachat Khata demo account",
            buttonText: "Sign Up (Demo)",
            note: "Demo only. Please do not enter any real banking or personal ID details."
        }
    };

    function openModal() {
        if (modalBackdrop) {
            modalBackdrop.classList.add("active");
        }
    }

    function closeModal() {
        if (modalBackdrop) {
            modalBackdrop.classList.remove("active");
        }
    }

    // Open login/signup popup
    loginButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            openModal();
        });
    });

    // Close popup
    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", (e) => {
            if (e.target === modalBackdrop) closeModal();
        });
    }

    // Switch between Login / Sign Up tabs
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const mode = btn.dataset.mode;

            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            if (!formTitle || !authSubmit || !demoNote) return;

            const cfg = modeConfig[mode];
            if (cfg) {
                formTitle.textContent = cfg.title;
                authSubmit.textContent = cfg.buttonText;
                demoNote.innerHTML = `<strong>Important:</strong> ${cfg.note}`;
            }
        });
    });

    // Dummy login / signup: allow ANY details and go to home.html
    const authForm = document.getElementById("auth-form");
    if (authForm) {
        authForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // No validation, no real auth, just redirect to main site
            window.location.href = "home.html";
        });
    }

    // -------- LOGOUT (Main pages) --------
    logoutButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            // Clear demo "session" by just going back to landing page
            window.location.href = "index.html";
        });
    });

    // Year in footer (optional helper)
    const yearSpans = document.querySelectorAll("#year");
    yearSpans.forEach(span => {
        span.textContent = new Date().getFullYear();
    });
});
