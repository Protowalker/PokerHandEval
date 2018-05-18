var suits = Object.freeze(["clubs","spades", "diamonds","hearts"]);


$(window).ready(function(){
	$("#cards")[0].addEventListener('load', generateDeck);
});

function generateDeck(){
	var svgDoc = $("#cards")[0].getSVGDocument();
	for(var i = 0; i < 4; i++){
		var list = document.getElementById("list-" + suits[i]);
		for(var j = 2; j <= 14; j++){
			var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

			var cardNodes = Array.from(svgDoc.querySelector("#" + suits[i][0] + j).children);

			for(var k = 0; k < cardNodes.length; k++){
				svg.append(cardNodes[k]);
			}

			svg.setAttribute("viewBox", "0.5 512.86218 359 539");
			svg.setAttribute("width", "35.9px")
			svg.setAttribute("height", "53.9px")
			svg.setAttribute("id", suits[i][0] + j);


			svg.addEventListener("click", moveCard);

			list.append(svg);
		}
	}
}

function moveCard(cardSVG) {
	var svg = cardSVG.target.parentNode;
	if(svg.parentNode.id.startsWith("list-") && document.getElementById("current-hand").children.length < 5){
		svg.setAttribute("viewBox", "0.5 512.86218 359 539");
		svg.setAttribute("width", "200px")
		svg.setAttribute("height", "300px")
		document.getElementById("current-hand").append(svg);
		currentHand.push(new Card(suits.indexOf(suits.find( s => s.startsWith(svg.id[0]))), svg.id.substring(1)));
	} else if(svg.parentNode.id == "current-hand"){
		svg.setAttribute("viewBox", "0.5 512.86218 359 539");
			svg.setAttribute("width", "35.9px")
			svg.setAttribute("height", "53.9px")
		document.getElementById("list-" + suits.find( s => s.startsWith(svg.id[0]))).append(svg);
	}
}

// <svg inkscape:label="#use12389" id="d14" viewBox="-.5 512.86218 359 539" width="35.9px">
//       <rect rx="29.944447" ry="29.944447" y="512.86218" x="0.5" height="539" width="359" id="rect12812" style="fill:#ffffff;stroke:#000000;stroke-width:0.99999976" class=""></rect>
//       <path sodipodi:nodetypes="czczczczc" inkscape:connector-curvature="0" id="path12814" d="m 180,737.36218 c 0,0 6,15 13,25 7,10 17,20 17,20 0,0 -10,10 -17,20 -7,10 -13,25 -13,25 0,0 -6,-15 -13,-25 -7,-10 -17,-20 -17,-20 0,0 10,-10 17,-20 7,-10 13,-25 13,-25" style="fill:#ff5555;stroke:none"></path>
//       <path inkscape:connector-curvature="0" id="path12816" d="m 27.5,542.36218 -9,50 5,0 2.34375,-13 8.3125,0 2.34375,13 5,0 -9,-50 -5,0 z m 2.5,13.90625 3.25,18.09375 -6.5,0 3.25,-18.09375 z" style="fill:#ff5555;stroke:none"></path>
//       <path inkscape:connector-curvature="0" id="path12818" d="m 327.5,1022.3622 -9,-50.00004 5,0 2.34375,13 8.3125,0 2.34375,-13 5,0 -9,50.00004 -5,0 z m 2.5,-13.9063 3.25,-18.09372 -6.5,0 3.25,18.09372 z" style="fill:#ff5555;stroke:none"></path>
//       <path sodipodi:nodetypes="czczczczc" inkscape:connector-curvature="0" id="path12820" d="m 30,602.36218 c 0,0 3,7.5 6.5,12.5 3.5,5 8.5,10 8.5,10 0,0 -5,5 -8.5,10 -3.5,5 -6.5,12.5 -6.5,12.5 0,0 -3,-7.5 -6.5,-12.5 -3.5,-5 -8.5,-10 -8.5,-10 0,0 5,-5 8.5,-10 3.5,-5 6.5,-12.5 6.5,-12.5" style="fill:#ff5555;stroke:none"></path>
//       <path sodipodi:nodetypes="czczczczc" inkscape:connector-curvature="0" id="path12822" d="m 330,917.36218 c 0,0 3,7.5 6.5,12.5 3.5,5 8.5,10 8.5,10 0,0 -5,5 -8.5,10 -3.5,5 -6.5,12.5 -6.5,12.5 0,0 -3,-7.5 -6.5,-12.5 -3.5,-5 -8.5,-10 -8.5,-10 0,0 5,-5 8.5,-10 3.5,-5 6.5,-12.5 6.5,-12.5" style="fill:#ff5555;stroke:none"></path>
//     </svg>