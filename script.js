document.getElementById('hablar').addEventListener("click", ()=> {
    decir("Hola, mi nombre es Maya, en que te puedo ayudar?");
});
function decir(texto){
    speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
    captarVoz();
}

let captura;

function captarVoz(){
  let rec;
  if ( !("webkitSpeechRecognition" in window) ) {
    decir("disculpa, no puedes usar la API");
  } else {
    rec = new webkitSpeechRecognition();
    rec.lang = "es-AR";
    rec.continuos = true;
    rec.interim = true;
    rec.addEventListener( "result", iniciar );
  }
  function iniciar(event){
    for( i = event.resultIndex; i < event.results.length; i++ ){
      captura = event.results[i][0].transcript;
      //document.getElementById('aaa').innerHTML = captura;
      realizarAccion(captura);
    }
  }
  rec.start();
}

function realizarAccion(accion){
  if( 'Iniciar sesi\u00F3n' == accion ) {
    inicioSesionUsuario();
  } else if( 'Juan Gerardo' == accion ){
    inicioSesionContrasena();
  } else if( 'Banorte' == accion ){
    inicioSesionToken();
  } else if ('Juan' == accion) {
    inicioSesionExitoso();
  }
}

function inicioSesionUsuario(){
  decir("Bien, para realizarlo, necesito que me compartas tu usuario");
  document.getElementById('texto-maya').innerHTML = "Bien, para realizarlo, necesito que me compartas tu usuario"
  captarVoz();
}

function inicioSesionContrasena(){
  decir("Bien hecho Juan, podrías decirme tu contraseña");
  document.getElementById('texto-maya').innerHTML = "Bien hecho Juan, podrías decirme tu contraseña";
  captarVoz();
}

function inicioSesionToken(){
  decir("Juan, por último, para poder ingresar, dictame tu token");
  document.getElementById('texto-maya').innerHTML = "Juan, por último, para poder ingresar, dime, cual es tu token?"
  captarVoz();
}

function inicioSesionExitoso(){
  decir("Bienvenido a tu banca por internet, Juan ¿Que transacción deseas realizar?")
  document.getElementById('texto-maya').innerHTML = "Bienvenido a tu banca por internet, Juan ¿Que transacción deseas realizar?"
}

//TEXTO VOZ
// Obtener referencias a los elementos del chat
const chatbox = document.getElementById('chatbox');
const messagesContainer = document.getElementById('messages');
const inputMessage = document.getElementById('inputMessage');
const sendButton = document.getElementById('sendButton');

// Opciones del menú
const menuOptions = ['Opción 1', 'Opción 2', 'Opción 3'];

// Función para generar una opción en voz
function speakOption(option) {
  const utterance = new SpeechSynthesisUtterance(option);
  speechSynthesis.speak(utterance);
}

// Función para desplegar las opciones en el chat
function displayMenuOptions() {
    const message = document.createElement('div');
    message.innerHTML = 'Por favor, selecciona una opción:';
    messagesContainer.appendChild(message);
  
    for (let i = 0; i < menuOptions.length; i++) {
      const option = menuOptions[i];
      const optionButton = document.createElement('button');
      optionButton.textContent = option;
      optionButton.addEventListener('click', () => {
        inputMessage.value = option;
        sendMessage();
      });
      messagesContainer.appendChild(optionButton);
      speakOption(option);
    }
  }

  // Función para enviar un mensaje en el chat
function sendMessage() {
    const messageText = inputMessage.value;
    const message = document.createElement('div');
    message.innerHTML = `<strong>Tú:</strong> ${messageText}`;
    messagesContainer.appendChild(message);
    inputMessage.value = '';
  
    // Lógica para manejar el mensaje enviado
    if (messageText.toLowerCase() === 'opciones') {
      displayMenuOptions();
    } else {
      // Manejar otros mensajes según tus necesidades
    }
  }

  // Evento click para enviar el mensaje
sendButton.addEventListener('click', sendMessage);

// Evento keypress para enviar el mensaje al presionar Enter
inputMessage.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});