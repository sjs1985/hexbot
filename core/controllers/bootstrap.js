var controllers = {}

controllers.storage = new Storage(BOT_STORAGE_NAME)
var storageContent = controllers.storage.get(function(storageContent){
	if (storageContent){
		controllers.bot = storageContent
	} else { 
		controllers.bot = new Bot()
	}
	//It checks if the current page is a regular page game
	var regularPageId = document.getElementById("header")
	if ((regularPageId) && (regularPageId.innerHTML.indexOf('<a href="#">Hacker Experience</a>') >= 0)){ 
		controllers.isRegularGamePage = true
		
		functions()
		controlPanel()
		buttonToAction()
		botButton()

		bootstrap(function(){
			controllers.functions.activeButtons(true)
			sequences()
		})
	} else {
		console.log(LANG.NOT_REGULAR_PAGE)
	}
})



	




