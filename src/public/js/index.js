const viewCartButton = document.getElementById("viewCartButton")
const addToCartButton = document.getElementById("addToCartButton")
const viewItemsCartButton = document.getElementById("viewItemsCartButton")


function applyFilters() {
    const category = document.getElementById('category').value;
    const sort = document.getElementById('sort').value;
    let url = '/?';
    if (category) {
        url += `category=${category}&`;
    }
    if (sort) {
        url += `sort=${sort}&`;
    }
    window.location.href = url;
}

