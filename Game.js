function Game(){

}

Game.prototype.init = function(){
    this.gameWorld = new GameWorld();
}

Game.prototype.start = function(){
    //this.init();
    Pool_Game.init();
    Pool_Game.mainLoop();

}

Game.prototype.mainLoop = function(){
    Canvas.clear() //limpar previo
    Pool_Game.gameWorld.update();
    Pool_Game.gameWorld.draw();
    Mouse.reset();

    requestAnimationFrame(Pool_Game.mainLoop);

}

let Pool_Game = new Game();