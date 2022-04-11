let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);


//Cuando se inicia un juego nuevo le toca al primer jugador y el tablero esta vacio y el nombre del ganador es ninguno
//Cuando el primer jugador hace su movimiento le toca al otro jugador y la casilla elegida por el primer jugador esta ocupada
//Cuando el segundo jugador hace su movimiento entonces le toca de nuevo al primer jugador y las casillas elegida por el primer y segundo jugador esta ocupadas con marcas diferentes
//Cuando un jugador marca tres casillas de la misma fila entonces gana
//Cuando un jugador marca tres casillas de la misma columna entonces gana
//Cuando un jugador marca tres casillas de la misma diagonal entonces gana
//Si un jugador mueve cuando no es su turno entonces se devuelve un error y el tablero no se modifica
//Cuando no quedan casilla vacias y no hay un ganador entonces es un empate
//Cuando el segundo jugador gana


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

    let secuenciafila = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 1 },
        { jugador: 'Juan', columna: 1, fila: 0 },
        { jugador: 'Pedro', columna: 2, fila: 1 },

    ]

    let secuenciacolumna = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 0, fila: 1 },
        { jugador: 'Pedro', columna: 1, fila: 1 }

    ]

    let secuenciadiagonal = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 1, fila: 1 },
        { jugador: 'Pedro', columna: 2, fila: 1 }

    ]

    let secuenciafallaturno = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 1, fila: 1 },
    ]

    let secuenciaempate = [
        { jugador: 'Juan', columna: 0, fila: 0 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 1, fila: 1 },
        { jugador: 'Pedro', columna: 2, fila: 2 },
        { jugador: 'Juan', columna: 2, fila: 0 },
        { jugador: 'Pedro', columna: 2, fila: 1 },
        { jugador: 'Juan', columna: 0, fila: 2 },
        { jugador: 'Pedro', columna: 0, fila: 1 }


    ]

    let segunciasegundo = [
        { jugador: 'Juan', columna: 2, fila: 2 },
        { jugador: 'Pedro', columna: 0, fila: 0 },
        { jugador: 'Juan', columna: 1, fila: 1 },
        { jugador: 'Pedro', columna: 1, fila: 0 },
        { jugador: 'Juan', columna: 2, fila: 1 }

    ]



    describe("Se empieza un juego nuevo", () => {
        it("Todos los casilleros estan vacios y Le toca al primer jugador y el nombre del ganador es ninguno", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('turno').eql('Juan');
                    res.body.should.have.property('ganador').eql('ninguno');
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
    describe("Cuando un jugador marca tres casillas de la misma fila entonces gana", () => {

        it("el jugador Juan marca una fila y gana el juego", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            secuenciafila.forEach(mov => {

                chai.request(server)
                    .put("/movimiento")
                    .send(mov)
                    .end();
            });

            chai.request(server)
                .put("/movimiento")
                .send({ jugador: 'Juan', columna: 2, fila: 0 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ganador').eql('Juan');
                    res.body.should.have.property('tablero').eql([
                        ['X', 'X', 'X'],
                        [' ', 'O', 'O'],
                        [' ', ' ', ' ']
                    ]);
                    done();
                });
        });
    });
    describe("Cuando un jugador marca tres casillas de la misma columna entonces gana", () => {

        it("el jugador Juan marca una columna y gana el juego", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            secuenciacolumna.forEach(mov => {

                chai.request(server)
                    .put("/movimiento")
                    .send(mov)
                    .end();
            });

            chai.request(server)
                .put("/movimiento")
                .send({ jugador: 'Juan', columna: 0, fila: 2 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ganador').eql('Juan');

                    done();
                });
        });
    });

    describe("Cuando un jugador marca tres casillas de la misma diagonal entonces gana", () => {

        it("el jugador Juan marca una diagonal y gana el juego", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            secuenciadiagonal.forEach(mov => {

                chai.request(server)
                    .put("/movimiento")
                    .send(mov)
                    .end();
            });

            chai.request(server)
                .put("/movimiento")
                .send({ jugador: 'Juan', columna: 2, fila: 2 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ganador').eql('Juan');
                    done();
                });
        });
    });

    describe("Si un jugador mueve cuando no es su turno entonces se devuelve un error y el tablero no se modifica", () => {

        it("el jugador Juan mueve dos veces seguidas y causa un error el tablero no se modifica", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            secuenciafallaturno.forEach(mov => {

                chai.request(server)
                    .put("/movimiento")
                    .send(mov)
                    .end();
            });

            chai.request(server)
                .put("/movimiento")
                .send({ jugador: 'Juan', columna: 0, fila: 2 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('tablero').eql([
                        ['X', 'O', ' '],
                        [' ', 'X', ' '],
                        [' ', ' ', ' ']
                    ]);

                    done();
                });
        });
    });

    describe("Cuando no quedan casilla vacias y no hay un ganador entonces es un empate", () => {

        it("el tablero se llena sin ningun ganador", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            secuenciaempate.forEach(mov => {

                chai.request(server)
                    .put("/movimiento")
                    .send(mov)
                    .end();
            });

            chai.request(server)
                .put("/movimiento")
                .send({ jugador: 'Juan', columna: 1, fila: 2 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('tablero').eql([
                        ['X', 'O', 'X'],
                        ['O', 'X', 'O'],
                        ['X', 'X', 'O']
                    ]);
                    res.body.should.have.property('ganador').eql('empate');

                    done();
                });
        });
    });

    describe("Cuando el segundo jugador gana", () => {

        it("el jugador Juan completa una fila y gana", (done) => {
            chai.request(server)
                .put("/empezar")
                .send(juego)
                .end();

            segunciasegundo.forEach(mov => {

                chai.request(server)
                    .put("/movimiento")
                    .send(mov)
                    .end();
            });

            chai.request(server)
                .put("/movimiento")
                .send({ jugador: 'Pedro', columna: 2, fila: 0 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.to.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ganador').eql('Pedro');

                    done();
                });
        });
    });

});



