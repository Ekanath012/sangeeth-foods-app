/*=========================================================
SANGEETH FOODS
WISHLIST PAGE
Version 1.0
=========================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      ELEMENTS
    =========================================*/

    const wishlistCards = document.querySelectorAll(".wishlist-card");
    const removeButtons = document.querySelectorAll(".removeBtn");
    const cartButtons = document.querySelectorAll(".cartBtn");
    const searchInput = document.getElementById("searchFood");
    const sortSelect = document.getElementById("sortFood");
    const wishlistGrid = document.getElementById("wishlistGrid");
    const emptyWishlist = document.querySelector(".empty-wishlist");
    const cartCount = document.getElementById("cartCount");

    /*=========================================
      TOAST
    =========================================*/

    function showToast(message, color = "#222") {

        let toast = document.querySelector(".toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "toast";

            toast.style.position = "fixed";
            toast.style.bottom = "30px";
            toast.style.left = "50%";
            toast.style.transform = "translateX(-50%)";
            toast.style.padding = "15px 25px";
            toast.style.borderRadius = "50px";
            toast.style.color = "#fff";
            toast.style.fontWeight = "600";
            toast.style.background = color;
            toast.style.zIndex = "9999";
            toast.style.opacity = "0";
            toast.style.transition = ".35s";

            document.body.appendChild(toast);

        }

        toast.style.background = color;
        toast.textContent = message;
        toast.style.opacity = "1";

        clearTimeout(toast.timer);

        toast.timer = setTimeout(() => {

            toast.style.opacity = "0";

        }, 2200);

    }

    /*=========================================
      CART BADGE
    =========================================*/

    function updateCartCount() {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cartCount.textContent = cart.length;

    }

    updateCartCount();

    /*=========================================
      REMOVE FROM WISHLIST
    =========================================*/

    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".wishlist-card");

            card.style.transition = ".4s";

            card.style.opacity = "0";

            card.style.transform = "scale(.8)";

            setTimeout(() => {

                card.remove();

                checkEmptyWishlist();

            }, 350);

            showToast("Removed from Wishlist", "#d32f2f");

        });

    });

    /*=========================================
      EMPTY STATE
    =========================================*/

    function checkEmptyWishlist() {

        const remainingCards =
            document.querySelectorAll(".wishlist-card");

        if (remainingCards.length === 0) {

            wishlistGrid.style.display = "none";

            emptyWishlist.style.display = "block";

        }

    }

    /*=========================================
      MOVE TO CART
    =========================================*/

    cartButtons.forEach(button => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".wishlist-card");

            const name =
                card.querySelector("h2").textContent;

            const price =
                card.querySelector(".price h3").textContent;

            let cart =
                JSON.parse(localStorage.getItem("cart")) || [];

            cart.push({

                name: name,

                price: price

            });

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            showToast("Added to Cart", "#28a745");

        });

    });

    /*=========================================
      SEARCH
    =========================================*/

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value =
                searchInput.value.toLowerCase();

            wishlistCards.forEach(card => {

                const title =
                    card.querySelector("h2")
                        .textContent
                        .toLowerCase();

                if (title.includes(value)) {

                    card.style.display = "flex";

                } else {

                    card.style.display = "none";

                }

            });

        });

    }

    /*=========================================
      SORT
    =========================================*/

    if (sortSelect) {

        sortSelect.addEventListener("change", () => {

            const cards =
                [...document.querySelectorAll(".wishlist-card")];

            cards.sort((a, b) => {

                const priceA =
                    parseFloat(
                        a.querySelector(".price h3")
                        .textContent.replace("CAD", "")
                    );

                const priceB =
                    parseFloat(
                        b.querySelector(".price h3")
                        .textContent.replace("CAD", "")
                    );

                const ratingA =
                    parseFloat(
                        a.querySelector(".rating span")
                        .textContent
                    );

                const ratingB =
                    parseFloat(
                        b.querySelector(".rating span")
                        .textContent
                    );

                switch (sortSelect.value) {

                    case "low":
                        return priceA - priceB;

                    case "high":
                        return priceB - priceA;

                    case "rating":
                        return ratingB - ratingA;

                    default:
                        return 0;

                }

            });

            cards.forEach(card => {

                wishlistGrid.appendChild(card);

            });

        });

    }

    /*=========================================
      BUTTON ANIMATION
    =========================================*/

    document.querySelectorAll("button").forEach(btn => {

        btn.addEventListener("mouseenter", () => {

            btn.style.transition = ".25s";

            btn.style.transform = "translateY(-3px)";

        });

        btn.addEventListener("mouseleave", () => {

            btn.style.transform = "translateY(0)";

        });

    });

    console.log("Wishlist Loaded Successfully");

});