var express = require('express');
var router = express.Router();

const marcas = ['X', 'O'];

var jugadores;
var tablero;
var turno;
var numerojugadas;
var ganador;


const verificarGanador=(tablero)=>{ 
  let resultado = false;
  //verificar si existe un ganador en el tablero  (horizontal)
  tablero.forEach(fila => {
    if (fila[0] === fila[1] && fila[1] === fila[2] && fila[0] !== ' ') {
      resultado = true;
    }
  });
  //verificar si existe un ganador en el tablero  (diagonal)
  if (tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2] && tablero[0][0] !== ' ') {
    resultado = true;
  }
  //verificar si existe un ganador en el tablero  (vertical)
  for (let i = 0; i < 3; i++) {
    if (tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i] && tablero[0][i] !== ' ') {
      resultado = true;
    }
  }
  return resultado;
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* PUT empezar. */
router.put('/empezar', function (req, res) {
  turno = 0;
  ganador = 'ninguno';
  numerojugadas = 0;
  jugadores = req.body.jugadores;
  tablero =
    [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
  res.setHeader('Content-Type', 'application/json');
  res.send({
    turno: jugadores[turno], tablero: tablero, ganador: ganador
  });
});

/* PUT movimiento. */
router.put('/movimiento', function (req, res) {
  numerojugadas++;
  if (numerojugadas >= 9) {
    ganador = 'empate';
  }



  const columna = req.body.columna;
  const fila = req.body.fila;
  if (jugadores[turno] === req.body.jugador) {
    tablero[fila][columna] = marcas[turno];
    if (verificarGanador(tablero) === true) {
      ganador = jugadores[turno];
    }

    turno = (turno + 1) % 2;
  }



  res.setHeader('Content-Type', 'application/json');
  res.send({
    turno: jugadores[turno], tablero: tablero, ganador: ganador
  });

});

module.exports = router;

