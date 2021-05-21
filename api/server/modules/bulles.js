/*
 * Nom : Bulles
 * Description : Un jeu auquel on accède en tappant bulles dans le chat. Le but est de faire éclater le plus rapidemment possible des bulles. Un tableau tient compte des scores des joueurs de la session actuelles.
 * Auteur(s) : Antoine & Cédric
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports = {
	init: init,
    handleBulles: handleBulles, // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
    destroyBulle: destroyBulle
}

var motClef = "bulle";
var width = 640;
var height = 400;
var nbBulle = 0;
var minSize = 50;
var maxSize = 150;
var tabBulles = [];
var playing = false;
var scores = {};
var io;

function init(_io)
{
	io = _io;
}

var intervalCreate = setInterval(function()
{
	if (playing)
	{
		createBulle();
		nbBulle +=1;
	}
}, 500);

var intervalMove = setInterval(function()
{
	moveBulles();
}, 40);

function handleBulles(message, ent)
{
    if (message.includes(motClef))
	{
		console.log('play!');
        playing = !playing;
    }

    if (message.includes(motClef) && !playing)
    {
        var message = '<span>Scores :<table class="bulleResults"><tr><td>Joueur</td><td>Score</td></tr>';
        for(const property in scores) {
            message += '<tr><td>' + property + '</td>';
            message += '<td>' + scores[property]+ '</td></tr>';
        }
        message += '</table>';

        if(isEmpty(scores)){
            message = '<span>Personne n\'a joué à notre jeu :(</span>'
        }

        io.sockets.emit('new_message',
        {
					name:'Père Fouras',
					new_avatar: '/fouras.jpg',
            message: message
        });

        scores = {};
    }
}

function createBulle()
{
    var id = "bulle" + nbBulle;
    var speed =  Math.random() * 0.01;
    var size = Math.random();
    var posX = Math.random();
    var posY = Math.random();
    var bulle = {id:id, speed:speed, size:size, posX:posX, posY:posY};

    io.sockets.emit('createBulle',
    {
        bulle:bulle
    });

    tabBulles.push(bulle);
}

function moveBulles()
{
	if (tabBulles.length == 0)
		return;

    for (let cpt = 0; cpt < tabBulles.length; cpt++)
	{
        let currentBulle = tabBulles[cpt];
        currentBulle.posY -= currentBulle.speed;

        if (currentBulle.posY < 0) {
            destroyBulle(currentBulle.id)
        }

    }

    io.sockets.emit('moveBulle',
    {
        tabBulles:tabBulles
    });
}

function destroyBulle(idBulle, socket)
{
    var indexToDelete = tabBulles.indexOf(tabBulles.find(el => el.id == idBulle));
    tabBulles.splice(indexToDelete, 1);
    if(socket != undefined) {
        if(scores[socket.name] == undefined) {
            scores[socket.name] = 1;
        } else {
            scores[socket.name] += 1;
        }
    }
    io.sockets.emit('destroyBulle', idBulle);
}

function isEmpty(obj)
{
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
}
