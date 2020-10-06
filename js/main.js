const buttonStartGame = document.querySelector(".start");
const playerCards = document.querySelector(".playerCards");
const enemyCards = document.querySelector(".enemyCards");
const actionArea = document.querySelector(".actionArea");

const gameInfo = {
    firstPlayer: {
        gameOver: false,
        quantityMoves: 1,
        active: true
    },
    secondPlayer:{
        gameOver: false,
        quantityMoves: 1,
        active: true
    }
}

class Game{
    //Создаем колоду
    constructor(cards){
        this.cards = this.shuffle(cards);
    }
    //Перемешиваем колоду
    shuffle(array){
        return array.sort(() => Math.random() - 0.5);
    }
    //Рендерим карточку
    createCard(target, cardInfo){
        const card = document.createElement("div");
        card.classList.add("card");
        card.number = cardInfo.number;
        card.letter = cardInfo.letter;
        card.t = cardInfo.text;
        card.style.backgroundImage = `url(${cardInfo.imgUrl})`;
        target.appendChild(card);
    }
    renderCards(target, array) {
        array.forEach(i => this.createCard(target, i))
    }
}
class Player{
    //Создаем игрока
    constructor(array){
        this.playerCards = this.getCards(array);
    }
    //Распределяем карты для игроков
    getCards(array){
        const playerCards = [];
        for(let i = 0; i < 7; i++) {
            playerCards.push(array.pop());
        }
        return playerCards
    }
}
//Колода
const newGame = new Game(database.cards);
//Массивы с картами игроков
const firstPlayer = new Player(newGame.cards).playerCards;
const secondPlayer = new Player(newGame.cards).playerCards;
newGame.renderCards(playerCards, firstPlayer);
newGame.renderCards(enemyCards, secondPlayer);

//Перенос карты с руки игрока на стол
function action(target) {
    target.classList.add("a");
    actionArea.innerHTML = "";
    actionArea.appendChild(target);
}
//Добавить карту в массив игрока(игрок, колода)
function addCard(player, deck) {
    player.push(deck.pop());
}
//Страрт игры
function init() {
    buttonStartGame.classList.toggle("hide");

}
//ИИ
function artificialIntelligence() {
    const aiCards = Array.from(enemyCards.childNodes);
    const cardInTable = actionArea.querySelector(".card");
    const sortedCardsByNumber = aiCards.map(i => i).sort((a,b) => a.number - b.number);
    let a = true;

    for(let i of sortedCardsByNumber) {
        if(i.number == cardInTable.number || i.letter == cardInTable.letter) {
            setTimeout(() => {
                i.classList.add("a");
                actionArea.innerHTML = "";
                actionArea.appendChild(i);
            }, 2000);
            a = false;
            break
        }
    }
    if(a) {
        addCard(secondPlayer, newGame.cards);
        newGame.createCard(enemyCards, secondPlayer[secondPlayer.length - 1]); 
    }
}
document.addEventListener("click", e => {
    const target = e.target;
    const cardInTable = actionArea.querySelector(".card");

    //Кладем карту на стол
    if(target.closest(".card")) {
        if(!cardInTable || target.number == cardInTable.number || target.letter == cardInTable.letter) {
            action(target);
            ////
            newGame.shuffle(newGame.cards);
            console.log(newGame.cards);
            ////
            artificialIntelligence();
        }
    }
    if(target.closest(".cardsStorage")) {
            addCard(firstPlayer,newGame.cards);
            newGame.createCard(playerCards, firstPlayer[firstPlayer.length - 1]);
            ////
            newGame.shuffle(newGame.cards);
            console.log(newGame.cards);
            ////
            artificialIntelligence();
    }
})
buttonStartGame.addEventListener("click", init);

