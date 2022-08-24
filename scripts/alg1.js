let N = 20;
let M = 20;
let i=0;
let j=0;
let roadLenght =  Array(N*M).fill(Infinity); 
let wayFar = Array(N*M).fill(Infinity);

var  map = [];

for(i = 0; i < N; i++){
	map[i] = [];
	for (j = 0; j < M; j++) {
		map[i][j] = M*i+j +1;
	}
}

shuffleX (map);
shuffleY (map);
ShowMap(map,"p1",false);

document.getElementById("p2").innerHTML = mainFun(map);

function shuffleX(ddmap){
	for(var k = 0; k < N; k++){
		i = M;
			while(i--){
				j = Math.floor( Math.random() * ( i + 1 ) );
				var tempi = ddmap[k][i];
				ddmap[k][i] = ddmap[k][j];
				ddmap[k][j] = tempi;
			}
	}
	return ddmap;
}
		
function shuffleY(ddmap){
	for(var k = 0; k < M; k++){
		i = N;
		while(i--){
			j = Math.floor( Math.random() * ( i + 1 ) );
			var tempi = ddmap[i][k];
			ddmap[i][k] = ddmap[j][k];
			ddmap[j][k] = tempi;
		}
	}
	return ddmap;
	}

function ShowMap(map,where,arr){
	let  text = '<table>';
	for (i = 0; i < N; i++) {
		text += '<tr>';
		for (j = 0; j < M; j++) {
			if(arr){
				text += '<td>'+ map[M*i+j] +' </td>';
			}
			else{
				text += '<td>'+ map[i][j] +' </td>';	
			}
		}
		text += '</tr>';
	}
	text += '</table>'
	document.getElementById(where).innerHTML = text;
}

function mainFun(map){
	i=0;
	j=0;
	let current = 0;
	let goal = N*M-1;
	wayFar[0] = map[0][0]; 

	while(current != goal){
		if ((i+1)<N){
			roadLenght[current+M] = wayFar[current] + map[i+1][j];
			makeStep(current+M);
		}

		if ((j+1)<M){
			roadLenght[current+1] = wayFar[current]+ map[i][j+1];
			makeStep(current+1);
		}

		roadLenght[current] = Infinity;
		current = roadLenght.indexOf( Math.min(...roadLenght) );
		i = Math.floor(current/M);
		j = current%M;
	}

	ShowMap(wayFar,"p3",true);
	return wayFar[goal];
}

function makeStep(temp){
	if (wayFar[temp]>roadLenght[temp]){
		wayFar[temp] = roadLenght[temp];
	}
	else{
		roadLenght[temp] = wayFar[temp];
	}
}