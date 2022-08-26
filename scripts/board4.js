const leters = ["A", "B", "C", "D","E", "F", "G", "H"];
const coltype = ["wh1", "bl1"];
let lLen = leters.length;
var isDragging = false;
var map = new Array(64); 
var ChessStyle = 0;

$( function() {

	 start();

	$("div.figure");
	var delayInMilliseconds = 1000; //1 sec

	$("#b1").click(function(){
		$("div.square").fadeOut(400);
		$("div.square").fadeIn(400);
		setTimeout(() => { showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR'); }, 200);
	});
});

function setChessStyle0(){
	ChessStyle = 0;
	showFigures(map);
}

function setChessStyle1(){
	ChessStyle = 1;
	showFigures(map);
}

function start(){
	createBoard();
	//showFiguresPHP();
	showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
}


function setDropable(){
	$( ".square" ).droppable({
		drop: function(event, ui){
			var frCoord = ui.draggable.attr('id').substring(1);
			var toCoord = this.id.substring(1);
			moveFigure(frCoord,toCoord);
			isDragging = false;
		}
	});
}

function moveFigure(frCoord,toCoord){
	figure = map[frCoord] ;

	if(frCoord==toCoord){
		showFigureAt(frCoord, '1');
		showFigureAt(frCoord, figure);
		return;
	}


	if(!canMove(map[frCoord] ,map[toCoord])){
		showFigureAt(frCoord, '1');
		showFigureAt(frCoord, figure);
		return;
	}
	
	if(rules(figure,frCoord,toCoord)){
		showFigureAt(frCoord, '1');
	 	map[frCoord] = '1';
		showFigureAt(toCoord, figure);
	 	map[toCoord] = figure;
		return;
	}
	showFigureAt(frCoord, '1');
	showFigureAt(frCoord, figure);
	return;
	
}

function canMove(frFigure,toFigure){
if('Kk'.includes(toFigure)!== false)return false;
var frColor = getFColor(frFigure);
var toColor = getFColor(toFigure);
return frColor !== toColor;
}



function getFColor(fcolor){
if('RNBQKP'.includes(fcolor)!== false){return 'w';}
if('rnbqkp'.includes(fcolor)!== false){return 'b';}
if('1'.includes(fcolor)!== false){return 'e';}
return 'v';
}


function rules(figure,frCoord,toCoord){
	frCoord=parseInt(frCoord);
	toCoord=parseInt(toCoord);
	switch(figure){
		case'K': 
		case'k': 
		{
			if(AbsDeltaX(frCoord,toCoord)<=1 && AbsDeltaY(frCoord,toCoord)<=1){return true;}
			return false;
		}
		case'N':
		case'n':
		{
			if(AbsDeltaX(frCoord,toCoord)==1 && AbsDeltaY(frCoord,toCoord)==2){return true;}
			if(AbsDeltaX(frCoord,toCoord)==2 && AbsDeltaY(frCoord,toCoord)==1){return true;}
			return false;
		}

		case'Q':
		case'q':
		{
			return canMoveStraight(frCoord,toCoord);
		}

		case'R':
		case'r':
		{
			return (SignX(frCoord,toCoord) == 0 || SignY(frCoord,toCoord) == 0) && canMoveStraight(frCoord,toCoord);
		}

		case'B':
		case'b':
		{
			return SignX(frCoord,toCoord) != 0 && SignY(frCoord,toCoord) != 0 && canMoveStraight(frCoord,toCoord);
		}

		case'P':
		{
			if(AbsDeltaY(frCoord,toCoord)==1 && SignY(frCoord,toCoord)==1 && getFColor(map[toCoord])== 'e'){return true;}
			if(AbsDeltaX(frCoord,toCoord)==1
				&& AbsDeltaY(frCoord,toCoord)==1  
				&& SignY(frCoord,toCoord)==1 
				&& getFColor(map[toCoord])== 'b')
				{return true;} 
			return false;
		}

		case'p':
		{
			if(AbsDeltaY(frCoord,toCoord)==1 && SignY(frCoord,toCoord)==-1 && getFColor(map[toCoord])== 'e'){return true;}
			if(AbsDeltaX(frCoord,toCoord)==1
				&& AbsDeltaY(frCoord,toCoord)==1  
				&& SignY(frCoord,toCoord)==-1 
				&& getFColor(map[toCoord])== 'b')
				{return true;}
				return false; 
		}
		default: false;
	}}
function canMoveStraight(frCoord,toCoord){
	var tMoveX = getX(frCoord);
	var tMoveY = getY(frCoord);	
	var tToX = getX(toCoord);
	var tToY = getY(toCoord);	
	do{
		tMoveX = tMoveX - SignX(frCoord,toCoord);
		tMoveY = tMoveY - SignY(frCoord,toCoord);
		if(tMoveX == tToX && tMoveY == tToY){
			return true;
		}
	}while(onBoard(tMoveX,tMoveY) && getFColor(map[returnMapXY(tMoveX,tMoveY)])=='e'); 
	return false;
}

function onBoard(x,y){
	if (x>=1 && x<=8 && y>=1 && y<=8){
		return true;
	}
	return false;
}
function returnMapXY(x,y){return (y-1)*8+x-1;}
function getX(j){return j%8+1;}
function getY(j){return (Math.floor(j/8)+1);}

function DeltaX(frCoord,toCoord){return getX(frCoord)-getX(toCoord);}
function DeltaY(frCoord,toCoord){return getY(frCoord)-getY(toCoord);}

function AbsDeltaX(frCoord,toCoord){return Math.abs(DeltaX(frCoord,toCoord));}
function AbsDeltaY(frCoord,toCoord){return Math.abs(DeltaY(frCoord,toCoord));}

function SignX(frCoord,toCoord){return Math.sign(DeltaX(frCoord,toCoord));}
function SignY(frCoord,toCoord){return Math.sign(DeltaY(frCoord,toCoord));}



function createBoard(){
	let text ="<div class= \"board\">" ;

	for (let j = 0; j < 64; j++) {
		text += "<div id=c"+j+" class=\""+coloris(j)+" square\"></div>";  
	}
	text += "</div>";
	document.getElementById("board").innerHTML = text;
	setDropable();
}


function coloris(j){return coltype[(j%8 + Math.floor(j/8))%2];}

function squarename(j){return (leters[j%8]+(Math.floor(j/8)+1));}

function showFigureAt(coord, figure){
	//if(map[coord]==figure) {return;}
	map[coord] = figure;
	let divfigure = "<div id=f"+coord+" class=\"figure\">"+getChessSymbole(figure)+"</div>";
	document.getElementById("c"+coord).innerHTML = divfigure;
	setDraggable();
}

function getChessSymbole(figure) {
	if(ChessStyle ==0){return ChessStyle0(figure);}
	if(ChessStyle ==1){return ChessStyle1(figure);}
	return ChessStyle0(figure);
}


function ChessStyle0(figure){
	switch(figure){
		case'K': return '&#9812';
		case'Q': return '&#9813';
		case'R': return '&#9814';
		case'B': return '&#9815';
		case'N': return '&#9816';
		case'P': return '&#9817';

		case'k': return '&#9818';
		case'q': return '&#9819';
		case'r': return '&#9820';
		case'b': return '&#9821';
		case'n': return '&#9822';
		case'p': return '&#9823';

		default: return ' ';
	}
}

function ChessStyle1(figure){
	switch(figure){
		case'K': return '<i class="fa-regular fa-chess-king"></i>';
		case'Q': return '<i class="fa-regular fa-chess-queen"></i>';
		case'R': return '<i class="fa-regular fa-chess-rook"></i>';
		case'B': return '<i class="fa-regular fa-chess-bishop"></i>';
		case'N': return '<i class="fa-regular fa-chess-knight"></i>';
		case'P': return '<i class="fa-regular fa-chess-pawn"></i>';

		case'k': return '<i class="fa-solid fa-chess-king"></i>';
		case'q': return '<i class="fa-solid fa-chess-queen"></i>';
		case'r': return '<i class="fa-solid fa-chess-rook"></i>';
		case'b': return '<i class="fa-solid fa-chess-bishop"></i>';
		case'n': return '<i class="fa-solid fa-chess-knight"></i>';
		case'p': return '<i class="fa-solid fa-chess-pawn"></i>';

		default: return ' ';
	}
}


function setDraggable(){
	$( ".figure" ).draggable({
		start: function (event, ui){
			isDragging = true;

		}

	});	
 }

function showFigures(figures) {
	for (let coord = 0; coord < 64; coord++) {
		showFigureAt(coord, figures[coord]);
	}
 }

function showFiguresPHP(){
	if(isDragging) return;
	$.get('chess.php?getFigures', showFigures)
}