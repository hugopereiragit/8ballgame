const BALL_ORIGIN = new Vector2(25,25);
const BALL_DIAMTRO = 38;

function Bola(position,color){
    this.position = position;
    this.velocidade = new Vector2();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
    this.visivel = true;
}

Bola.prototype.update = function(delta){

    if(!this.visivel){ // verificar se a bola esta visivel se nao parar
        return;
    }

    this.position.addTo(this.velocidade.mult(delta));
    //abrandar a bola
    this.velocidade = this.velocidade.mult(0.98);
    if(this.velocidade.length()< 5){
        this.velocidade = new Vector2(); // reset do x e y
        this.moving = false; // var para verificar se ainda esta em movimento
    }
}

Bola.prototype.draw = function(){
    if(!this.visivel){ // verificar se a bola esta visivel se nao parar
        return;
    }
    Canvas.drawImage(this.sprite,this.position, BALL_ORIGIN);
}

Bola.prototype.disparar = function (forca, rotation){
    console.log("disparo");
    //atirar a bola
    this.velocidade = new Vector2(forca * Math.cos(rotation),forca * Math.sin(rotation));
    this.moving = true;
}


Bola.prototype.colisaoBola = function(objeto){
    if(!this.visivel || !objeto.visivel){ // verificar se a bola esta visivel ou se a bola em que estamos a volidir esta visivel
        return;
    }
 //1 encotrar o ponto de colisao (unit normal vector)
    // encortat o normal vector subtraindo a posicao de uma bola com outra
    const n = this.position.subtrair(objeto.position);

    //distancia
    const dist = n.length();

    if(dist > BALL_DIAMTRO){ // nao existe colisao 
        return;
    }


    //as bolas estavam a ficar dentro das outras por isso mete-se um minimo de proximidade
    const mtd = n.mult((BALL_DIAMTRO - dist) / dist)
    //empurrar os objetos para longe do outro
    this.position = this.position.add(mtd.mult(1/2))
    objeto.position = objeto.position.subtrair(mtd.mult(1/2))

    // normal vector
    const un = n.mult(1/n.length());

    //tangente
    const ut = new Vector2(-un.y, un.x);

    // Volceidade com normal e tangente
    const v1n = un.dot(this.velocidade);
    const v1t = ut.dot(this.velocidade)
    const v2n = un.dot(objeto.velocidade)
    const v2t = ut.dot(objeto.velocidade)

    let v1nTag = v2n;
    let v2nTag = v1n;

    // Convert the scalar normal and tangential velocities into vectores.
    v1nTag = un.mult(v1nTag)
    const v1tTag  = ut.mult(v1t)
    v2nTag = un.mult(v2nTag);
    const v2tTag = ut.mult(v2t)

    // Update veloci
    this.velocidade = v1nTag.add(v1tTag);
    objeto.velocidade = v2nTag.add(v2tTag);

    this.moving = true;
    objeto.moving = true;
}

Bola.prototype.colisaoMesa = function(objeto){

    

    if(!this.moving || !this.visivel){ // se a bola estiver parada return
        return;
    }

    let collisao = false;

    if(this.position.y <= objeto.TopY + (BALL_DIAMTRO/2)){
        this.position.y = objeto.TopY + (BALL_DIAMTRO/2);
        this.velocidade = new Vector2(this.velocidade.x, -this.velocidade.y) 
        //inverter a velocidade do Y se colisao emc ima
        collisao = true;
    }

    if(this.position.x >= objeto.RightX - (BALL_DIAMTRO/2)){
        this.position.x = objeto.RightX - (BALL_DIAMTRO/2)
        this.velocidade = new Vector2(-this.velocidade.x, this.velocidade.y) 
        //inverter a velocidade do x se colisao direita
        collisao = true;
    }
    
    if(this.position.y >= objeto.BottomY - (BALL_DIAMTRO/2)){
        this.position.y = objeto.BottomY - (BALL_DIAMTRO/2)
        this.velocidade = new Vector2(this.velocidade.x, -this.velocidade.y) 
        //inverter a velocidade do Y se colisao em baix
        collisao = true;
    }
    
    if(this.position.x <= objeto.LeftX + (BALL_DIAMTRO/2)){
        this.position.x = objeto.LeftX + (BALL_DIAMTRO/2)
        this.velocidade = new Vector2(-this.velocidade.x, this.velocidade.y)
         //inverter a velocidade do X se colisao na esquerd
        collisao = true;
    }

    if(collisao==true){
        this.velocidade = this.velocidade.mult(0.97);
    }
 
}

Bola.prototype.bolaburaco = function(objeto) {
    if (!this.visivel) {
        return false;
    }

    const distance = this.position.distanciade(objeto);

    if (distance < 48) { // raio do buraco
        console.log("dentro do buraco");

        if (this === Pool_Game.gameWorld.BolaBranca) {
            // Bola branca entrou no buraco, volta à posição original
            this.position = new Vector2(413, 413);
            this.velocidade = new Vector2(0,0);
        } else {
            // Atualizar pontuação do jogador atual
        const currentPlayer = Pool_Game.gameWorld.currentPlayer;
        Pool_Game.gameWorld.playerScores[currentPlayer - 1]++;
            // Esconder a bola e parar o movimento
            this.visivel = false;
            this.moving = false;
        }

        return true;
    }

    return false;
};


Bola.prototype.colisaoCom = function(objeto){
   if(objeto instanceof Bola){
    this.colisaoBola(objeto);
   }else{
    this.colisaoMesa(objeto);
   }


}





