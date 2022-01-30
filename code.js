var canvas, ctx, img, ALTURA, LARGURA, velocidadeMaximaBloco = 3, _paredes = [], _enemies = [], frames = 0;

var velocidadeInimigos = 6, vitoria = false, mortes = 0, level = 1;

var pressingRight = false, pressingLeft = false, pressingUp = false, pressingDown = false;

function Retangulo (x, y, largura, altura) {
    this.altura = altura; this.largura = largura; this.x = x; this.y = y;

    this.centroX = function() {
		return this.x + this.largura/2;
	};

    this.centroY = function() {
		return this.y + this.altura/2;
	};
}

function inimigo (x, y, velX){
	this.x = x; this.y = y;
	this.retangulo = new Retangulo (x+2, y+2, 22, 22);
	this.velX = velX;
	
	this.atualiza = function() {
		this.retangulo.x += this.velX;
		this.x += this.velX;
		
		switch (level){
			
			case 1:
				if (this.x > 705){
					this.retangulo.x = 707;
					this.x = 705;
					this.velX = -this.velX
				}
				else if (this.retangulo.x < 276){
					this.retangulo.x = 278;
					this.x = 276;
					this.velX = -this.velX
				}
			default:
				break;
		}
		
	};
	
	this.desenha = function() {
		spriteAzul.desenha(this.retangulo.x, this.retangulo.y);
	};
	
}

function colisao(obstaculo, inimigo){
	//Distância Centros
	var catX = bloco.centroX() - obstaculo.centroX();
	var catY = bloco.centroY() - obstaculo.centroY();
	
	//Soma Meias ALTURA/LARGURA
	var sumMeiaLargura = bloco.largura/2 + obstaculo.largura/2;
	var sumMeiaAltura  = bloco.altura /2 + obstaculo.altura /2;
	
	if (Math.abs(catX) < sumMeiaLargura && Math.abs(catY) < sumMeiaAltura){ // colisao
		if (inimigo == true){
			mortes++;
			restart();
		}
		var overlapX = sumMeiaLargura - Math.abs(catX);
		var overlapY = sumMeiaAltura  - Math.abs(catY);
		
		if (overlapX >= overlapY){ //colisao por cima/baixo
			if (catY > 0){ //obstaculo acima
				bloco.y += overlapY;
			}else{ //obstaculo abaixo
				bloco.y -= overlapY;
			}
		}else{ //colisao esquerda/direita
			if (catX > 0){ //obstaculo a esquerda
				bloco.x += overlapX;
			}else{ //obstaculo a direita
				bloco.x -= overlapX;
			}
		}
	}
}

var bloco = {
	x: 125,
	y: 250,
	velX: 0,
	velY: 0,
	altura: spriteBloco.altura,
	largura: spriteBloco.largura,
	
	centroX: function(){
		return this.x + this.largura/2;
	},
	
	centroY: function(){
		return this.y + this.altura/2;
	},
	
	
	atualiza: function(){
		this.x += this.velX;
		this.y += this.velY;
		
		//Limites tela
		this.x = Math.max(74, Math.min(this.x, 931 - this.largura));
		this.y = Math.max(196, Math.min(this.y, 477 - this.altura));
		
		//Colisões Paredes Internas
		for(var i = 0; i < 4; i++){
			colisao(_paredes[i], false);
		}
		
		//Colisoes Inimigos
		for(var i = 0; i < 4; i++){
			colisao(_enemies[i].retangulo, true);
		}
		
		//Vitória
		if (this.x > 793 - this.largura){
			if (level < 2){
				level++;
			}else{
				vitoria = true;
			}				
		}
	},
	
	desenha: function(){
		spriteBloco.desenha(this.x, this.y);
	}
	
	
}

function keydownHandler(evento){
	var tecla = evento.keyCode;
	switch (tecla){
		case 37: //esquerda
			if (pressingLeft == false){
				bloco.velX -= velocidadeMaximaBloco;
				pressingLeft = true;
			}
			break;
		case 38: //cima
			if (pressingUp == false){
				bloco.velY -= velocidadeMaximaBloco;
				pressingUp = true;
			}
			break;
		case 39: //direita
			if (pressingRight == false){
				bloco.velX += velocidadeMaximaBloco;
				pressingRight = true;
			}
			break;
		case 40: //baixo
			if (pressingDown == false){
				bloco.velY += velocidadeMaximaBloco;
				pressingDown = true;
			}
			break;
		default:
			break;
	}
}

function keyupHandler(evento){
	var tecla = evento.keyCode;
	switch (tecla){
		case 37: //esquerda
			if (pressingLeft == true){
				bloco.velX += velocidadeMaximaBloco;
				pressingLeft = false;
			}
			break;
		case 38: //cima
			if (pressingUp == true){
				bloco.velY += velocidadeMaximaBloco;
				pressingUp = false;
			}
			break;
		case 39: //direita
			if (pressingRight == true){
				bloco.velX -= velocidadeMaximaBloco;
				pressingRight = false;
			}
			break;
		case 40: //baixo
			if (pressingDown == true){
				bloco.velY -= velocidadeMaximaBloco;
				pressingDown = false;
			}
			break;
		default:
			break;
	}
}


function clique(evento){
	//alert("clicou");
}

function main(){
	ALTURA = 700;
	LARGURA = 1024;
	
	canvas = document.createElement("canvas"),
	
    
	this.canvas.width = LARGURA;
	this.canvas.height = ALTURA;
	this.canvas.style.border = "1px solid #000";
	this.context = canvas.getContext("2d");
	ctx = this.context;
	document.body.appendChild(canvas);
	
	
	document.addEventListener("mousedown", clique);
	
	
	window.addEventListener("keydown", keydownHandler, false);
	window.addEventListener("keyup",   keyupHandler,   false);
	
	
	img = new Image();
	img.src = "img/Sprites.png";
	
	
	
	_paredes[0] = new Retangulo(212, 196, 54, 240);
	_paredes[1] = new Retangulo(307, 429, 432, 48);
	_paredes[2] = new Retangulo(265, 196, 432, 48);
	_paredes[3] = new Retangulo(739, 237, 54, 240);
	
	_enemies[0] = new inimigo(705, 252, -velocidadeInimigos);
	_enemies[1] = new inimigo(276, 299,  velocidadeInimigos);
	_enemies[2] = new inimigo(705, 348, -velocidadeInimigos);
	_enemies[3] = new inimigo(276, 395,  velocidadeInimigos);
	
	roda();
}

function restart(){
	//bloco.x = 125;
	//bloco.y = 250;
	bloco.x = 267;
	bloco.y = 437;
}



function roda(){
	atualiza();
	desenha();
	
	window.requestAnimationFrame(roda);
}

function atualiza(){
	frames++;
	bloco.atualiza();
	for (var i = 0; i < 4; i++){
		_enemies[i].atualiza();
	}
	
}

function desenha(){
	bg.desenha(0, 0);
	bloco.desenha();
	for (var i = 0; i < 4; i++){
		_enemies[i].desenha();
	}
	if (vitoria){
		ctx.font = "50px Arial"
		ctx.fillStyle = "green";
		ctx.fillText("Vitória", 370, 227);
	}

}

//Roda
main();