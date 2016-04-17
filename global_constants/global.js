//Labels of game
var labels = {
    checkBalance: ["Verificar balanço bancário", "Check bank status"],
    transferMoney: ["Transferir dinheiro", "Transfer money"]
}

//This structure stores the data for transmission
var requestData = {
    act: null,
    stepId: null,
    url: null,
    ip: [],
    account: [],
    amount: null,
    language: null,
    job: null,
    counter: null,
    myAccount: null,
    software: null
}

//This estructure stores the default actions
var defaultAct = {
    getRequestData: 1,
    setRequestData: 2
}

//This stores the delay count
var counterDelay = 0;
var delay;
var DEFAULT_DELAY = 10;
var panel, globalAux;

//This stores the default job
var defaultJob = {
    checkBalance: 1,
    transferMoney: 2,
    installSoftware: 3,
    wait: 4
}