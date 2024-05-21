const socket = io();
const buttonSendMessage = document.getElementById("buttonSendMessage")
const messageToSend = document.getElementById("messageToSend")
const messageArea = document.getElementById("menssageArea")
const loginUser = document.getElementById("loginUser")
const loginUserButton = document.getElementById("loginUserButton")
const labelCorreo = document.getElementById("labelCorreo")

/* Funcion para login del chat */
function onLoginUserButton () {
    if(loginUser.value === ""){
        alert('Por favor ingresa un correo valido')
    }
    else{
        buttonSendMessage.removeAttribute('disabled')
        messageToSend.removeAttribute('disabled')
        loginUserButton.remove()
        labelCorreo.innerText = "Logeado como:"
        loginUser.setAttribute('disabled', 'true')
    }
}

/* Evento para boton de login del chat */
loginUserButton.addEventListener('click', onLoginUserButton)
loginUser.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        onLoginUserButton()
    }
})

/* Funcion para envio de mensaje */
function onButtonSendMessage () {
    if(messageToSend.value === ""){
        alert('Por favor ingresa un mensaje')
    }
    else{
        const newMessage = {
            user: loginUser.value,
            message: messageToSend.value
        }
        socket.emit('chatMessage',  newMessage)
        messageToSend.value = ''
    }
}

/* Evento para boton de enviar mensaje */
buttonSendMessage.addEventListener('click', onButtonSendMessage)
messageToSend.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        onButtonSendMessage()
    }
})

/* Gestion de datos recibidos a traves de socket */
socket.on('chatMessage', data => {
    
    data.forEach(data => {
        const user = data.user
        const message = data.message
        const sendTime = data.createdAt
        const messageHTML = `
        <div class="p-2 bg-black text-white rounded-md flex flex-col">
        <span class="text-xs text-left mb-2">${user}</span>
        <p class="text-left">${message}</p>
        <span class="text-xs text-right">${sendTime}</span>
        </div>`

        messageArea.insertAdjacentHTML('beforeend', messageHTML);

    });

    messageArea.scrollTop = messageArea.scrollHeight;

})