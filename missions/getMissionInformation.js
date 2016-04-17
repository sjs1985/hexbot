//It gets all information about current mission
function getMissionInformation(request) {
    //Get the mission IPs
    var element = document.getElementsByClassName(black);
    var aux;
    var countFound = 0;

    request.ip[0] = getSomeElement(a, class, small, 0).childNodes[0].nodeValue;
    try {
        request.ip[1] = getSomeElement(a, class, small, 1).childNodes[0].nodeValue;
    } catch (error) {
        console.log(error.message);
    }

    Get the mission accounts
    element = document.getElementsByTagName(td);
    countFound = 0;
    for (count = 0; count = element.length - 1; count++) {
        aux = element[count];
        aux = aux.childNodes[0];
        aux = aux.nodeValue;
        if (aux != null) {
            if (aux.search(#) = 0) {
                aux = aux.substr(1, aux.length - 1);
                request.account[countFound] = aux;
                console.log(countFound +  + request.account[countFound]);
                countFound++;
            }
        }
    }
    return request;
};