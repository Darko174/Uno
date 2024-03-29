const buttonStartGame = document.querySelector(".start");
const playerCards = document.querySelector(".playerCards");
const enemyCards = document.querySelector(".enemyCards");
const actionArea = document.querySelector(".actionArea");

class Game {
    //Создаем колоду
    constructor(cards) {
        this.cards = this.shuffle(cards);

    }
    //Перемешиваем колоду
    shuffle(array) {
        for (let i = 0; i < 500; i++) {
            array.sort(() => Math.random() - 0.5);
        }
        return array
    }
    //Рендерим карточку
    createCard(target, cardInfo) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.number = cardInfo.number;
        card.letter = cardInfo.letter;
        card.t = cardInfo.text;
        if (target == playerCards) {
            card.style.backgroundImage = `url(${cardInfo.imgUrl})`;
        }
        else {
            card.style.background = "linear-gradient(#c6e4ee 0%, #c6e4ee 40%, #fed1ae 60%, #faa0b9 70%, #cb7dcb 80%, #757ecb 100%)";
            card.bottomImage = `url(${cardInfo.imgUrl})`;
        }
        target.appendChild(card);
    }
    renderCards(target, array) {
        array.forEach(i => this.createCard(target, i))
    }
}
class Player {
    //Создаем игрока
    constructor(array) {
        this.cards = this.getCards(array);
    }
    //Распределяем карты для игроков
    getCards(array) {                                                                   /////!!!!!
        const playerCards = [];
        const enemyCards = [];
        for (let i = 0; i < 7; i++) {
            console.log(playerCards.push(array.pop()), "Первому");

            console.log(enemyCards.push(array.pop()), "Второму");
        }
        return {
            firstPlayer: playerCards,
            secondPlayer: enemyCards
        }
    }
}
//Колода
const newGame = new Game(database.cards);
//Массивы с картами игроков
const player = new Player(newGame.cards).cards;
const firstPlayer = player.firstPlayer;
const secondPlayer = player.secondPlayer;
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
function gameOver() {
    playerCards.childNodes.length ? true : alert("You WIN! =)");
    
}
//ИИ
function artificialIntelligence() {
    const aiCards = Array.from(enemyCards.childNodes);
    const cardInTable = actionArea.querySelector(".card");
    const sortedCardsByNumber = aiCards.map(i => i).sort((a, b) => a.number - b.number);
    let noCard = true;
    if (playerCards.childNodes.length) {
        for (let i of sortedCardsByNumber) {
            if (i.number == cardInTable.number || i.letter == cardInTable.letter) {
                setTimeout(() => {
                    i.style.background = "";
                    i.style.backgroundImage = i.bottomImage;
                    i.classList.add("a");
                    actionArea.innerHTML = "";
                    actionArea.appendChild(i);

                }, 2000);
                noCard = false;
                break
            }
        }
        if (noCard) {
            addCard(secondPlayer, newGame.cards);
            newGame.createCard(enemyCards, secondPlayer[secondPlayer.length - 1]);
        }
    }
    setTimeout(() => {
        enemyCards.childNodes.length ? true : alert("You Lose! =(");
    },2500)
}
document.addEventListener("click", e => {
    const target = e.target;
    const cardInTable = actionArea.querySelector(".card");

    //Кладем карту на стол
    if (target.closest(".card")) {
        if (!cardInTable || target.number == cardInTable.number || target.letter == cardInTable.letter) {
            action(target);
            ////
            newGame.shuffle(newGame.cards);
            console.log(newGame.cards);
            ////
            artificialIntelligence();
            gameOver();
        }
    }
    if (target.closest(".cardsStorage")) {
        addCard(firstPlayer, newGame.cards);
        newGame.createCard(playerCards, firstPlayer[firstPlayer.length - 1]);
        ////
        newGame.shuffle(newGame.cards);
        console.log(newGame.cards);
        ////
        artificialIntelligence();
    }
})
buttonStartGame.addEventListener("click", init);

