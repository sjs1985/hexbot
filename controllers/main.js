var controllers = {}

controllers.storage = new Storage(BOT_STORAGE_NAME)
var storageContent = controllers.storage.get()

if (storageContent){
	controllers.bot = storageContent
} else { 
	controllers.bot = new Bot()
}


