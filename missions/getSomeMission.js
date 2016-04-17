//It try to get some mission, if is avaiable, and accept it
function getSomeMission(request) {
    //Get the URL mission
    var element = document.getElementsByTagName("a");
    var countFound = 0;
    var url;
    var urlIsObtained = false;
    for (count = 0; count <= element.length - 1; count++) {
        aux = element[count];
        url = aux.href;
        aux = aux.childNodes[0];
        aux = aux.nodeValue;
        if (aux != null) {
            if (request.job == defaultJob.checkBalance) {
                if (aux.search(labels.checkBalance[request.language]) >= 0) {
                    countFound++;
                    //url = url.split("?")[1];
                    request.url = url;
                    console.log(request.url);
                    urlIsObtained = true;
                    break;
                }
            } else
            if (request.job == defaultJob.transferMoney) {
                if (aux.search(labels.transferMoney[request.language]) >= 0) {
                    countFound++;
                    //url = url.split("?")[1];
                    request.url = url;
                    console.log(request.url);
                    urlIsObtained = true;
                    break;
                }
            }

        }
    }
    return request;
};