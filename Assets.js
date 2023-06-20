let sprites = {};
let assestsACarregar = 0;


function LoopAssetsLoad(callback){
    if(assestsACarregar){
        requestAnimationFrame(LoopAssetsLoad.bind(this, callback));
    }
    else{
        callback(); //ativar o callback
    }
}

function loadAssets(callback){ //quando carregar os assets chamar o callback


    function loadSprite(fileName){
        assestsACarregar++;
        let spriteImage = new Image();
        spriteImage.src = "./assets/sprites/" + fileName;

        spriteImage.onload = function(){
            assestsACarregar--;
        }
        return spriteImage;
    }
    //carregamento dos sprites
    sprites.background = loadSprite('spr_background4.png');
    sprites.stick = loadSprite('spr_stick.png');
    sprites.BolaBranca = loadSprite('spr_ball2.png');
    sprites.BolaVermelha = loadSprite('spr_redBall2.png');
    sprites.BolaAmarela = loadSprite('spr_yellowBall2.png');
    sprites.BolaPreta = loadSprite('spr_blackBall2.png');

    LoopAssetsLoad(callback);
}


//cores das bolas
function getBallSpriteByColor(color){
    switch(color){
        case COLOR.RED:
            return sprites.BolaVermelha;
        case COLOR.YELLOW:
            return sprites.BolaAmarela;
        case COLOR.BLACK:
            return sprites.BolaPreta;
        case COLOR.WHITE:
            return sprites.BolaBranca;
            
    }

}