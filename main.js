
const tileContainer = document.querySelectorAll(".tiles")

const tileContainerAll = document.querySelectorAll(".tiles")
const colors = ["aqua", "aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"];

const imgs = ["url('Assets/img/IMG1.jpg","url('Assets/img/IMG2.gif","url('Assets/img/IMG3.jpg","url('Assets/img/IMG4.jpg","url('Assets/img/IMG5.jpg",
"url('Assets/img/IMG6.jpg","url('Assets/img/IMG7.jpg","url('Assets/img/IMG8.jpg"]
var scores = document.querySelector('#scores')
var currentScreen;
const colorsPicklist = [...colors, ... colors]

var imgPicklist = [...imgs,...imgs]

const tileCount = colorsPicklist.length;
const tileCountImg = imgPicklist.length;

console.log(tileContainerAll)

let revealCount = 0;
let activeTile = null;
let awaitingEndOfMove = false;

class Player {
    constructor(id) {
      this.id = id;
      this.score = 0;
      this.time = 0;
      this.streak = false;
    }
    addPoints(points) {
        if(this.streak==true){
            this.score += (points+1)
            return
        }
        this.score += points;
      
    }

    removePoints(points){
        if(this.score>0){
        this.score -= 1;
        }
        return
    }

    reset(){
        this.score = 0;
        this.time = 0;
        this.streak = false;
    }
  

  }

const player1 = new Player('Player01');
const player2 = new Player('Player02');
console.log(player1.id)
function buildTile(color){
    const element = document.createElement("div");

    element.classList.add("tile");
    element.setAttribute("data-img", color);

    element.addEventListener("click", () =>{
        return clicked(color,element)
       
}

)
    return element

}

var player1Time = true;
var player2Time = false
function clicked(color,element){
    console.log("1"+player1Time+ "2" + player2Time)

    if(awaitingEndOfMove){
        return
    }

    element.style.backgroundImage = color;
    element.classList.toggle("rotated");

    if(!activeTile){
        activeTile = element

        return;
    }

    const colorToMatch = activeTile.getAttribute("data-img")

    if(colorToMatch === color){
        activeTile = null
        awaitingEndOfMove = false

        if(player1Time==true){
            console.log("1time")
            points(player1)
        }else if(player2Time==true){
            
            console.log("2time")
            points(player2)
        } 
        if(revealCount === tileCount){
            console.log("you win!")

        }
        console.log("PLAYER 1: " +player1.score +" PLAYER 2: " + player2.score )
        return
    }
    player1Time = false
    player2Time = true
    awaitingEndOfMove = true
    console.log(awaitingEndOfMove)
    setTimeout(() =>{
        element.style.background = null
        activeTile.style.background = null
        activeTile.classList.remove("rotated")
        element.classList.remove("rotated")

        awaitingEndOfMove = false
        activeTile = null
    },1000);

    console.log(activeTile)



return element;
}

function points(player){
    console.log(player.id)
    player.score += 2;
    scores.textContent = player.score
}

function startGame(quantidadePlayers){
    for (let i = 0; i<tileCountImg; i++){
        const randomIndex = Math.floor(Math.random() * imgPicklist.length);
        const img = imgPicklist[randomIndex]
        const tile = buildTile(img);
        imgPicklist.splice(randomIndex, 1);
    
        
        tileContainer[quantidadePlayers-1].appendChild(tile)
    
        console.log(img)
       
    
    }

}

function reset(){
    console.log("Clicado Reset")

    var tiles = document.querySelectorAll(".tiles .tile");
    for (var i = 0; i < tiles.length; i++) {
      tiles[i].remove();
    }

    imgPicklist = [...imgs,...imgs]


    for (let i = 0; i<tileCountImg; i++){
        const randomIndex = Math.floor(Math.random() * imgPicklist.length);
        const img = imgPicklist[randomIndex]
        const tile = buildTile(img);
        imgPicklist.splice(randomIndex, 1);
    
        tileContainer[currentScreen-1].appendChild(tile)
    
        console.log(img)
       
    
    }

}

function revealAllCards(){
    var elementos = document.querySelectorAll(".tiles .tile");
    elementos.forEach(function(elemento) {
        elemento.style.backgroundImage = elemento.getAttribute('data-img');
        elemento.classList.toggle("rotated")
        console.log("Evento ocorreu no elemento: " + elemento.getAttribute('data-img'));
        // Lógica adicional aqui
      });

      setTimeout(() => {
        elementos.forEach(function(elemento) {
            elemento.classList.remove("rotated")
            elemento.style.backgroundImage = null;
            console.log("a")     })
      }, 2000);


}


function gameStartP1(){
    currentScreen = 1
    startGame(1)
    var menu = document.querySelector('.menu')
    var screenP1 = document.querySelector('.screenP1')

    screenP1.style.display = 'flex'
    menu.style.display = 'none'

    console.log("a")
    console.log(screenP1)
    console.log(menu)
} 


function voltarMenu(){
    var tiles = document.querySelectorAll(".tiles .tile");
    tiles.forEach(tile => tile.remove());


    imgPicklist = [...imgs,...imgs]

    currentScreen = null
    var screenP2 = document.querySelector('.screenP2')

    var menu = document.querySelector('.menu')
    var screenP1 = document.querySelector('.screenP1')

    screenP1.style.display = 'none'
    screenP2.style.display = 'none'
    menu.style.display = 'flex'

    console.log("a")
    console.log(screenP1)
    console.log(menu)

}

function gameStartP2(){
    currentScreen = 2
    startGame(2)
    var menu = document.querySelector('.menu')
    var screenP2 = document.querySelector('.screenP2')
    

    screenP2.style.display = 'flex'
    menu.style.display = 'none'

    console.log("a")
    console.log(screenP2)
    console.log(menu)

}