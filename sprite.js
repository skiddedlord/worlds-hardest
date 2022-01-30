function Sprite(x, y, largura, altura) {
	this.x = x;
	this.y = y;
	this.largura = largura;
	this.altura = altura;
	
	this.desenha = function(xCanvas, yCanvas){
		ctx.drawImage(img, this.x, this.y, this.largura, this.altura, xCanvas, yCanvas, this.largura, this.altura);
	}
}

var bg = new Sprite(0, 0, 1024, 700),
spriteBloco = new Sprite (0, 701, 35, 35),
spriteAzul = new Sprite (36, 701, 26, 26),
spriteAmarelo = new Sprite (63, 701, 26, 26);