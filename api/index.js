var express = require('express');
var http = require('http');
var path = require('path');
var { Server } = require('socket.io');
// var ioLib = require('socket.io');
var ent = require('ent');

// Chargement des modules perso
var daffy = require('./server/modules/daffy.js');
var quizz = require('./server/modules/quizz.js');
var jack = require('./server/modules/sparrow.js');
var bulles = require('./server/modules/bulles.js');
var smileys = require('./server/modules/smileys.js');
// var easterEggs = require('./server/modules/easter-eggs.js');
// var basket = require('./server/modules/basket.js');
var wizz = require('./server/modules/wizz.js');
var avatarsModule = require('./server/modules/avatars.js');
var typing = require('./server/modules/feedback.js');
var meteo = require('./server/modules/meteo.js');
var upload = require('./server/modules/upload.js');
var jukebox = require('./server/modules/jukebox.js');
// var youtubeBot = require('./server/modules/youtubeBot.js');
var history = require('./server/modules/history.js');
var bimbamboom = require('./server/modules/bimbamboom.js');
var gif = require('./server/modules/gif.js');

// crée l'application
var app = express()
// crée le server
var server = http.createServer(app)
// setup le socket.io pour ce serveur
// var io = ioLib(server)
var io = new Server(server)

// renvoie index.html lorsqu'un user vas sur la route /
app.get('/', (req, res) => res.sendFile(path.resolve('./src/index.html')))

// spécifie les dossiers auxquels l'appli a acces
app.use(express.static(path.resolve('./src')));
app.use(express.static(path.resolve('./src/assets')));
app.use(express.static(path.resolve('./src/assets/uploads')));
// app.use(express.static(path.resolve(__dirname + '../src')));
// app.use(express.static(path.resolve(__dirname + '../src/assets')));
// app.use(express.static(path.resolve(__dirname + '../src/assets/uploads')));

// initialisation du module bulle
bulles.init(io);

// initialisation du stockage des utilisateurs
let users = {};

// Gestion des connexions au socket
io.on('connection', function (socket) {

	// io.sockets.on('connection', function (socket) {
	//console.log('connection ' + socket.id);
	// Insère le user dans le tableau
	users[socket.id] = { id: socket.id, name: '...' };
	io.sockets.emit('load_users_list', users);

	// basket.addClient(socket);

	// io.sockets.emit('easter_egg', {
	// 	name: 'user_enter.mp3',
	// });

	// Réception d'avatar
	socket.on('new_avatar', function (avatar) {
		avatarsModule.handleAvatars(avatar, socket);

		if (typeof (users[socket.id]) != 'undefined') {
			users[socket.id].avatar = socket.avatar;
			console.log("changement avatar");
		}

		console.log("envoyé par le serveur : " + users[socket.id].avatar);
		io.sockets.emit('load_users_list', users);
		socket.emit('upload_personal_avatar', users[socket.id].avatar);

	});

	// Arrivée d'un utilisateur
	socket.on('user_enter', function (name) {
		// Stocke le nom de l'utilisateur dans l'objet socket
		socket.name = name;

		//console.log('user_enter ' + socket.id);

		// Met à jour le pseudo dans la liste des users
		users[socket.id].name = socket.name;
		io.sockets.emit('load_users_list', users);

		history.getHistory(io);

		// io.sockets.emit('easter_egg', {
		// 	name: 'user_enter.mp3',
		// });
	});

	// changement de nom de l'utilisateur
	socket.on('user_name_change', function (name) {
		// Stocke le nom de l'utilisateur dans l'objet socket
		socket.name = name;

		console.log(name);

		// Met à jour le pseudo dans la liste des users
		users[socket.id].name = socket.name;
		io.sockets.emit('load_users_list', users);
	});

	//Déconnexion d'utilisateur
	socket.on('disconnect', function (avatar) {
		avatarsModule.deleteAvatars(avatar, socket);

		let user = users[socket.id];
		io.sockets.emit('delete_user_from_list', user);
		delete users[socket.id];

		// io.sockets.emit('easter_egg', {
		// 	name: 'userdisconnect.mp3',
		// });
	});

	// Réception d'un message
	socket.on('message', function (message) {
		// youtubeBot.youtubeSearch(io, message);
		// Par sécurité, on encode les caractères spéciaux
		message = ent.encode(message);

		message = smileys.handleSmileys(message);

		// Transmet le message à tous les utilisateurs (broadcast)
		socket.emit('new_message', { name: socket.name, message: message, new_avatar: socket.avatar, isMe: true });
		socket.broadcast.emit('new_message', { name: socket.name, message: message, new_avatar: socket.avatar, isMe: false });

		history.addToHistory(socket.name, message, socket.avatar);

		// Transmet le message au module Daffy (on lui passe aussi l'objet "io" pour qu'il puisse envoyer des messages)
		daffy.handleDaffy(io, message);
		// easterEggs.handleEasterEggs(io, message);
		jack.handleJack(io, message, ent);
		bulles.handleBulles(message, ent);
		quizz.handleQuizz(io, message);
		wizz.handleWizz(io, message);
		meteo.handleMeteo(io, message);
		jukebox.handleJukebox(io, message);
		bimbamboom.handleBimbamboom(io, message);
		gif.handleGif(io, message);
	});

	//User écrit
	socket.on("is_typing", function (isTyping) {

		typing.handleTyping(io, socket, isTyping);
	});

	// Réception d'un fichier
	socket.on('file', function (tabFiles) {
		upload.handleUpload(io, tabFiles, socket);
	});

	socket.on('clickBulle', function (id) {
		bulles.destroyBulle(id, socket);
	});

});

// lance le serveur sur le port 5000
server.listen(5000);