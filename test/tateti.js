let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);


//Cuando se inicia un juego nuevo le toca al primer jugador y el tablero esta vacio
//Cuando el primer jugador hace su movimiento le toca al otro jugador y la casilla elegida por el primer jugador esta ocupada
//Cuando el segundo jugador hace su movimiento entonces le toca de nuevo al primer jugador y las casillas elegida por el primer y segundo jugador esta ocupadas con marcas diferentes
//Cuando un jugador marca tres casillas de la misma fila entonces gana
//Cuando un jugador marca tres casillas de la misma columna entonces gana
//Cuando un jugador marca tres casillas de la misma diagonal entonces gana
//Si un jugador mueve cuando no es su turno entonces se devuelve un error y el tablero no se modifica
//Cuando no quedan casilla vacias y no hay un ganador entonces es un empate
describe("juego tateti", () => {

    let juego = {
        jugadores: ['Juan', 'Pedro']
    }

    let movimientos = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 0, fila: 1 },
        { jugador: 'Pedro', columna: 1, fila: 1 },
        { jugador: 'Juan', columna: 0, fila: 2 }
    ]

    describe("Se empieza un juego nuevo", () => {
        it("Todos los casilleros estan vacios y Le toca al primer jugador", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Juan');
                    res.body.should.have.property('tablero').eql([
                        [' ', ' ', ' '],
                        [' ', ' ', ' '],
                        [' ', ' ', ' ']
                    ]);
                    done();
                });
        });
    });
    describe("El primer jugador hace su movimiento", () => {

        it("el casillero queda ocupado y le toca al otro jugador", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            chai.request(server)
                .put("/movimiento")
                .send(movimientos[0])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Pedro');
                    res.body.should.have.property('tablero').eql([
                        ['X', ' ', ' '],
                        [' ', ' ', ' '],
                        [' ', ' ', ' ']
                    ]);
                    done();
                });
        });
    });
    describe("El segundo jugador hace su movimiento", () => {

        it("el casillero queda ocupado y le toca al otro jugador", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();


            chai.request(server)
                .put("/movimiento")
                .send(movimientos[0])
                .end();
                
            chai.request(server)
                .put("/movimiento")
                .send(movimientos[1])
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Juan');
                    res.body.should.have.property('tablero').eql([
                        ['X', 'O', ' '],
                        [' ', ' ', ' '],
                        [' ', ' ', ' ']
                    ]);
                    done();
                });

        });


    });

});