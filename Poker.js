var hands = [];
var currentHand = [];

var possibleRanks = ["High Card","Pair","Two Pair","Three Of a Kind","Straight","Flush","Full House","Four Of A Kind","Straight Flush","Royal Flush"];
Object.freeze(possibleRanks);

function OnAddHand(){
	hands.push(currentHand);
	currentHand = [];
}

function OnAddCard(card){
	currentHand.push(card);
}

function OnRemoveCard(card){
	currentHand.splice(currentHand.indexOf(card), 1);
}

function OnRemoveHand(hand){
	hands.splice(hands.indexOf(hand), 1);
}

//returns a number 0-9. 1 is high card, 9 is royal flush.
function EvaluateHand(hand){
	//sort cards by their suit for later tests.
	var suitSorted = [[],[],[],[]];
	for(var i = 0; i < hand.length; i++){
		console.log(hand[i].suit);
		suitSorted[hand[i].suit].push(hand[i]); //push cards to correct suit array (0 = spade, 1=diamond, 2=club, 3=heart)
	}
	//sort cards by rank. indexed 2-14, each index is the number of cards with that rank.
	var rankCounts = [];
	for(var i = 0; i < hand.length; i++){
		if(rankCounts[hand[i].rank] == undefined){ //if the index is null, set it to 0
			rankCounts[hand[i].rank] = 0;
		}
		rankCounts[hand[i].rank] += 1;
	}

	var sortedHand = hand.sort((a,b) => a.rank - b.rank); //The hand, sorted by rank
	var straight = true; //true by default because it only needs to be wrong once to be ruined.
	for(var i = 1; i < sortedHand.length; i++){
		if(sortedHand[i].rank != sortedHand[i-1].rank + 1)
		{
			straight = false;
			break;
		}
	}
	//test to see if it's a flush
	if(suitSorted.some(c => c.length == 5)){
		

		//testing to see if it is a straight flush. 
		if(straight){
			if(sortedHand[0].rank == 10){ //if it's straight then check for royal flush. First card has to start on 10.
				return {value: 9, high_card: 10};
			} else{ //otherwise it's just a non-royal straight
				return {value: 8, high_card: sortedHand[3]};
			} 
		} 
		else {
			return {value: 5, high_card: sortedHand[3]};//flush, but not straight flush
		}
	} 

	//if not flush, check for four of a kind
	else if(rankCounts.some(c => c == 4)){
		//var fourOfKind = rankCounts.find(c => c == 4);
		return {value: 7, high_card: rankCounts.find(c => c == 4)}; //four of a kind. No other logic needed
	} else if(straight){
		return {value: 4, high_card: sortedHand[3]}; //straight
	}

	//pairs and three of kinds
	var pairs = rankCounts.filter(c => c == 2);
	var threeOfKind = rankCounts.find(c => c == 3);
	//first, check for a pair.
	if(pairs!= null && pairs.length == 1){

		//then check for a 3 of a kind.
		if(threeOfKind){
			//if there's a three of a kind and a pair, it's a full house.
			return {value: 6, high_card: threeOfKind[3]};
		} else {
			//since there's only one pair, it can't be two pairs. return pair.
			return {value: 1, high_card: pairs[3]};
		}
	} else if(pairs!= null && pairs.length == 2){
		//two pair.
		return {value: 2, high_card: pairs[1]}; //since the second pair is going to have a higher value, this grabs that one.
	} else {
		//high card.
		return {value: 0, high_card: sortedHand[3]};
	}
}


function FindWinningHand(hands){
	var sortedHands = hands.sort(function(x,y){
		var delta = EvaluateHand(y.hand).value - EvaluateHand(x.hand).value;
		if(delta < 0) return -1;
		else if(delta > 0) return 1;
		else if(delta == 0){
			let tieBreaker = EvaluateHand(y.hand).high_card.rank - EvaluateHand(x.hand).high_card.rank;
			if(tieBreaker < 0) return - 1;
			else if(tieBreaker > 0) return 1;
			else return Math.random(0,1) ? -1 : 1;
		}
	});

	return sortedHands;
}


$(window).ready(function(){
	$("#add-hand").submit(function(e){
		e.preventDefault();

		hands.push({hand: currentHand, label: $("#hand-label")[0].value, eval: 0});
		currentHand = [];

		for(var i = 0; i < 4; i++){
			var list = document.getElementById("list-" + suits[i]);
			for(var j = 2; j <= 14; j++){
				list.append(document.getElementById(suits[i][0] + j));
			}
		}

	});
});


