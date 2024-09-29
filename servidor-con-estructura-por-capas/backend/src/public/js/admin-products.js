const socket = io();

/* Obtener elementos del DOM */
const listProducts = document.getElementById("listProducts");
const buttonAdd = document.getElementById("buttonAdd");
const newProductForm = document.getElementById("newProductForm");

/* Obtener valores del input para nuevo producto */
const inputTitle = document.getElementById("title");
const inputDescription = document.getElementById("description");
const inputDetails = document.getElementById("details");
const inputPrice = document.getElementById("price");
const inputCategory = document.getElementById("category");
const inputImage = document.getElementById("image");

/* Socket para recibir los productos del servidor y renderizarlos */
socket.on('products', (data) => {
    listProducts.innerHTML = '';  // Limpiar la lista actual

    data.forEach(product => {
        // Crear un contenedor para el producto
        const itemProduct = document.createElement('div');
        itemProduct.classList.add('flex', 'items-center', 'justify-between', 'border', 'p-2', 'mb-2');
        
        // Agregar título del producto
        const productInfo = document.createElement('div');
        productInfo.innerHTML = `
            <h3 class="font-bold">${product.title}</h3>
            <p>${product.description}</p>
            <p>Precio: $${product.price}</p>
            <p>Categoría: ${product.category}</p>
        `;
        itemProduct.appendChild(productInfo);

        // Crear botón para eliminar el producto
        const buttonDelete = document.createElement('button');
        buttonDelete.textContent = "Eliminar";
        buttonDelete.classList.add('bg-red-400', 'p-1', 'text-sm', 'rounded');
        itemProduct.appendChild(buttonDelete);

        // Añadir el evento de eliminación al botón
        buttonDelete.addEventListener('click', () => {
            socket.emit('deleteProduct', product._id);
        });

        // Añadir el producto a la lista de productos
        listProducts.appendChild(itemProduct);
    });
});