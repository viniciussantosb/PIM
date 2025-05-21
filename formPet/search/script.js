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