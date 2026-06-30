/*=========================================================
 SANGEETH FOODS
 MENU.JS
 Version 1.0
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=========================================
      SEARCH
    =========================================*/

    const searchInput = document.querySelector(".hero-search input");

    const foodCards = document.querySelectorAll(".food-card");

    if (searchInput) {

        searchInput.addEventListener("keyup", function () {

            const value = this.value.toLowerCase();

            foodCards.forEach(card => {

                const title = card.querySelector("h3").textContent.toLowerCase();

                if (title.includes(value)) {

                    card.style.display = "block";

                }

                else {

                    card.style.display = "none";

                }

            });

        });

    }



    /*=========================================
      CATEGORY FILTER
    =========================================*/

    const categoryButtons = document.querySelectorAll(".category-list button");

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

        });

    });



    /*=========================================
      WISHLIST
    =========================================*/

    const wishlistButtons = document.querySelectorAll(".wishlist-btn");

    wishlistButtons.forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("liked");

            const icon = button.querySelector("i");

            if (button.classList.contains("liked")) {

                icon.classList.remove("fa-regular");

                icon.classList.add("fa-solid");

                icon.style.color = "#ff2d55";

            }

            else {

                icon.classList.remove("fa-solid");

                icon.classList.add("fa-regular");

                icon.style.color = "";

            }

        });

    });



    /*=========================================
      CART
    =========================================*/

    let cart = 0;

    const cartCount = document.querySelector(".cart-count");

    const floatingCart = document.querySelector(".floating-cart strong");

    const floatingPrice = document.querySelector(".floating-cart p");

    const addButtons = document.querySelectorAll(".add-btn");

    addButtons.forEach(button => {

        button.addEventListener("click", () => {

            cart++;

            if (cartCount) {

                cartCount.textContent = cart;

            }

            if (floatingCart) {

                floatingCart.textContent = cart + " Items";

            }

            if (floatingPrice) {

                floatingPrice.textContent = "CAD " + (cart * 15.99).toFixed(2);

            }

            button.innerHTML = "Added ✓";

            button.style.background = "#0A8F3D";

            setTimeout(() => {

                button.innerHTML = "+ Add";

                button.style.background = "";

            }, 1200);

        });

    });



    /*=========================================
      SMOOTH SCROLL
    =========================================*/

    document.querySelectorAll("a[href^='#']").forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });



    /*=========================================
      NAVBAR SHADOW
    =========================================*/

    window.addEventListener("scroll", () => {

        const navbar = document.querySelector(".navbar");

        if (!navbar) return;

        if (window.scrollY > 80) {

            navbar.style.boxShadow = "0 15px 35px rgba(0,0,0,.12)";

        }

        else {

            navbar.style.boxShadow = "";

        }

    });

});

/*=========================================================
 TOAST NOTIFICATION
=========================================================*/

function showToast(message){

    let toast=document.querySelector(".toast");

    if(!toast){

        toast=document.createElement("div");

        toast.className="toast";

        document.body.appendChild(toast);

    }

    toast.innerHTML=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}



/*=========================================================
 LOCAL STORAGE CART
=========================================================*/

let cartItems=localStorage.getItem("cartCount");

if(cartItems===null){

    cartItems=0;

}

cartItems=parseInt(cartItems);

const cartCounter=document.querySelector(".cart-count");

if(cartCounter){

    cartCounter.textContent=cartItems;

}



document.querySelectorAll(".add-btn").forEach(btn=>{

    btn.addEventListener("click",()=>{

        cartItems++;

        localStorage.setItem("cartCount",cartItems);

        if(cartCounter){

            cartCounter.textContent=cartItems;

        }

        showToast("Item added to cart 🛒");

    });

});



/*=========================================================
 WISHLIST
=========================================================*/

let favourites=[];

document.querySelectorAll(".wishlist-btn").forEach(button=>{

    button.addEventListener("click",()=>{

        button.classList.toggle("active");

        const card=button.closest(".food-card");

        const foodName=card.querySelector("h3").textContent;

        if(button.classList.contains("active")){

            favourites.push(foodName);

            showToast(foodName+" added to wishlist ❤️");

        }

        else{

            favourites=favourites.filter(item=>item!==foodName);

            showToast(foodName+" removed");

        }

        localStorage.setItem("wishlist",JSON.stringify(favourites));

    });

});



/*=========================================================
 SCROLL REVEAL
=========================================================*/

const revealItems=document.querySelectorAll(

".food-card,.offer-card,.review-card,.chef-content"

);

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

revealItems.forEach(item=>observer.observe(item));



/*=========================================================
 OFFER BUTTON
=========================================================*/

document.querySelectorAll(".offer-card button").forEach(btn=>{

btn.addEventListener("click",()=>{

showToast("Offer Applied Successfully 🎉");

});

});



/*=========================================================
 DOWNLOAD BUTTONS
=========================================================*/

document.querySelectorAll(".download-buttons button").forEach(btn=>{

btn.addEventListener("click",()=>{

showToast("Mobile App Coming Soon 📱");

});

});



/*=========================================================
 FLOATING CART
=========================================================*/

const floatingCart=document.querySelector(".floating-cart");

if(floatingCart){

floatingCart.addEventListener("click",()=>{

window.location.href="cart.html";

});

}



/*=========================================================
 PAGE LOADER
=========================================================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});