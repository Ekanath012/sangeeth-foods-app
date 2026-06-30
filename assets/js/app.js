/*=========================================================
SANGEETH FOODS
Version 2.0
=========================================================*/

class SangeethFoods {

    constructor() {

        this.cartCount = 0;
        this.init();

    }

    init() {

        this.headerEffect();
        this.scrollAnimation();
        this.wishlist();
        this.cart();
        this.search();
        this.categoryHover();
        this.backToTop();
        this.heroCounter();

    }

    /*=============================
      HEADER
    =============================*/

    headerEffect(){

        const header=document.querySelector(".header");

        window.addEventListener("scroll",()=>{

            if(window.scrollY>80){

                header.classList.add("header-scroll");

            }

            else{

                header.classList.remove("header-scroll");

            }

        });

    }

    /*=============================
      CART
    =============================*/

    cart(){

        const counter=document.querySelector(".cart-count");

        const buttons=document.querySelectorAll(".price-box button");

        buttons.forEach(btn=>{

            btn.addEventListener("click",()=>{

                this.cartCount++;

                counter.textContent=this.cartCount;

                btn.innerHTML="✔ Added";

                btn.disabled=true;

                setTimeout(()=>{

                    btn.innerHTML="Add +";

                    btn.disabled=false;

                },1500);

            });

        });

    }

    /*=============================
      WISHLIST
    =============================*/

    wishlist(){

        const wishlist=document.querySelectorAll(".wishlist-btn");

        wishlist.forEach(btn=>{

            btn.addEventListener("click",()=>{

                btn.classList.toggle("active");

                const icon=btn.querySelector("i");

                icon.classList.toggle("fa-regular");

                icon.classList.toggle("fa-solid");

            });

        });

    }

    /*=============================
      SEARCH
    =============================*/

    search(){

        const input=document.querySelector(".search-box input");

        const button=document.querySelector(".search-btn");

        const executeSearch=()=>{

            const value=input.value.trim();

            if(value===""){

                alert("Please enter a food name.");

                return;

            }

            console.log("Searching:",value);

        };

        button.addEventListener("click",executeSearch);

        input.addEventListener("keydown",(e)=>{

            if(e.key==="Enter"){

                executeSearch();

            }

        });

    }

    /*=============================
      CATEGORY EFFECT
    =============================*/

    categoryHover(){

        const cards=document.querySelectorAll(".category-card");

        cards.forEach(card=>{

            card.addEventListener("mouseenter",()=>{

                card.style.transform="translateY(-12px) scale(1.03)";

            });

            card.addEventListener("mouseleave",()=>{

                card.style.transform="";

            });

        });

    }

    /*=============================
      SCROLL ANIMATION
    =============================*/

    scrollAnimation(){

        const observer=new IntersectionObserver((entries)=>{

            entries.forEach(entry=>{

                if(entry.isIntersecting){

                    entry.target.classList.add("show");

                }

            });

        },{

            threshold:.2

        });

        document.querySelectorAll(

            ".food-card,.offer-banner,.why-card,.review-card,.chef-card,.category-card"

        ).forEach(el=>{

            el.classList.add("hidden");

            observer.observe(el);

        });

    }

    /*=============================
      HERO COUNTER
    =============================*/

    heroCounter(){

        const stats=document.querySelectorAll(".stat-box h3");

        stats.forEach(stat=>{

            stat.style.opacity="1";

        });

    }

    /*=============================
      BACK TO TOP
    =============================*/

    backToTop(){

        const button=document.createElement("button");

        button.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

        button.className="backToTop";

        document.body.appendChild(button);

        window.addEventListener("scroll",()=>{

            if(window.scrollY>400){

                button.classList.add("showTop");

            }

            else{

                button.classList.remove("showTop");

            }

        });

        button.onclick=()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        };

    }

}

new SangeethFoods();