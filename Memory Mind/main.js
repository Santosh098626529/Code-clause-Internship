var imagens = new Array("0","0","1","1","2","2","3","3","4","4","5","5"); // Array com o nome das imagens

var caixasViradas = new Array(); // Array que controla as caixas que estão viradas "para cima"   
var imagensViradas = new Array(); // Array que controla as imagens que estão nas caixas viradas "para cima"

var caixasDesativadas = new Array(); // Array que controla as caixas desativadas (que não podem ser clicadas)

var qtosCompletados; // Quantas imagens já foram completadas

var pontos; 

const pontuacaoAcertar = 20; // Pontos ganhos ao acertar
const pontuacaoErrar = -5;   // Pontos ganhos ao errar

function inicializar() {   
	caixasViradas = [];  
	imagensViradas = [];
	
	qtosCompletados = 0;
	pontos = 0;

	document.getElementById("span-pontos").innerHTML = "Pontos: 0";

	for(i=0; i<12; i++) {
		document.getElementById("container" + i).style.opacity = '1';
        document.getElementById("carta" + i).style.transform = 'rotatey(0deg)'
		caixasDesativadas[i] = false;
	}
		
	ajustarCursor();
	embaralharImagens();
}	

function embaralharImagens() {
	i = 0;
	max = Math.floor(Math.random() * 150 + 100);
    while(i <= max) {
		i1 = Math.floor(Math.random() * 12); 
		i2 = Math.floor(Math.random() * 12);

		aux = imagens[i1];
		imagens[i1] = imagens[i2];
		imagens[i2] = aux;

		i++;
	}
}

function caixaClick(objeto) {
	var idDoContainer = objeto.id.slice(9,11)
	var imagemDaCaixa = imagens[idDoContainer]

	if(!caixasDesativadas[idDoContainer]  && imagensViradas.length < 2) {

		document.getElementById("carta" + idDoContainer).style.transform = "rotateY( 180deg )"
		document.getElementById("costa" + idDoContainer).style.backgroundImage = "url(img/" + imagemDaCaixa + ".jpg)";	

        if(imagensViradas.length == 0) {

			imagensViradas.push(imagemDaCaixa);
			caixasViradas.push(idDoContainer);	

			caixasDesativadas[caixasViradas[0]] = true;	
			ajustarCursor();  

		} else if(imagensViradas.length == 1) {

			imagensViradas.push(imagemDaCaixa);
			caixasViradas.push(idDoContainer);	

			caixasDesativadas[caixasViradas[1]] = true;	
			ajustarCursor()  

			if(imagensViradas[0] == imagensViradas[1]) {

				qtosCompletados += 2; // Aumenta 2 no número de cartas que foram completadas

				caixasDesativadas[caixasViradas[0]] = true; // Desativa as caixas que foram
				caixasDesativadas[caixasViradas[1]] = true; // completadas para que o usuário não 
				                                            // interaja mais com ela	  
				ajustarCursor();

				setTimeout(esconderImagens, 1000);

				if(qtosCompletados == 12) 
					setTimeout(fimDeJogo, 1500);
			

			} else {
				setTimeout(voltarImagensViradas, 1000);
			}	
		}
	}
}

function voltarImagensViradas() {
	document.getElementById("carta" + caixasViradas[0]).style.transform = "rotateY(0deg)";
	document.getElementById("carta" + caixasViradas[1]).style.transform = "rotateY(0deg)";;
	
	caixasDesativadas[caixasViradas[0]] = false;	
	caixasDesativadas[caixasViradas[1]] = false;	

	ajustarCursor();

	imagensViradas = [];
	caixasViradas  = [];

	atualizarPontuacao(pontuacaoErrar);
}

function esconderImagens() {
	document.getElementById("container" + caixasViradas[0]).style.opacity = '0';
	document.getElementById("container" + caixasViradas[1]).style.opacity = '0';
    
    atualizarPontuacao(pontuacaoAcertar);   
    
    setTimeout(ajustarEscondidas, 500);
    
    function ajustarEscondidas() {
        document.getElementById("carta" + caixasViradas[0]).style.transform = "rotateY(0deg)";
        document.getElementById("carta" + caixasViradas[1]).style.transform = "rotateY(0deg)";;

        imagensViradas = []; 
        caixasViradas  = [];
    }
}

function atualizarPontuacao(valor) {
	pontos += valor;
	document.getElementById("span-pontos").innerHTML = "Pontos: " + pontos;
}

function ajustarCursor() {
	for(i=0; i<caixasDesativadas.length; i++)
		if(caixasDesativadas[i])
			document.getElementById("container" + i).style.cursor = 'default';
		else
			document.getElementById("container" + i).style.cursor = 'pointer';
}

function fimDeJogo() {
	alert("Fim do jogo!");
	alert("Você fez " + pontos + " pontos");
    alert("Clique em reiniciar para jogar novamente!")
}
