var cards = []; //array of card objects
var value;

function Hand(cards){
	this.cards = cards;
}

Hand.prototype.AddCard = function(card){
	this.cards.push(card);
}