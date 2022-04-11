var express = require('express');
var router = express.Router();

const marcas = ['X', 'O'];

var jugadores;
var tablero;
var turno;
var ganador;


const arbitro = (tablero,posibleganador) => {
  let resultado = 'ninguno';
  //verificar si existe un ganador en el tablero  (horizontal)
  tablero.forEach(fila => {
    if (fila[0] === fila[1] && fila[1] === fila[2] && fila[0] !== ' ') {
      resultado = posibleganador;
    }
  });
  //verificar si existe un ganador en el tablero  (diagonal)
  if (tablero[0][0] === tablero[1][1] && tablero[1][1] === tablero[2][2] && tablero[0][0] !== ' ') {
    resultado = posibleganador;
  }
  //verificar si existe un ganador en el tablero  (vertical)
  for (let i = 0; i < 3; i++) {
    if (tablero[0][i] === tablero[1][i] && tablero[1][i] === tablero[2][i] && tablero[0][i] !== ' ') {
      resultado = posibleganador;
    }
  }
  //verificar si todas las casillas estan ocupadas
  let casillas = 0;
  tablero.forEach(fila => {
    fila.forEach(casilla => {
      if (casilla !== ' ') {
        casillas++;
      }
    });
  });
  if (casillas === 9) {
    resultado = 'empate';
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

  const columna = req.body.columna;
  const fila = req.body.fila;
  if (tablero[fila][columna] === ' ' && jugadores[turno] === req.body.jugador) {
    tablero[fila][columna] = marcas[turno];
    ganador=arbitro(tablero,jugadores[turno]);
    turno = (turno + 1) % 2;
  }

  res.setHeader('Content-Type', 'application/json');
  res.send({
    turno: jugadores[turno], tablero: tablero, ganador: ganador
  });

});

module.exports = router;

