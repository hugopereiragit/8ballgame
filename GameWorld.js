const DELTA = 1/100; // quanto da velocidade e adicionado as bolas
this.currentPlayer = 1; // Start with player 1's turn

function GameWorld(){
    this.currentPlayer = 1; // Current player's turn (1 or 2)
    this.playerScores = [0, 0]; // Scores of player 1 and player 2  
    this.bolas = [
        [new Vector2(1022,413), COLOR.YELLOW],  // \ 1
        [new Vector2(1056,393), COLOR.YELLOW],  // \ 2 
        [new Vector2(1056,433), COLOR.RED],  // \3 
        [new Vector2(1090,374), COLOR.RED],  // \4 
        [new Vector2(1090,413), COLOR.BLACK],  // \5 
        [new Vector2(1090,452), COLOR.YELLOW],  // \6 
        [new Vector2(1125,354), COLOR.YELLOW],  // \7 
        [new Vector2(1125,393), COLOR.RED],  // \8 
        [new Vector2(1125,433), COLOR.YELLOW],  // \9
        [new Vector2(1125,472), COLOR.RED],  // \10
        [new Vector2(1162,335), COLOR.RED],  // \11
        [new Vector2(1162,374), COLOR.RED],  // \12
        [new Vector2(1162,413), COLOR.YELLOW],  // \13
        [new Vector2(1162,452), COLOR.RED],  // \14
        [new Vector2(1162,491), COLOR.YELLOW],  // \15
        [new Vector2(413,413), COLOR.WHITE]  // \16
    ].map(params => new Bola(params[0],params[1]))

    //posicionar o taco na bola branca
    this.BolaBranca = this.bolas[this.bolas.length-1];
    this.taco = new Taco(
        new Vector2(413,413),
        this.BolaBranca.disparar.bind(this.BolaBranca)
        );

        this.mesa = { //valores absolutos da mesa
            TopY: 57,
            RightX: 1442,
            BottomY:769,
            LeftX: 57,
        }
    this.buracos = [
        [new Vector2(749,32)],
        [new Vector2(749,794)],
        [new Vector2(62,62)],
        [new Vector2(1434,62)],
        [new Vector2(62,762)],
        [new Vector2(1434,762)],
    ]
}

GameWorld.prototype.handleCollisions = function(){
    let bolaColocada = false; // Variável auxiliar para verificar se uma bola foi colocada em um buraco

    for (let i = 0; i < this.bolas.length; i++) {
        const pocketed = []; // Track pocketed balls
        this.bolas[i].colisaoCom(this.mesa);
        for (let b = i + 1; b < this.bolas.length; b++) {
            const primeirabola = this.bolas[i];
            const segundabola = this.bolas[b];
            primeirabola.colisaoCom(segundabola);
        }
        for (let j = 0; j < this.buracos.length; j++) {
            const buraco = this.buracos[j][0];
            if (this.bolas[i].bolaburaco(buraco) && !pocketed.includes(i)) {
                // Bola vai ao buraco
                const currentPlayer = this.currentPlayer;
                pocketed.push(i); // Adicionar a bola às bolas já metidas
                bolaColocada = true; 

                console.log(this.bolas[i].cor)
                if (this.bolas[i] === this.bolas[4]) {
                    // Reiniciar o jogo se a bola preta for colocada em um buraco
                    this.reiniciarJogo();
                    return;
                }

            }
        }
    }

  
};

GameWorld.prototype.reiniciarJogo = function() {
    // Redefinir as posições das bolas
    this.bolas = [
        [new Vector2(1022,413), COLOR.YELLOW],  
        [new Vector2(1056,393), COLOR.YELLOW],  
        [new Vector2(1056,433), COLOR.RED],  
        [new Vector2(1090,374), COLOR.RED],  
        [new Vector2(1090,413), COLOR.BLACK],  
        [new Vector2(1090,452), COLOR.YELLOW],  
        [new Vector2(1125,354), COLOR.YELLOW],  
        [new Vector2(1125,393), COLOR.RED],  
        [new Vector2(1125,433), COLOR.YELLOW],  
        [new Vector2(1125,472), COLOR.RED],  
        [new Vector2(1162,335), COLOR.RED],  
        [new Vector2(1162,374), COLOR.RED],  
        [new Vector2(1162,413), COLOR.YELLOW],  
        [new Vector2(1162,452), COLOR.RED],  
        [new Vector2(1162,491), COLOR.YELLOW],  
        [new Vector2(413,413), COLOR.WHITE]  
    ].map(params => new Bola(params[0],params[1]));
     //posicionar o taco na bola branca
     this.BolaBranca = this.bolas[this.bolas.length-1];
    this.taco.dispr = false;
    this.taco = new Taco(
        new Vector2(413,413),
        this.BolaBranca.disparar.bind(this.BolaBranca)
        );
 
    
    // Redefinir o placar
    this.playerScores = [0, 0];

    // Reiniciar o turno do jogador para o jogador 1
    this.currentPlayer = 1;
};

GameWorld.prototype.update = function(){
    
    this.handleCollisions();


    this.taco.update();
    //this.BolaBranca.update(DELTA);
    for( let i= 0; i< this.bolas.length; i++){
        this.bolas[i].update(DELTA);
    }

    if(!this.bolasEmMovimento() && this.taco.dispr){ //reposicionar o taco se as bolas tiverem paradas e o taco tiver disparado
        this.taco.resposicionar(this.BolaBranca.position);
        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    }
}

GameWorld.prototype.draw = function(){
    Canvas.drawImage(sprites.background, {x:0, y:0});
    this.taco.draw();
    //this.BolaBranca.draw();
    for( let i= 0; i< this.bolas.length; i++){
        this.bolas[i].draw();
    }

    // Draw scores
    Canvas._canvasContext.font = '20px Arial';
    Canvas._canvasContext.fillStyle = 'black';
    Canvas._canvasContext.fillText('Player 1: ' + this.playerScores[0], 600, 200);
    Canvas._canvasContext.fillText('Player 2: ' + this.playerScores[1], 600, 400);


// Definir o texto do jogador atual
const playerText = 'Jogador Atual: ' + this.currentPlayer;


// Desenhar o texto do jogador atual
Canvas._canvasContext.fillText(playerText, 600, 600);

}

GameWorld.prototype.bolasEmMovimento = function(){
  //  return this.BolaBranca.moving; agora e preicos para as bolas tds

  let bolasEmMovimento = false;

   for( let i=0 ; i < this.bolas.length; i++){ //iterar pelas bolas
    //console.log(i);
    if(this.bolas[i].moving){ // se tiver a movimentar passar true e sair do loop
        bolasEmMovimento = true;
        break;
    }
  }
  return bolasEmMovimento;
}