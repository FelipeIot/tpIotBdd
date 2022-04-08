let chai=require('chai');

//Cuando se inicia un juego nuevo le toca al primer jugador y el tablero esta vacio
//Cuando el primer jugador hace su movimiento le toca al otro jugador y la casilla elegida por el primer jugador esta ocupada
//Cuando el segundo jugador hace su movimiento entonces le toca de nuevo al primer jugador y las casillas elegida por el primer y segundo jugador esta ocupadas con marcas diferentes
//Cuando un jugador marca tres casillas de la misma fila entonces gana
//Cuando un jugador marca tres casillas de la misma columna entonces gana
//Cuando un jugador marca tres casillas de la misma diagonal entonces gana
//Si un jugador mueve cuando no es su turno entonces se devuelve un error y el tablero no se modifica
//Cuando no quedan casilla vacias y no hay un ganador entonces es un empate
describe( "juego tateti",() =>{
    it("deberia fallar siempre",()=>{
        chai.assert.fail();
    })
}

)