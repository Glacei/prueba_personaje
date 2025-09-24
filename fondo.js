const img1 = "fondo/tinta1.png";
const img2 = "fondo/tinta2.png";
let usandoPrimero = true;

function alternarImagen(){
    document.body.style.backgroundImage = "url (${usandoPrimero ? img2 : img1})";
    usandoPrimero = !usandoPrimero;

}

setInterval(alternarImagen, 300);