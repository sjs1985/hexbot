//It analyzes the logs data and extracts accounts in order to invade them
function extractDataFromLogs(request, logs) {
    var piece = logs.split(" to ");
    var count, count2 = 0;
    var positionFlag = 0;
    var thereIsAlready;
    var accountFound;
    for (count = 0; count <= piece.length - 1; count++) {
        if (piece[count].search("#") == 0) {
            positionFlag = piece[count].search(" ");
            if (piece[count].search(" at localhost") == positionFlag) {
                accountFound = piece[count].substr(1, positionFlag - 1);
                thereIsAlready = false;
                for (count2 = 0; count2 <= request.account.length - 1; count2++) {
                    if (request.account[count2] == accountFound) {
                        thereIsAlready = true;
                        break;
                    }
                }
                if (accountFound == request.myAccount) {
                    thereIsAlready = true;
                }
                if (thereIsAlready == false) {
                    request.account.push(accountFound);
                    console.log(accountFound);
                }
            }
        }
    }
    return request;
};