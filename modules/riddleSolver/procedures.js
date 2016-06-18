var foo = $jSpaghetti.module("riddleSolver")
foo.config.debugMode = false

foo.procedure("solvePuzzle", function(){

	/*
		Puzzle constant ids
	*/
	const PUZZLE_TICTT = 0;
	const PUZZLE_MESSYD = 1;
	const PUZZLE_VOLCANO = 2;
	const PUZZLE_HIDDENN = 3;
	const PUZZLE_HOTDOGS = 4;
	const PUZZLE_COORD = 5;
	const PUZZLE_PROPORT = 6;
	const PUZZLE_BINHE = 7;
	const PUZZLE_SNEAKERS = 8;
	const PUZZLE_SUDOKU = 9;
	const PUZZLE_2048 = 10;
	const PUZZLE_JOBS = 11;
	const PUZZLE_3MUSK = 12;
	const PUZZLE_CHOCO = 13;
	const PUZZLE_DRIEDPO = 14;
	const PUZZLE_CRAZYBANK = 15;
	const PUZZLE_MINES = 16;
	const PUZZLE_LITTLEL = 17;
	const PUZZLE_BIRDSC = 18;
	const PUZZLE_SWIMM = 19;
	const PUZZLE_WHALE = 20;
	const PUZZLE_BIRDW = 21;
	const PUZZLE_N100 = 22;
	const PUZZLE_CROC = 23;
	const PUZZLE_PREMIUM = 24;
	const PUZZLE_SHEEPS = 25;
	const PUZZLE_2BNOT2B = 26;
	const PUZZLE_LIGHTS = 27;


	/*
		Puzzle descriptor
	*/
	var puzzle_descriptor = [
		{id:PUZZLE_TICTT, names:["Tic Tac Toe","Jogo da Velha"]},
		{id:PUZZLE_MESSYD, names:["Messy Drawer","Gaveta Bagunçada"]},
		{id:PUZZLE_VOLCANO, names:["name of the volcanö","nome do vulcãö"]},
		{id:PUZZLE_HIDDENN, names:["Hidden Numbers","Números Ocultos"]},
		{id:PUZZLE_HOTDOGS, names:["Hot Dogs","Cachorros Quentes"]},
		{id:PUZZLE_COORD, names:["37.2350° N, 115.8111° W"]},
		{id:PUZZLE_PROPORT, names:["Proportions", "Proporções"]},
		{id:PUZZLE_BINHE, names:["072 097 099 107 101 114"]},
		{id:PUZZLE_SNEAKERS, names:["Setec Astronomy"]},
		{id:PUZZLE_SUDOKU, names:["Sudoku"]},
		{id:PUZZLE_2048, names:["2048 was developed by", "2048 foi desenvolvido por"]},
		{id:PUZZLE_JOBS, names:["01010011 01110100 01100001"]},
		{id:PUZZLE_3MUSK, names:["In Alexander Dumas' book", "No livro de Alexander Dumas"]},
		{id:PUZZLE_CHOCO, names:["Fat Boys", "Barras de Chocolate"]},
		{id:PUZZLE_DRIEDPO, names:["Dried Potatoes", "Batatas Malucas"]},
		{id:PUZZLE_CRAZYBANK, names:["Crazy Banker", "Banqueiro maluco"]},
		{id:PUZZLE_MINES, names:["Minesweeper", "Campo minado"]},
		{id:PUZZLE_LITTLEL, names:["Little Liars", "Competidores mentirosos"]},
		{id:PUZZLE_BIRDSC, names:["Birds And Cages", "Canários e Gaiolas"]},
		{id:PUZZLE_SWIMM, names:["Swimmers", "Medalhistas da natação"]},
		{id:PUZZLE_WHALE, names:["The Whale", "A Baleia"]},
		{id:PUZZLE_BIRDW, names:["Birdwatching", "Observando pássaros"]},
		{id:PUZZLE_N100, names:["Number 100", "Número 100"]},
		{id:PUZZLE_CROC, names:["Crocodiles", "Criadores de Jacarés"]},
		{id:PUZZLE_PREMIUM, names:["∀x Player(x)", "∀x Jogador(x)"]},
		{id:PUZZLE_SHEEPS, names:["Sheeps and Chickens", "Ovelhas e Galinhas"]},
		{id:PUZZLE_2BNOT2B, names:["/bb|[^b]{2}/"]},
		{id:PUZZLE_LIGHTS, names:["Lights Out"]}
	]


	/*
		Environment settings
	*/
	var environment_settings = {
		detected_lang: {String}
	}

	/*
		@prototype: getNextPuzzleIP();
		@definition: This function searches for "puzzle-next" element and gets the on-screen next puzzle IP;
		@author: GRSa;
		@parameters: none;
		@return: 
			*default: (String) Returns a string containing the on-screen next puzzle IP;
			*error: (null) Returns null if the "puzzle-next" element do not exists on page or if there is no IP inside it;
	*/
	function getNextPuzzleIP(){
		var containerNextPuzzleIP = document.getElementById("puzzle-next");
		if((containerNextPuzzleIP) &&
			 (containerNextPuzzleIP.innerHTML.length > 0)){
			var nextPuzzleIP = /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.exec(containerNextPuzzleIP.innerHTML);
			if ((nextPuzzleIP) && (nextPuzzleIP.length > 0)){
				return String(nextPuzzleIP);
			} else {
				return null;
			}
		}
		else {
			return null;
		}
	}

	/*
		@prototype: solvePuzzle(puzzle_id);
		@definition: This function solves the indicated puzzle;
		@author: GRSa;
		@parameters: puzzle_id (Integer): The puzzle constant id;
		@return: 
			*default: (Boolean) Return true if puzzle is solved. If the puzzle is solved by function, usually the page reloads before the function returning something, though.
			*error: (Boolean) Return false if puzzle was not found;
	*/
	function solvePuzzle(puzzle_id){
		if (!getNextPuzzleIP()){
			var text_answer = null;
			var fake_message = null;
			switch(puzzle_id){ 
				case PUZZLE_TICTT: //Tic-Tac-Toe
					fake_message = "func=tictactoe&status=1";
					break;
				case PUZZLE_MESSYD: //Messy Drawer
					text_answer = "3";
					break;
				case PUZZLE_VOLCANO: //Volcano
					text_answer = "Eyjafjallajökull";
					break;
				case PUZZLE_HIDDENN: //Hidden Numbers
					text_answer = "12, 4";
					break;
				case PUZZLE_HOTDOGS: //Hot Dogs
					text_answer = "24";
					break;
				case PUZZLE_COORD: //Coordinates 
					text_answer = "Area 51";
					break;
				case PUZZLE_PROPORT: //Proportion 
					text_answer = "4";
					break;
				case PUZZLE_BINHE: //Binary HE's Name 
					text_answer = "Hacker Experience";
					break;
				case PUZZLE_SNEAKERS: //Sneakers Puzzle
					text_answer = "too many secrets";
					break;
				case PUZZLE_SUDOKU: //Sudoku
					fake_message = "func=sudoku";
					break;
				case PUZZLE_2048: //2048
					fake_message = "func=2048&type=5";
					//After this access Too Many Secrets to get a cracker
					break;
				case PUZZLE_JOBS: //Jobs phrase
					text_answer = "Stay Hungry, Stay Foolish";
					break;
				case PUZZLE_3MUSK: //The Three Musketeers
					text_answer = "Aramis";
					break;
				case PUZZLE_CHOCO: //Fat Boys
					text_answer = "62.5";
					break;
				case PUZZLE_DRIEDPO: //Dried Potatoes
					text_answer = "50";
					break;
				case PUZZLE_CRAZYBANK: //Crazy Banker
					text_answer = "5, 1, 94";
					break;
				case PUZZLE_MINES: //Minesweeper
					fake_message = "func=minesweeper";
					break;
				case PUZZLE_LITTLEL: //Little Liars
					text_answer = "Phoebe, Milena, Naomy";
					break;
				case PUZZLE_BIRDSC: //Birds And Cages
					text_answer = "4, 3";
					break;
				case PUZZLE_SWIMM: //Swimmers
					text_answer = "A, D, C";
					break;
				case PUZZLE_WHALE: //Whale
					text_answer = "3, 3, 9";
					break;
				case PUZZLE_BIRDW: //Birdwatching
					text_answer = "5, 2";
					break;
				case PUZZLE_N100: //Number 100
					text_answer = "99+99/99";
					break;
				case PUZZLE_CROC: //Crocodiles
					text_answer = "49, 35";
					break;
				case PUZZLE_PREMIUM: //Premium
					switch(environment_settings.detected_lang){
						case LANG_EN:
							text_answer = "Every player that buys premium is awesome";
							break;
						case LANG_BR:
							text_answer = "Todo jogador que compra premium é lindo";
							break;
						default: text_answer = "Every player that buys premium is awesome";
					}
					break;
				case PUZZLE_SHEEPS: //Sheeps
					text_answer = "9, 18";
					break;
				case PUZZLE_2BNOT2B: ///bb|[^b]{2}/
					text_answer = "To be or not to be";
					break;
				case PUZZLE_LIGHTS: //Lights Out
					fake_message = "func=lightsout";
					break;
				default: 
					return false;
			}
			
			if (text_answer){
				document.getElementsByName("qa-answer")[0].value = text_answer;
				document.getElementsByClassName("btn btn-success")[0].click();
			} else if (fake_message){
				sendXMLHttpRequest("riddle.php", "POST", fake_message, true, function(data){
					var result = JSON.parse(data)
					if (result.status == "OK"){
						location.reload()
					} else {
						console.log(result)
					}
				}, true)
			}
			
		} else {

		}
		
		return true;
	}

	/*
		@prototype: getPuzzleId();
		@definition: This function checks if the current page is a puzzle page and returns the puzzle constant id;
		@author: GRSa;
		@parameters: none;
		@return: 
			*default: (Integer) Returns a puzzle constant id;
			*error: (null) Returns null if puzzle was not found;
	*/
	function getPuzzleId(){
		var content = null;
		var credits_widget_content = document.getElementsByClassName("widget-content padding center")[4];
		var credits_icon = document.getElementsByClassName("he16-puzzle_credits")[0];
		if ((credits_widget_content) && (credits_icon)){
			content = credits_widget_content.textContent; //Gets the content from credits widget
		} else {
			var puzzle_main_content = document.getElementsByClassName("widget-content padding center")[0];
			var puzzle_main_content_icon = document.getElementsByClassName("he16-puzzle")[0];
			if ((puzzle_main_content) && (puzzle_main_content_icon)){
				content = puzzle_main_content.childNodes[7].textContent; //Gets the content from puzzle question      
			} else {
				//Do nothing and keep content variable with null
			}
		}
		if (content){
			for (puzzle_pos in puzzle_descriptor){
				if (strposOfArray(content, puzzle_descriptor[puzzle_pos].names) >= 0){
					return puzzle_descriptor[puzzle_pos].id;
				}
			}
			return null;
		} else {
			return null;    
		}
	}

	//Puzzle handler controller
	var puzzle_id = null
	puzzle_id = getPuzzleId()
	if ((puzzle_id != null) && (!getNextPuzzleIP())){
		environment_settings.detected_lang = detectLang()
		if (!environment_settings.detected_lang) environment_settings.detected_lang = LANG_EN
		var button_content = null;
		switch(environment_settings.detected_lang){
			case LANG_EN:
				button_content = "Solve riddle";
				break;
			case LANG_BR:
				button_content = "Resolver este enigma";
				break;
			default:
				button_content = "Solve riddle";
		}
		getDOMElement("div", "class", "widget-title", 1).innerHTML += '<button id="solvePuzzleButton" class="btn btn-danger mission-abort">' + button_content + '</button>';
		document.getElementById("solvePuzzleButton").addEventListener("click", function(){
				solvePuzzle(puzzle_id)
		})
	}

})