var adRemover = $jSpaghetti.module("adRemover")

adRemover.procedure("removeAds", function(){
	var adTags = document.getElementsByTagName("ins")
	for (var i = 0; i < adTags.length; i++) {
	 	adTags[i].style.display = "none"
	 	adTags[i].innerHTML = ""
	}
})