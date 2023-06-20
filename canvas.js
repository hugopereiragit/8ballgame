function Canvas2d(){
    this._canvas = document.getElementById('ecra');
    this._canvasContext = this._canvas.getContext('2d');

}

Canvas2d.prototype.clear = function(){
    this._canvasContext.clearRect(0,0,this._canvas.width,this._canvas.height);
    //limpar
}

Canvas2d.prototype.drawImage = function(image, position, origem, rotation = 0){
    if(!position){// se a posição for undefined
        position = new Vector2();
    }
    if(!origem){
        origem = new Vector2();
    }

    this._canvasContext.save();
    this._canvasContext.translate(position.x, position.y);
    this._canvasContext.rotate(rotation);
    this._canvasContext.drawImage(image,-origem.x,-origem.y);
    this._canvasContext.restore();
    
}

let Canvas = new Canvas2d(); 

//Caregar o background
//let image = new Image();
//image.src = "./assets/sprites/spr_background4.png" // --- Background(mesa)
//
//
//setTimeout(() => {
//    Canvas.drawImage(image, {x:0,y:0});
//}, 1000);