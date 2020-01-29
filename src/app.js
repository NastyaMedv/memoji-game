const  ICONS = ['🦄','🐶','🐭','🐱','🐱','🐭','🐟','🐹','🦄','🐶','🐟','🐹'];
const TOTALCARDS = 12;
const GAMETIME = 60;
var gameBoard, game, timer, time, timer;

class Card {
    constructor(element,content,id) {
        this._el = element;
        this._disabled = false;
        this.content = content;
        this._el.children[1].innerText = content;
        this._el.id = id;
    }

    open() {
        this._el.classList.add('open-card');
        this._el.classList.remove('close-card');
        this._disabled = true;
    }

    isRight() {
        this._el.classList.add('right');
    }

    isWrong() {
        this._el.classList.add('wrong');
    }

    close() {
        if (this._el.classList.contains('open-card')) {
            this._el.classList.add('close-card');
            this._el.classList.remove('open-card');
        }
        this._el.classList.remove('wrong');
        this._el.classList.remove('right');
        this._disabled = false;
    }

    clear() {
        this.close();
        this._el.removeAttribute('id');
        this._el.children[1].innerText = '';
    }

    isDisabled() {
        return this._disabled;
    }
}

class Game {
    constructor() {
        this.cards = [];
        this.currentOpen = [];
        this.openCards = 0;
    }

    addCard(element,content) {
        let id = this.cards.length;
        let card = new Card(element,content,id);
        this.cards.push(card);
    }

    match(card1,card2) {
        return (card1.content == card2.content) ? true : false;
    }

    checkWin() {
        return (this.openCards == TOTALCARDS) ? true : false;
    }

    click(index) {
        let card = this.cards[index];
        if (card.isDisabled()) return;
        card.open();

        switch (this.currentOpen.length) {
            case 0:
                this.currentOpen.push(card);
                break;
            case 1:
                if (this.match(card,this.currentOpen[0])) {
                    card.isRight();
                    this.currentOpen[0].isRight();
                    this.openCards += 2;
                    this.currentOpen.length = 0;
                } else {
                    card.isWrong();
                    this.currentOpen[0].isWrong();
                    this.currentOpen.push(card);
                }
                break;
            case 2:
                this.currentOpen[0].close();
                this.currentOpen[1].close();
                this.currentOpen.length = 0;
                this.currentOpen.push(card);
                break;
            default: throw new Error('Smth is wrong');
        }

        if (this.checkWin())
            setTimeout(playerWins,300);
    }

    clearCards() {
        this.cards.forEach(card => card.clear());
    }
}

// class Timer {
//     constructor() {
//         this.time = 60;console.log(this.time);
//     }
//
//     start() {
//         window.setTimeout(this.timer,1000);
//     }
//
//     timer() {
//         this.time--;console.log(this.time);
//         if (this.time == 0) {
//             console.log('loose');
//         } else {
//             window.setTimeout(this.timer,1000);
//         }
//     }
// }

function startApp({gameField}) {
    gameBoard =  document.getElementById(gameField);
    startGame();
    gameBoard.addEventListener('click', function(e) {
        let parent = e.target.parentNode;
        if (parent.classList.contains('card')) {
            game.click(parent.id);
        }
    });
}

function startGame() {
    ICONS.sort(() =>  Math.random() - Math.random());
    game = new Game();
    time = GAMETIME;
    timer = setInterval(function() {
        time--;console.log(time);
        if (time == 0) {
            clearInterval(timer);
            playerLoses();
        }
    },1000);

    for (let i = 0; i<gameBoard.children.length; i++) {
        game.addCard(gameBoard.children[i],ICONS[i]);
    }
}

function playerWins() {
    alert('You won!');
    game.clearCards();
    startGame();
}

function playerLoses() {
    alert('You lose');
    game.clearCards();
    startGame();
}
