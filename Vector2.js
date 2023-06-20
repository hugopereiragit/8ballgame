function Vector2(x=0,y=0){
 this.x = x;  // this.x = typeof x !== 'undefined' ? x : 0 //if typeof x difrente de undifined e igual ao valor de x senao é 0
 this.y = y;  // this.y = typeof y !== 'undefined' ? y : 0 

}

Vector2.prototype.copy = function(){
    return new Vector2(this.x, this.y);
}

Vector2.prototype.addTo = function(vector){
    this.x += vector.x;
    this.y += vector.y;
}


Vector2.prototype.mult = function(scalar){
    return new Vector2(this.x * scalar, this.y * scalar);
}

Vector2.prototype.length = function(){
    //calcular o comprimento
    //devovler o resultado da formula de comprimentp utilizando mathobj de javascript
    return Math.sqrt(Math.pow(this.x, 2)+ Math.pow(this.y, 2))
}