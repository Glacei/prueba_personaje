const img = document.getElementById("mari");
    const sprites = {
      front: ["sprites/front1.png", "sprites/front2.png", "sprites/front3.png", "sprites/front4.png"],
      back: ["sprites/back1.png", "sprites/back2.png", "sprites/back3.png", "sprites/back4.png"],
      left: ["sprites/left1.png", "sprites/left2.png", "sprites/left3.png", "sprites/left4.png"],
      right: ["sprites/right1.png", "sprites/right2.png", "sprites/right3.png", "sprites/right4.png"],
    };

const paredes = document.querySelectorAll(".pared");

let posX = 150;
let posY = 150;

const velocidad = 2;

let frameIndex = 0;
let frameTimer = 0;
const frameInterval = 30;

 const teclas = { up: false, down: false, left: false, right: false };

    // Detectar cuándo se presiona una tecla
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp': 
            teclas.up = true; 
            break;

        case 'ArrowDown': 
            teclas.down = true; 
            break;

        case 'ArrowLeft': 
            teclas.left = true; 
            break;

        case 'ArrowRight': 
            teclas.right = true; 
            break;

        default: 
            return;

      }
      e.preventDefault();
    });

    // Detectar cuándo se suelta una tecla
    document.addEventListener('keyup', (e) => {
      switch (e.key) {
        case 'ArrowUp': 
            teclas.up = false; 
            break;

        case 'ArrowDown': 
            teclas.down = false; 
            break;

        case 'ArrowLeft': 
            teclas.left = false; 
            break;

        case 'ArrowRight': 
            teclas.right = false; 
            break;

      }
    });

    // Funcion para la colision de las paredes
function hayColision(x, y, anchoPersonaje, altoPersonaje) {
  for (let pared of paredes) {
    const rect = pared.getBoundingClientRect();
    const contenedorRect = pared.parentElement.getBoundingClientRect();

    // Ajustar coordenadas al contenedor
    const paredX = pared.offsetLeft;
    const paredY = pared.offsetTop;
    const paredWidth = pared.offsetWidth;
    const paredHeight = pared.offsetHeight;

    if (x < paredX + paredWidth && x + anchoPersonaje > paredX &&
      y < paredY + paredHeight && y + altoPersonaje > paredY) {
      return true;
    
    }
  }
  return false;
}

    function mover() {
      // Crear variable para saber a donde mira el personaje y dos variables
      // para poder actualizar la posicion en caso de que no haya colision
      let nuevaX = posX;
      let nuevaY = posY;

      let direccion = null;

      // Actualizar posiciones según las teclas activas
      if (teclas.up) {
        nuevaY -= velocidad;
        direccion = "back";
      }
      if (teclas.down) {
        nuevaY += velocidad;
        direccion = "front";
      }
      if (teclas.left) {
        nuevaX -= velocidad;
        direccion = "left";
      }
      if (teclas.right) {
        nuevaX += velocidad;
        direccion = "right";
      }

// Pasar a una variable el ancho y alto del personaje para las colisiones
const anchoPersonaje = img.offsetWidth;
const altoPersonaje = img.offsetHeight;

// El contenedor para que el personaje tenga una zona restringida en la que moverse
const contenedor = document.getElementById("contenedor");
const contenedorWidth = contenedor.clientWidth;
const contenedorHeight = contenedor.clientHeight;

if (nuevaX < 0){ 
  nuevaX = 0;
}
if (nuevaY < 0){
  nuevaY = 0;
}
  if (nuevaX + anchoPersonaje > contenedorWidth) {
    nuevaX = contenedorWidth - anchoPersonaje;
  }
  if (nuevaY + altoPersonaje > contenedorHeight) {
    nuevaY = contenedorHeight - altoPersonaje;
  }
  // Verificar colisiones antes de actualizar
  if (!hayColision(nuevaX, nuevaY, img.width, img.height)) {
    posX = nuevaX;
    posY = nuevaY;
  }
      if (direccion) {
        frameTimer++;
        if (frameTimer >= frameInterval) {
          frameIndex = (frameIndex + 1) % sprites[direccion].length;
          frameTimer = 0;
        }
        img.src = sprites[direccion][frameIndex];
      }


      img.style.top = posY + 'px';
      img.style.left = posX + 'px';

      // Llamar de nuevo al siguiente frame
      requestAnimationFrame(mover);
    }

    // Iniciar el bucle
    mover();
