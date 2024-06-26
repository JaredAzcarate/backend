const socket = io();

/* Obtener elementos del DOM */
const listProducts = document.getElementById("listProducts")
const buttonAdd = document.getElementById("buttonAdd")
const newProductForm = document.getElementById("newProductForm")

/* Obtener valores del input para nuevo producto*/
const inputTitle = document.getElementById("title")
const inputDescription = document.getElementById("description")
const inputDetails = document.getElementById("details")
const inputPrice = document.getElementById("price")
const inputCategory= document.getElementById("category")
const inputImage = document.getElementById("image")

/* Socket para recibir los productos del servidor y renderizarlos */
socket.on('products', data => {
    
    listProducts.innerHTML = '';

    data.forEach( product => {
        const itemProduct = document.createElement('div')
        itemProduct.textContent = product.title
        itemProduct.classList.add('flex')
        listProducts.appendChild(itemProduct)

        const buttoDelete = document.createElement('button')
        buttoDelete.textContent = "Eliminar"
        buttoDelete.classList.add('bg-red-400');
        buttoDelete.classList.add('p-1');
        buttoDelete.classList.add('text-sm');
        buttoDelete.classList.add('rounded');
        listProducts.appendChild(buttoDelete)

        buttoDelete.addEventListener('click', () => {
            socket.emit('deleteProduct', product._id)
        })
    })
})

/* Función para agregar nuevo producto */
buttonAdd.addEventListener('click', () => {

    /* Se crea el nuevo producto */
    let newProduct = {
        title : inputTitle.value,
        description : inputDescription.value,
		details : inputDetails.value,
		price : inputPrice.value,
		status : true,
		category : inputCategory.value,
		image : inputImage.value
    }

    /* Socket para enviar el nuevo producto al servidor */
    socket.emit('addProduct', newProduct )

    /* Resetear los valores del form */
    /* inputTitle.value = ''
    inputDescription.value = ''
    inputCode.value = ''
    inputPrice.value = ''
    inputStock.value = ''
    inputCategory.value = ''
    inputThumbnail.value = '' */

    /* Alerta para confirmar que se agrego el producto */
    const notification = document.createElement('p')
    notification.innerText = 'Producto agregado correctamente'
    newProductForm.appendChild(notification)
    setTimeout(()=>{
        newProductForm.removeChild(notification)
    }, 4000)
})