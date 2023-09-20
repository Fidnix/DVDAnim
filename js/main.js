let canvas = document.getElementById('dvd__cont');
let cont = document.getElementById('cont');
let ctx = canvas.getContext('2d');

const FPS = 120;
let width = canvas.width;
let height = canvas.height;
const PIXEL_STEP = 3;
let resizeCanvas = ()=>{
    canvas.width = cont.clientWidth;
    canvas.height = cont.clientHeight;
    width = canvas.width;
    height = canvas.height;
}
resizeCanvas();


let colors = [
    'invert(63%) sepia(74%) saturate(3041%) hue-rotate(157deg) brightness(99%) contrast(106%)',
    'invert(66%) sepia(65%) saturate(6246%) hue-rotate(359deg) brightness(99%) contrast(110%)',
    'invert(7%) sepia(95%) saturate(7483%) hue-rotate(248deg) brightness(121%) contrast(144%)',
    'invert(85%) sepia(80%) saturate(456%) hue-rotate(354deg) brightness(105%) contrast(107%)',
    'invert(11%) sepia(82%) saturate(7182%) hue-rotate(358deg) brightness(94%) contrast(110%)',
    'invert(16%) sepia(91%) saturate(6391%) hue-rotate(331deg) brightness(87%) contrast(107%)',
    'invert(9%) sepia(100%) saturate(7399%) hue-rotate(276deg) brightness(108%) contrast(117%)'
]

let contadorModular = {
    value: 0,
    max: colors.length,
    count(){
        this.value++;
        if(this.value == this.max){
            this.value = 0;
        }
    }
}

let imagen = {
    x: 0,
    y: 0,
    w: 453,
    h: 200,
    dirX: 1,
    dirY: 1,
    src: new Image(),
    mover(){
        if(this.x < 0 || this.x + this.w >= width){
            this.dirX *= -1;
            contadorModular.count()
        }
        if(this.y < 0 || this.y + this.h >= height){
            this.dirY *= -1;
            contadorModular.count()
        }
        this.x += PIXEL_STEP*this.dirX;
        this.y += PIXEL_STEP*this.dirY;
    },
    verificarChoque(){
        if(this.x < 0 || this.x + this.w >= width){
            // this.x = width - this.w - 10;
            this.x = 0;
            this.dirX *= -1;
            contadorModular.count()
        }
        if(this.y < 0 || this.y + this.h >= height){
            // this.y = height - this.h - 10;
            this.y = 0;
            this.dirY *= -1;
            contadorModular.count()
        }
    }
} 
imagen.src.src = 'assets/dvd-logo-png-transparent.png';

window.onresize = ()=>{
    resizeCanvas();
    rellenarFondo();
    imagen.verificarChoque();
    dibujarDvd();
}
let rellenarFondo = ()=>{
    ctx.clearRect(0, 0, width, height);
    let auxFill = ctx.fillStyle;
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = auxFill;
}

let dibujarDvd = ()=>{
    ctx.filter = colors[contadorModular.value]
    ctx.drawImage(imagen.src, imagen.x, imagen.y, imagen.w, imagen.h);
    ctx.filter = 'invert(0)'
    imagen.mover()
}

imagen.src.addEventListener('load', ()=>{
    setInterval(
        ()=>{
            rellenarFondo();
            dibujarDvd();
        }, 1000/FPS
    )
})