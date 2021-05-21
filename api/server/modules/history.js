var fs = require('fs');

// Définit les méthodes qui vont être appelées dans server.js
module.exports =
{
    sendHistory: sendHistory,
    addToHistory: addToHistory,
    getHistory: getHistory
}

// historique de message
var _history = [];

/**
* Fonction permettant d'ajouter des messages à l'historique
*/
function addToHistory(_name, _message, _avatar) {
    _history.push({
        name: _name,
        message: _message,
        new_avatar: _avatar
    });

    myJson = JSON.stringify(_history);

    fs.writeFile('./api/server/history.json', myJson, (err) => {
        if (err) {
            throw err;
        }
        console.log('The file has been saved!');
    });
}

function getHistory(io) {
    console.log("getHistory")
    fs.readFile('./api/server/history.json', (err, data) => {
        if (err) {
            createHistoryFile();
        }
        else {
            let histo;
            try {
                histo = JSON.parse(data);
                _history = histo;
                sendHistory(io);
            } catch (e) {
                createHistoryFile();
            }
        }
    });
}

function createHistoryFile() {
    console.log("create history")
    myJson = JSON.stringify(_history);
    fs.writeFile('./api/server/history.json', myJson, (err) => {
        if (err) {
            throw err;
        }
        console.log('The file has been saved!');
    });
}

/**
* Fonction permettant de récuperer les messages de l'historique
*/
function sendHistory(io) {
    io.sockets.emit('history', { history: _history });
}
