(function() {
	var keepGoing = false;
	var c = document.getElementById('c');  
	var ctx = c.getContext('2d'); 

	function initArr(h, w, fun) {
		var arr = new Array(h);

		for ( var i = 0; i < h; i++) {
			arr[i] = new Array(w);
			if (fun) {
				for ( var j = 0; j < w; j++) {
					arr[i][j] = fun(i, j);
				}
			}
		}

		return arr;
	}

	function updateGame(game, newGame, rsize) {
		var alive = 0;

		for ( var i = 0; i < game.length; i++) {
			for ( var j = 0; j < game[i].length; j++) {

				var cell = game[i][j];
				var neighbors = 0;

				for ( var k = -1; k <= 1; k++) {
					for ( var l = -1; l <= 1; l++) {

						if (k !== 0 || l !== 0) {
							var indX = i + k;
							var indY = j + l;

							if (indX === game.length) {
								indX = 0;
							}
							if (indY === game[i].length) {
								indY = 0;
							}

							if (indX === -1) {
								indX = game.length - 1;
							}
							if (indY === -1) {
								indY = game[i].length - 1;
							}

							if (game[indX][indY]) {
								neighbors++;
							}
						}

					}
				}
				
				if (cell) {
					if (neighbors < 2 || neighbors > 3) {
						cell = false;
					}
				} else {
					cell = neighbors === 3;
				}

				if (cell) {
					alive++;
				}
				newGame[i][j] = cell;
			}

		}

		for ( var i = 0; i < newGame.length; i++) {
			for ( var j = 0; j < newGame[i].length; j++) {
				if (newGame[i][j] && !game[i][j]) {
					ctx.fillRect(i * rsize, j * rsize, rsize, rsize);
				}
				else if (!newGame[i][j] && game[i][j]) {
					ctx.clearRect(i * rsize, j * rsize, rsize, rsize);
				}
			}
		}

		document.getElementById('alive').innerHTML = alive;
		if (keepGoing) {
			setTimeout(function() {
				updateGame(newGame, game, rsize, true);
			}, 10);
		}
	}

	var yres = 200;
	var offset = 10; 
	var xcsize = window.innerWidth - offset * 2;
	var ycsize = window.innerHeight - offset * 2;
	var xres = Math.floor(yres * xcsize / ycsize);
	ctx.canvas.width = xcsize;
	ctx.canvas.height = ycsize;

	var rsize = ycsize / yres;
	var gameArr = initArr(xres, yres, function(i, j) {
			return Math.round(Math.random());
	});
	var newGame = initArr(xres, yres);
	updateGame(gameArr, newGame, rsize, false);

	function startGame() {
		updateGame(newGame, gameArr, rsize, true);
	}

	var inst = document.getElementById('instructions');
	document.onclick = function() {
		if (!keepGoing) {
			inst.style.display = "none";
			keepGoing = true;
			startGame();
		} else {
			inst.style.display = "block";
			inst.innerHTML = "Click to Continue Simulation";
			keepGoing = false;
		}
	}
})();
