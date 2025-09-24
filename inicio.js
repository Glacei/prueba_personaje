const img = document.getElementById("mari");
const front = "sprites/front1.png";
const right = "sprites/right1.png";
const left = "sprites/left1.png";
const back = "sprites/back1.png";
let posX = 150;
let posY = 150;
const velocidad = 2;

 const teclas = { up: false, down: false, left: false, right: false };

    // Detectar cuándo se presiona una tecla
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowUp': 
            teclas.up = true; 
            img.src = back; 
            break;

        case 'ArrowDown': 
            teclas.down = true; 
            img.src = front; 
            break;

        case 'ArrowLeft': 
            teclas.left = true; 
            img.src = left; 
            break;

        case 'ArrowRight': 
            teclas.right = true; 
            img.src = right; 
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

    function mover() {
      // Actualizar posiciones según las teclas activas
      if (teclas.up) 
        posY = Math.max(0, posY - velocidad);

      if (teclas.down) 
        posY = Math.min(665, posY + velocidad);

      if (teclas.left) 
        posX = Math.max(0, posX - velocidad);

      if (teclas.right) 
        posX = Math.min(1450, posX + velocidad);

      img.style.top = posY + 'px';
      img.style.left = posX + 'px';

      // Llamar de nuevo al siguiente frame
      requestAnimationFrame(mover);
    }

    // Iniciar el bucle
    mover();
