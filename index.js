var cartasArray = [{
  'name': 'exo1',
  'img': 'img/exo1.jpg'
}, {
  'name': 'exo2',
  'img': 'img/exo2.jpg'
}, {
  'name': 'exo3',
  'img': 'img/exo3.jpg'
}, {
  'name': 'exo5',
  'img': 'img/exo4.jpg'
}, {
  'name': 'exo6',
  'img': 'img/exo5.jpg'
}, {
  'name': 'exo7',
  'img': 'img/exo6.jpg'
}, {
  'name': 'exo7',
  'img': 'img/exo7.jpg'
},{
  'name': 'exo8',
  'img': 'img/exo8.jpg'
}];

//variables globales
var primerClick = '';
var segundoClick = '';
var jugadas = 0;
var cont = 0;
var previousTarget = null;
var delay = 800;

//se crea la tabla de imagenes dinamicamente
var juego = document.getElementById('juego');
var tabla = document.createElement('section');
tabla.setAttribute('class', 'tabla');
juego.appendChild(tabla);

//cartel de bienvenida al empezar cada partida
function cartelito() {
  var alerta;
  var jugador = prompt("Escribe tu exonombre:");
  if (jugador == null || jugador == "") {
    alerta = "Me desilucionastes, negri";
  } else {
    alerta = "¡A disfrutar del juego" + jugador + "!";
  }
  document.getElementById("nombrejugador").innerHTML = alerta;
}
cartelito();

function Memotest() {
  var tablaJuego = cartasArray.concat(cartasArray).sort(function () {
    return 0.5 - Math.random();
  });

  tablaJuego.forEach(function (item) {
    var name = item.name,
      img = item.img;


    var carta = document.createElement('div');
    carta.classList.add('carta');
    carta.dataset.name = name;

    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = 'url(' + img + ')';

    tabla.appendChild(carta);
    carta.appendChild(front);
    carta.appendChild(back);
  });

  //cuando hay un match entre dos cartas se ven las estrellas
  var match = function match() {
    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (carta) {
      carta.classList.add('match');
    });
  };

  var resetGuesses = function resetGuesses() {
    primerClick = '';
    segundoClick = '';
    cont = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(function (carta) {
      carta.classList.remove('selected');
    });
  };

  tabla.addEventListener('click', function (event) {

    var clicked = event.target;

    if (clicked.nodeName === 'SECTION' || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
      return;
    }
    if (cont < 2) {
      cont++;
      if (cont === 1) {
        primerClick = clicked.parentNode.dataset.name;
        console.log(primerClick);
        clicked.parentNode.classList.add('selected');
      } else {
        segundoClick = clicked.parentNode.dataset.name;
        console.log(segundoClick);
        clicked.parentNode.classList.add('selected');
      }

      if (primerClick && segundoClick) {
        if (primerClick === segundoClick) {
          setTimeout(match, delay);
        }
        setTimeout(resetGuesses, delay);
      }
      if (cont == 2) {
        jugadas++
        console.log("All moves" + jugadas);
        var allMoves = document.getElementById('jugadas');
        allMoves.innerHTML = 'Movimientos: ' + (jugadas);
      }
    }

    if (primerClick === segundoClick) {
      var coincidencias = document.getElementsByClassName('match');

      if (coincidencias.length == 14) {
        setTimeout(function () {
          alert("Ganastes, negri");}, 1000);
        setTimeout(function () { location.reload(); }, 1500);
      }
    }

    if (jugadas > 32) {
      setTimeout(function () { alert("mmm vs decis?"); }, 1000)
      setTimeout(function () { location.reload(); }, 1500);
    }
  });

}

Memotest();