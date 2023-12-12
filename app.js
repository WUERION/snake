//* HTML elements
const board = document.getElementById('board')
const scoreBoard = document.getElementById('scoreBoard')
const startButton = document.getElementById('start')
const gameOverSing = document.getElementById('gameOver')

// * Game setings
const boardSize = 10 //* el size del tablero
const gameSpeed = 100//* la velozidad del juego 
const squareTypes = { //* los tipos de cuadrados del juego lo utilizaremos para setear los valores del juego a medimda que avanza el juego
    emptySquare: 0,
    snakeSquare: 1,
    foodSquare: 2
}
const directions = {//* seteamos las diserciones para mover a la serpiente
    ArrowUp: -10,//* mueve hacia arriba 10 lugares
    ArrowDown: 10,//* mueve hacia abajo 10 lugares
    ArrowRight: 1,//* mueve hacia la derecha 1 lugar
    ArrowLeft: -1//* mueve hacia la izquierda 1 lugar
}

//*Game variables
let snake //? crearemos una array donde almacenamos los valores que esta ocupando
let score //? score del usuario
let direction //? las didreciones que el usuario se va a mover  
let boardSquares //? crearemos un array donde lamacenamos los valores del tablero
let emptySquares //? guardaremos los lugares vacios del tablero 
let moveInterval //? crearemos un intervalo de tiempo para poder mover la serpiente


const drawSnake = () => {
    snake.forEach(square => drawSquare(square, 'snakeSquare'));
}


//* Rellena cada cuadrado del tablero
//* @params
//* square posicion del cuadrado
//* type tipo de cuadrado [emptySquare, snakeSquare, foodSquare]
//* la funcion recibe como parametros square y type le indicamos que tipo de cuadrado tienen que pinta si emptySquare, snakeSquare o foodSquare
const drawSquare = (square, type) => {//* creamos la funcion para pintar a la serpiente en el tablero
    const [row, column] = square.split('')//* utilizamos el metodo split para dividir la array 
    boardSquares[row][column] = squareTypes[type]//* pintamos el tipo de cuadrado indicado por la funcion
    const squareElement = document.getElementById(square)
    squareElement.setAttribute('class', `square ${type}`)//* seteamos la clase y el ipo a square

    //* creamo la if para crear un emptySquare o eliminamos un emptySquare 
    if (type === 'emptySquare') {//* creamos un if para crear un emptySquare si es lo que deciamos 
        emptySquares.push(square)//* accedemos al array de emptySquares y le agregamos el square donde quedo un lugar vacio
    } else {//* si no es un emptySquare nesecitamos sacar ese elemento de el array
        if (emptySquares.indexOf(square) !== -1) {//* preguntamos is emptySquare ya tiene ese elemento 
            emptySquares.splice(emptySquares.indexOf(square), 1)//* si existe ese elemento lo sacamos con el metodo .splice el 1 es que solo sacamos uno
        }
    }
}


const moveSnake = () => {//* creamos la funcion para hacer el intervalo de movimiento de la snake
    const newSquare = String(//* creamos un nuevo square que es un string
        Number(snake[snake.length - 1]) + directions[direction])
        .padStart(2, '0')//*tomamos el ultimo square de la snake consnake.lenght - 1 y se lo sumamos al valor que le coresponda a la direction si va a la drecha su valor es 1 y le sumamos el un valor ahora es 2 y si va para arriba su valor es -10 le sumamos el valor ahora es -11
    const [row, column] = newSquare.split('')

    if (newSquare < 0 ||//* si el newSquare es igual a 0 choco con la parte de arriba
        newSquare > boardSize * boardSize ||//* se salio del board o choco con la parte de abajo
        (direction === 'ArrowRight' && column == 0) ||//* si la derecha y columna es igual a 0  se choco con la parte de derecha
        (direction === 'ArrowLeft' && column == 9 ||//* si la derecha y columan es igual a 9 se choco co la izquierda
            boardSquares[row][column] === squareTypes.snakeSquare)) {//* si la square esta o cupado por un squareSnake significa que choco con sigo misma
        gameOver()//* llamamos a la funcion gameOver 
    } else {
        snake.push(newSquare)
        if (boardSquares[row][column] === squareTypes.foodSquare) {//* pregunatmos si en el array hay un foodSquare crece la snake
            addFood()//* llamamos a la funcion addFood que agregara el square a la snake
        } else {
            const emptySquare = snake.shift()//* eliminamos el ultimo square
            drawSquare(emptySquare, 'emptySquare')//* vovemos a pintar el square donde la snake se movio
        }
        drawSnake()//* pintamos nuevamente la snake para que se mueva
    }
}


const addFood = () => {//* creamos la funcion para hacer crecer a la snake
    score++;//* aumentamos el score en uno
    updateScore()//* actualizamos el score
    createRandomFood()//*generamos un nuevo squareFood
}


const gameOver = () => {//* creamo la funcion para mostrar el game over
    gameOverSing.style.display = 'block'//* le aplicamos el estilo dsipla block para que se vea
    clearInterval(moveInterval)//* paramos el intervalo para que la snake no se mueva
    startButton.disabled = false//* volbemos a abilitar el startButton para poder inicial nuevamente

}


const setDirection = newDirection => {//* creamos la funcion para setear la direction de la snake 
    direction = newDirection//* dierection recibe un nuevo valor 
}


const directionEvent = key => {//* creamo la funcion para hacer el movimiento de la snake recibiendo el valor clave key
    switch (key.code) {//* creamos un swhitch peguntado que tecla fue la que oprimio o key.code
        case 'ArrowUp':
            direction != 'ArrowDown' && setDirection(key.code)//* si direction no es down seteamos la nueva direction para que la snake no pueda ir hacia atras
            break;
        case 'ArrowDown':
            direction != 'ArrowUp' && setDirection(key.code)
            console.log('hp')
            break;
        case 'ArrowRight':
            direction != 'ArrowLeft' && setDirection(key.code)
            break;
        case 'ArrowLeft':
            direction != "ArrowRight" && setDirection(key.code)
            break;
    }
}


const createRandomFood = () => {//* creamos la funcion para generara la comida eleatroriamente en el board
    const randomEmptySquare = emptySquares[Math.floor(Math.random() * emptySquares.length)]//* creamos la const para crear la comida en un lugar aleatorio con Math.random() lo multiplicamos por el largo del array nos dara un numero aletorio entre 0 y el ultimo lugar del array
    drawSquare(randomEmptySquare, 'foodSquare')//* llamamos a la funcion drawSquare para pintar el cuadrado de comida en el board
}


const updateScore = () => {//* creamos la funcionn para aumentar el score del player amedida que avanza en el juego 
    scoreBoard.innerText = score//* actializamos el texto de score 
}


const createBoard = () => {//* creamos la funcion la cual inicia el juego
    boardSquares.forEach((row, rowIndex) => {//* iteramos el array 2D 
        row.forEach((column, columnIndex) => {//* por cada iteracion
            const squareValue = `${rowIndex}${columnIndex}`//*verificamos o indentificamos  el valor de cada cuadrado inicia en 00 y termina en 99
            const squareElement = document.createElement('div')//* creamo un elemento que sera insertado en el tablero
            squareElement.setAttribute('class', 'square emptySquare')//* le colocamos las clase al elemento div
            squareElement.setAttribute('id', squareValue)//* le colocamos un id con su valor
            board.appendChild(squareElement)//* colocamos el elemento div al board
            emptySquares.push(squareValue)//* hacemo un push al emptySquare al valor de squareValue
        })
    });
}


const setGame = () => { //* declaramos los valores de juego
    snake = ['00', '01', '02', '03']//* definimos el largo de la serpiente que es 4
    score = snake.length//* el score es el largo de la serpiente
    direction = 'ArrowRight'//* definimos la direcion inicial que es ala derecha
    boardSquares = Array.from(Array(boardSize), () => new Array(boardSize).fill(squareTypes.emptySquare))//? creamos el array de dos dimeciones creamos una array del sizes del tablero que es 10 acada uno de eseos elementos le pasamos la funcion () => new Array(boardSize) para que sea otro array y lo rellenamos con .fill con ceros
    board.innerHTML = ''//* borramos el contenido del board cuando lo reseteamos
    emptySquares = []//*borramos el array emptySquares cuendo resetemos el juego
    createBoard()//*creamos el tablero llamando a la funcion 
}


const startGame = () => {//? creamos la funcion que dara inicio al juego 
    setGame()//? seteamos el juego
    gameOverSing.style.display = 'none'
    startButton.disabled = true
    drawSnake()//* llamamos a la funcion para dibujar a la serpiente en el board
    updateScore()//* llamamos a la funcion para actializar el score del player
    createRandomFood()//* llamamos a la funcion para crear la food aleatorio en el board
    document.addEventListener('keydown', directionEvent)//* agregamos los eventos a las flechas del teclado
    // document.addEventListener('keydown', directionEvent)
    moveInterval = setInterval(() => moveSnake(), gameSpeed)//* creamos el intervalo del mivimiento de la snake 
}


window.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        startGame()
    }
})



startButton.addEventListener('click', startGame) //* le asignamos el evento click al boton y llamamos a la funcion startGame