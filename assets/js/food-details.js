/*=========================================================
SANGEETH FOODS
FOOD DETAILS PAGE
Version 4.0
=========================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      DOM ELEMENTS
    =========================================*/

    const mainImage = document.querySelector(".main-image img");
    const thumbnails = document.querySelectorAll(".thumbs img");

    const qty = document.getElementById("qty");
    const plus = document.querySelector(".plus");
    const minus = document.querySelector(".minus");

    const cartBtn = document.querySelector(".cart-btn");
    const buyBtn = document.querySelector(".buy-btn");

    const wishlistBtn = document.querySelector(".wishlist-detail");
    const shareBtn = document.querySelector(".share-btn");

    const cartIcon = document.querySelector(".nav-icons button:last-child span");

    let quantity = 1;

    /*=========================================
      LOCAL STORAGE
    =========================================*/

    const STORAGE = {

        getCart() {

            return JSON.parse(localStorage.getItem("cart")) || [];

        },

        saveCart(cart) {

            localStorage.setItem("cart", JSON.stringify(cart));

        },

        getWishlist() {

            return JSON.parse(localStorage.getItem("wishlist")) || [];

        },

        saveWishlist(list) {

            localStorage.setItem("wishlist", JSON.stringify(list));

        }

    };

    /*=========================================
      UPDATE NAVBAR CART
    =========================================*/

    function updateCartBadge() {

        if (!cartIcon) return;

        const cart = STORAGE.getCart();

        let total = 0;

        cart.forEach(item => {

            total += item.quantity;

        });

        cartIcon.textContent = total;

    }

    /*=========================================
      TOAST
    =========================================*/

    function showToast(message, color = "#222") {

        let toast = document.querySelector(".toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "toast";

            document.body.appendChild(toast);

            toast.style.position = "fixed";
            toast.style.bottom = "30px";
            toast.style.left = "50%";
            toast.style.transform = "translateX(-50%)";
            toast.style.padding = "15px 28px";
            toast.style.color = "#fff";
            toast.style.fontWeight = "600";
            toast.style.borderRadius = "50px";
            toast.style.zIndex = "999999";
            toast.style.opacity = "0";
            toast.style.transition = ".35s";
            toast.style.boxShadow = "0 15px 35px rgba(0,0,0,.25)";

        }

        toast.style.background = color;

        toast.textContent = message;

        toast.style.opacity = "1";

        clearTimeout(toast.timer);

        toast.timer = setTimeout(() => {

            toast.style.opacity = "0";

        }, 2500);

    }

    /*=========================================
      IMAGE GALLERY
    =========================================*/

    if (mainImage && thumbnails.length) {

        thumbnails[0].style.borderColor = "#A30000";

        thumbnails.forEach(image => {

            image.addEventListener("click", () => {

                thumbnails.forEach(img => {

                    img.style.borderColor = "transparent";

                });

                image.style.borderColor = "#A30000";

                mainImage.style.opacity = "0";

                setTimeout(() => {

                    mainImage.src = image.src;

                    mainImage.style.opacity = "1";

                }, 180);

            });

        });

    }

    /*=========================================
      QUANTITY
    =========================================*/

    function renderQuantity() {

        if (qty) {

            qty.textContent = quantity;

        }

    }

    if (plus) {

        plus.addEventListener("click", () => {

            quantity++;

            renderQuantity();

        });

    }

    if (minus) {

        minus.addEventListener("click", () => {

            if (quantity > 1) {

                quantity--;

                renderQuantity();

            }

        });

    }

    renderQuantity();

        /*=========================================
      PRODUCT DATA
    =========================================*/

    const product = {

        id: 1,

        name: "Paneer Butter Masala",

        price: 15.99,

        image: "../assets/images/foods/paneer-butter-masala.jpg"

    };


    /*=========================================
      ADD TO CART
    =========================================*/

    if (cartBtn) {

        cartBtn.addEventListener("click", () => {

            const cart = STORAGE.getCart();

            const existing = cart.find(item => item.id === product.id);

            if (existing) {

                existing.quantity += quantity;

            } else {

                cart.push({

                    id: product.id,

                    name: product.name,

                    price: product.price,

                    image: product.image,

                    quantity: quantity

                });

            }

            STORAGE.saveCart(cart);

            updateCartBadge();

            showToast("🛒 Added to Cart", "#28a745");

        });

    }


    /*=========================================
      BUY NOW
    =========================================*/

    if (buyBtn) {

        buyBtn.addEventListener("click", () => {

            const cart = [];

            cart.push({

                id: product.id,

                name: product.name,

                image: product.image,

                price: product.price,

                quantity: quantity

            });

            STORAGE.saveCart(cart);

            updateCartBadge();

            showToast("Proceeding to Checkout...", "#0d6efd");

            setTimeout(() => {

                window.location.href = "checkout.html";

            }, 1200);

        });

    }


    /*=========================================
      WISHLIST
    =========================================*/

    function updateWishlistUI(saved) {

        if (!wishlistBtn) return;

        const icon = wishlistBtn.querySelector("i");

        if (!icon) return;

        if (saved) {

            icon.classList.remove("fa-regular");

            icon.classList.add("fa-solid");

            icon.style.color = "#ff2d55";

        } else {

            icon.classList.remove("fa-solid");

            icon.classList.add("fa-regular");

            icon.style.color = "";

        }

    }


    if (wishlistBtn) {

        let wishlist = STORAGE.getWishlist();

        updateWishlistUI(

            wishlist.some(item => item.id === product.id)

        );

        wishlistBtn.addEventListener("click", () => {

            wishlist = STORAGE.getWishlist();

            const index = wishlist.findIndex(

                item => item.id === product.id

            );

            if (index === -1) {

                wishlist.push(product);

                STORAGE.saveWishlist(wishlist);

                updateWishlistUI(true);

                showToast("❤️ Added to Wishlist", "#ff2d55");

            } else {

                wishlist.splice(index, 1);

                STORAGE.saveWishlist(wishlist);

                updateWishlistUI(false);

                showToast("Removed from Wishlist", "#dc3545");

            }

        });

    }


    /*=========================================
      SHARE
    =========================================*/

    if (shareBtn) {

        shareBtn.addEventListener("click", async () => {

            const data = {

                title: product.name,

                text: "Check out this delicious dish!",

                url: window.location.href

            };

            if (navigator.share) {

                try {

                    await navigator.share(data);

                } catch (err) {

                    // User cancelled

                }

            } else {

                try {

                    await navigator.clipboard.writeText(window.location.href);

                    showToast("🔗 Link Copied", "#6f42c1");

                } catch {

                    showToast("Sharing not supported", "#dc3545");

                }

            }

        });

    }


    /*=========================================
      RECOMMENDED PRODUCTS
    =========================================*/

    document.querySelectorAll(".food-footer button")

        .forEach(button => {

            button.addEventListener("click", () => {

                showToast("Item added to cart", "#28a745");

            });

        });
    /*=========================================
      IMAGE ZOOM
    =========================================*/

    if (mainImage) {

        mainImage.addEventListener("mousemove", (e) => {

            const rect = mainImage.getBoundingClientRect();

            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            mainImage.style.transformOrigin = `${x}% ${y}%`;
            mainImage.style.transform = "scale(1.6)";

        });

        mainImage.addEventListener("mouseleave", () => {

            mainImage.style.transform = "scale(1)";
            mainImage.style.transformOrigin = "center";

        });

    }


    /*=========================================
      SCROLL REVEAL
    =========================================*/

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: 0.15

    });

    document.querySelectorAll(

        ".product-section, .food-card, .review, .info-box div"

    ).forEach(item => {

        item.style.opacity = "0";
        item.style.transform = "translateY(40px)";
        item.style.transition = ".6s ease";

        observer.observe(item);

    });


    /*=========================================
      BUTTON RIPPLE EFFECT
    =========================================*/

    document.querySelectorAll("button").forEach(button => {

        button.addEventListener("click", function (e) {

            const circle = document.createElement("span");

            const diameter = Math.max(this.clientWidth, this.clientHeight);

            circle.style.width = diameter + "px";
            circle.style.height = diameter + "px";

            circle.style.position = "absolute";
            circle.style.borderRadius = "50%";
            circle.style.background = "rgba(255,255,255,.4)";
            circle.style.pointerEvents = "none";

            circle.style.left =
                e.clientX - this.getBoundingClientRect().left - diameter / 2 + "px";

            circle.style.top =
                e.clientY - this.getBoundingClientRect().top - diameter / 2 + "px";

            circle.style.animation = "ripple .6s linear";

            this.style.position = "relative";
            this.style.overflow = "hidden";

            this.appendChild(circle);

            setTimeout(() => {

                circle.remove();

            }, 600);

        });

    });


    /*=========================================
      KEYBOARD SHORTCUTS
    =========================================*/

    document.addEventListener("keydown", (e) => {

        if (e.key === "+") {

            quantity++;
            renderQuantity();

        }

        if (e.key === "-") {

            if (quantity > 1) {

                quantity--;
                renderQuantity();

            }

        }

    });


    /*=========================================
      PAGE INIT
    =========================================*/

    updateCartBadge();

    console.log(

        "%cSangeeth Foods",

        "color:#A30000;font-size:22px;font-weight:bold;"

    );

    console.log("Food Details Loaded Successfully");

});