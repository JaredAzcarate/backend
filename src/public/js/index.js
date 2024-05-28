const viewCartButton = document.getElementById("viewCartButton")
const addToCartButton = document.getElementById("addToCartButton")
const viewItemsCartButton = document.getElementById("viewItemsCartButton")

viewCartButton.addEventListener("click", () => {
    viewItemsCartButton.classList.toggle("hidden")
})

addToCartButton.addEventListener("click", () => {
    alert("click en agreagr al carrito")
})
