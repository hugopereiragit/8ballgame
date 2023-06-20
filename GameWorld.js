const DELTA = 1/100;


function GameWorld(){

    this.bolas = [
        [new Vector2(1022,413), COLOR.YELLOW],  // \ 1
        [new Vector2(1056,393), COLOR.YELLOW],  // \ 2 
        [new Vector2(1056,433), COLOR.RED],  // \3 
        [new Vector2(1090,374), COLOR.RED],  // \4 
        [new Vector2(1090,413), COLOR.BLACK],  // \5 
        [new Vector2(1090,452), COLOR.YELLOW],  // \6 
        [new Vector2(1126,354), COLOR.YELLOW],  // \7 
        [new Vector2(1126,393), COLOR.RED],  // \8 
        [new Vector2(1126,433), COLOR.YELLOW],  // \9
        [new Vector2(1126,472), COLOR.RED],  // \10
        [new Vector2(1162,335), COLOR.RED],  // \11
        [new Vector2(1162,374), COLOR.RED],  // \12
        [new Vector2(1162,413), COLOR.YELLOW],  // \13
        [new Vector2(1162,452), COLOR.RED],  // \14
        [new Vector2(1162,491), COLOR.YELLOW],  // \15
        [new Vector2(413,413), COLOR.WHITE]  // \16
    ].map(params => new Bola(params[0],params[1]))

    //posicionar o taco na bola
    this.BolaBranca = this.bolas[this.bolas.length-1];
    this.taco = new Taco(
        new Vector2(413,413),
        this.BolaBranca.disparar.bind(this.BolaBranca)
        );
}

GameWorld.prototype.update = function(){
    this.taco.update();
    //this.BolaBranca.update(DELTA);
    for( let i= 0; i< this.bolas.length; i++){
        this.bolas[i].update(DELTA);
    }

    if(!this.bolasEmMovimento() && this.taco.dispr){ //reposicionar se as bolas tiverem paradas e o taco tiver disparado
        this.taco.resposicionar(this.BolaBranca.position);
    }
}

GameWorld.prototype.draw = function(){
    Canvas.drawImage(sprites.background, {x:0, y:0});
    this.taco.draw();
    //this.BolaBranca.draw();
    for( let i= 0; i< this.bolas.length; i++){
        this.bolas[i].draw();
    }

}

GameWorld.prototype.bolasEmMovimento = function(){
    return this.BolaBranca.moving;
}