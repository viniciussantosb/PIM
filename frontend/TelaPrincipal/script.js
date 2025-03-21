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