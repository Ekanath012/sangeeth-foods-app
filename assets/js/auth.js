/*==========================================================
    SANGEETH FOODS
    auth.js
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       MOBILE LOGIN
    ========================================== */

    const mobileLoginForm = document.getElementById("mobileLoginForm");

    if (mobileLoginForm) {

        mobileLoginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const mobile = document.getElementById("mobileNumber").value.trim();

            if (mobile === "") {
                alert("Please enter your mobile number.");
                return;
            }

            if (!/^\d{10}$/.test(mobile)) {
                alert("Please enter a valid 10-digit mobile number.");
                return;
            }

            window.location.href = "otp-verification.html";

        });

    }

    /* ==========================================
       EMAIL LOGIN
    ========================================== */

    const emailLoginForm = document.getElementById("emailLoginForm");

    if (emailLoginForm) {

        emailLoginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            if (email === "") {
                alert("Please enter your email.");
                return;
            }

            if (!email.includes("@")) {
                alert("Please enter a valid email.");
                return;
            }

            if (password.length < 8) {
                alert("Password must contain at least 8 characters.");
                return;
            }

            window.location.href = "../index.html";

        });

    }

    /* ==========================================
       REGISTER
    ========================================== */

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const fullname = document.getElementById("fullname").value.trim();
            const mobile = document.getElementById("mobile").value.trim();

            if (fullname.length < 3) {
                alert("Please enter your full name.");
                return;
            }

            if (!/^\d{10}$/.test(mobile)) {
                alert("Please enter a valid mobile number.");
                return;
            }

            window.location.href = "otp-verification.html";

        });

    }

    /* ==========================================
       SHOW / HIDE PASSWORD
    ========================================== */

    const togglePassword = document.querySelector(".toggle-password");

    if (togglePassword) {

        togglePassword.addEventListener("click", function () {

            const password = document.getElementById("password");

            if (!password) return;

            const icon = this.querySelector("i");

            if (password.type === "password") {

                password.type = "text";

                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");

            } else {

                password.type = "password";

                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");

            }

        });

    }

    /* ==========================================
       OTP INPUT AUTO MOVE
    ========================================== */

    const otpInputs = document.querySelectorAll(".otp-input");

    otpInputs.forEach((input, index) => {

        input.addEventListener("input", function () {

            this.value = this.value.replace(/\D/g, "");

            if (this.value.length === 1 && index < otpInputs.length - 1) {

                otpInputs[index + 1].focus();

            }

        });

        input.addEventListener("keydown", function (e) {

            if (
                e.key === "Backspace" &&
                this.value === "" &&
                index > 0
            ) {

                otpInputs[index - 1].focus();

            }

        });

    });

    /* ==========================================
       OTP VERIFY
    ========================================== */

    const otpForm = document.getElementById("otpForm");

    if (otpForm) {

        otpForm.addEventListener("submit", function (e) {

            e.preventDefault();

            let otp = "";

            otpInputs.forEach((input) => {
                otp += input.value;
            });

            if (otp.length !== 6) {

                alert("Please enter all 6 OTP digits.");

                return;

            }

            alert("OTP Verified Successfully!");

            window.location.href = "../index.html";

        });

    }

    /* ==========================================
       RESEND OTP TIMER
    ========================================== */

    const resendButton = document.querySelector(".resend-btn");

    if (resendButton) {

        let seconds = 30;

        resendButton.disabled = true;

        const timer = setInterval(() => {

            seconds--;

            resendButton.textContent = `Resend OTP (${seconds}s)`;

            if (seconds <= 0) {

                clearInterval(timer);

                resendButton.disabled = false;

                resendButton.textContent = "Resend OTP";

            }

        }, 1000);

        resendButton.addEventListener("click", function () {

            alert("OTP has been sent again.");

            resendButton.disabled = true;

        });

    }

});

/* ==========================================
   FORGOT PASSWORD
========================================== */

const forgotPasswordForm = document.getElementById("forgotPasswordForm");

if (forgotPasswordForm) {

    forgotPasswordForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("resetEmail").value.trim();

        if (!email) {

            alert("Please enter your email address.");

            return;

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            alert("Please enter a valid email address.");

            return;

        }

        alert("Password reset link sent successfully.");

        window.location.href = "email-login.html";

    });

}

/*=========================================
  RESET PASSWORD
=========================================*/

const resetPasswordForm = document.getElementById("resetPasswordForm");

if (resetPasswordForm) {

    resetPasswordForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (newPassword.length < 8) {

            alert("Password must be at least 8 characters.");

            return;

        }

        if (newPassword !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        alert("Password updated successfully!");

        window.location.href = "email-login.html";

    });

}