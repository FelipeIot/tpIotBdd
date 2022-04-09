var express = require('express');
var router = express.Router();

const marcas = ['X', 'O'];

var jugadores;
var tablero;
var turno;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
/* PUT empezar. */

router.put('/empezar', function (req, res) {
  turno = 0;
  jugadores = req.body.jugadores;
  tablero =
    [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
  res.setHeader('Content-Type', 'application/json');
  res.send({
    turno: jugadores[turno], tablero: tablero
  });
});

/* PUT movimiento. */
router.put('/movimiento', function (req, res) {
  const columna = req.body.columna;
  const fila = req.body.fila;
  tablero[fila][columna] = marcas[turno];

  turno = (turno + 1) % 2 ;
  console.log(turno);
  res.setHeader('Content-Type', 'application/json');
  res.send({
    turno: jugadores[turno], tablero: tablero
  });

});

module.exports = router;

