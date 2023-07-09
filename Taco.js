const TACO_ORIGIN = new Vector2(970,11);
const TACO_DISP_ORIIN = new Vector2(950,11);

function Taco(position, ondisparo){
    this.position = position; // new Vector2(400,400) //{x:0 ,y: 400};
    // this.origem = new Vector2(500,10);
    this.rotation = 0;
    this.origem = TACO_ORIGIN.copy();
    this.forca = 0;
    this.ondisparo = ondisparo;
    this.dispr = false; // taco em estado de disparo
}

Taco.prototype.update = function(){

if(this.dispr){
    return;
}


    if(Mouse.left.down){
        this.aumentaForca();
    }else if(this.forca > 0){
        this.disparar();
    }
    this.updateRotation();

    // testar movimento
    // this.position.x++;

    // Testar movimento no rato
    // this.position = Mouse.position;

    //testar botoes rato
    //if(Mouse.left.pressed){
     //   console.log("esquerda")
    //}
    //if(Mouse.right.pressed){
     //   console.log("direita")
    //}
    //if(Mouse.middle.pressed){
     //   console.log("meio")
    //}



}

Taco.prototype.draw = function(){
    Canvas.drawImage(sprites.stick, this.position, this.origem, this.rotation);
}

Taco.prototype.updateRotation = function(){
    // https://sinepost.wordpress.com/2012/02/16/theyve-got-atan-you-want-atan2/
    // codigo da rotação do taco feito utilizando link em cima para info
    let opposite = Mouse.position.y - this.position.y;
    let adjacent = Mouse.position.x - this.position.x;

    this.rotation = Math.atan2(opposite, adjacent);
}

Taco.prototype.aumentaForca = function(){
    if(this.forca > 4000){ //forca maxima
        return;
    }
    this.forca += 100;
    //afastar o eixo do x (ir pra tras)
    this.origem.x += 5;
}

Taco.prototype.disparar = function(){
    this.ondisparo(this.forca,this.rotation);
    this.forca = 0;
    //voltar o taco para a posicao original
    this.origem = TACO_DISP_ORIIN.copy();
    this.dispr = true;
}

Taco.prototype.resposicionar = function(position){
    this.position = position.copy();
    this.origem = TACO_ORIGIN.copy();
    this.dispr = false;
}