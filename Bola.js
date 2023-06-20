const BALL_ORIGIN = new Vector2(25,25);

function Bola(position,color){
    this.position = position;
    this.velocidade = new Vector2();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
}

Bola.prototype.update = function(delta){
    this.position.addTo(this.velocidade.mult(delta));
    //abrandar a bola
    this.velocidade = this.velocidade.mult(0.98);
    if(this.velocidade.length()< 5){
        this.velocidade = new Vector2(); // reset do x e y
        this.moving = false;
    }
}

Bola.prototype.draw = function(){
    Canvas.drawImage(this.sprite,this.position, BALL_ORIGIN);
}

Bola.prototype.disparar = function (forca, rotation){
    console.log("disparo");
    //atirar a bola
    this.velocidade = new Vector2(forca * Math.cos(rotation),forca * Math.sin(rotation));
    this.moving = true;
}
