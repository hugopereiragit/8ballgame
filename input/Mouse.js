function handleMouseMove(evento){
    let x = evento.pageX; //posição do x
    let y = evento.pageY; // ..         y
    Mouse.position = new Vector2(x,y);

}

function handleMouseDown(evento){
    handleMouseMove(evento);

//Econtrar localizacao de pixel
//https://stackoverflow.com/questions/72379573/get-canvas-pixel-position-from-mouse-coordinates
const canvas = document.querySelector( 'canvas' );    
const bb = canvas.getBoundingClientRect();
    const x = Math.floor( (evento.clientX - bb.left) / bb.width * canvas.width );
    const y = Math.floor( (evento.clientY - bb.top) / bb.height * canvas.height );
    
    console.log({ x, y });


// qual botao esta down(primido) neste momento 1 left 2 middle 3 direita
    if (evento.which === 1){
        if(!Mouse.left.down)
            Mouse.left.pressed = true;
        Mouse.left.down = true;
    } else if (evento.which === 2){
        if (!Mouse.middle.down)
            Mouse.middle.pressed = true;
        Mouse.middle.down = true;
    } else if (evento.which === 3){
        if(!Mouse.right.down)
            Mouse.right.pressed = true;
        Mouse.right.down = true;            
    }

}


function handleMouseUp(evento){
    handleMouseMove(evento);

    //qual o botao que foi released
    if(evento.which === 1)
        Mouse.left.down = false;
    else if (evento.which === 2)
        Mouse.middle.down = false;
    else if (evento.which === 3){
        Mouse.right.down = false;
    }
}


function MouseHandler(){
    this.left = new ButtonState();
    this.middle = new ButtonState();
    this.right = new ButtonState();
    this.position = new Vector2();

    //chamar as funcoes
    document.onmousemove = handleMouseMove;
    document.onmousedown = handleMouseDown;
    document.onmouseup = handleMouseUp;

}

MouseHandler.prototype.reset = function(){
    this.left.pressed = false;
    this.middle.pressed = false;
    this.right.pressed = false;
}

let Mouse = new MouseHandler();
