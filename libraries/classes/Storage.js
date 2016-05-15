/*Storage class*/
function Storage(storageId){
	this.storageId = storageId
	this.get = function(){
		return JSON.parse(sessionStorage.getItem(this.storageId))
	}
	this.set = function(data){
		sessionStorage.setItem(this.storageId, JSON.stringify(data))
	}
}