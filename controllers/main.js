var botStateStorage = new Storage(STATE_STORAGE_NAME)

var storageContent = botStateStorage.get()

var controllers = {
	botState: {
		storage: botStateStorage,
		storageContent: storageContent
	},
	functions: {

	}
}



