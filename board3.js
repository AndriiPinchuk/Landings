const leters = ["A", "B", "C", "D","E", "F", "G", "H"];
const coltype = ["wh1", "bl1"];
let lLen = leters.length;
var isDragging = false;
	
$( function() {






	 start();
     $("div.figure");
     var delayInMilliseconds = 1000; //1 second

     $("#b1").click(function(){
			$("div.square").fadeOut(400);
			$("div.square").fadeIn(400);
			setTimeout(() => { showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR'); }, 200);
			//showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
		});
});


function start(){
	map = new Array(64); 
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
	showFigureAt(frCoord, '1');
	showFigureAt(toCoord, figure);
	
}



function createBoard(){
	let text ="<div class= \"board\">" ;

	

	for (let j = 0; j < 64; j++) {

		text += "<div id=c"+j+" class=\""+coloris(j)+" square\"></div>";  
	}
	text += "</div>";
	document.getElementById("board").innerHTML = text;
	setDropable();
}


function coloris(j) {
	return coltype[(j%8 + Math.floor(j/8))%2];
 }

function squarename(j) {
	return (leters[j%8]+(Math.floor(j/8)+1));
 }

function showFigureAt(coord, figure){
	if(map[coord]==figure) return;
	map[coord] = figure;
	let divfigure = "<div id=f"+coord+" class=\"figure\">"+getChessSymbole(figure)+"</div>";
	document.getElementById("c"+coord).innerHTML = divfigure;
	setDraggable();
}

function getChessSymbole(figure) {
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