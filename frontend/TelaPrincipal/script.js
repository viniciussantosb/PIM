document.addEventListener("DOMContentLoaded", () => {
    
    const token = localStorage.getItem("token");

    const loginBtn = document.querySelector("#loginBtn");  
    const accountBtn = document.querySelector("#accountBtn");  

    if (token) {
        
        loginBtn.style.display = "none";  
        accountBtn.style.display = "block";  
    } else {
        
        loginBtn.style.display = "block";
        accountBtn.style.display = "none";  
    }
});

const hamburguer = document.querySelector(".hamburguer")
const nav = document.querySelector(".navbar")

hamburguer.addEventListener("click", () => {
    nav.classList.toggle("active");
    if (nav.classList.contains("active")) {
    document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
});