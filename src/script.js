// Connexion au socket
var socket = io.connect(':5000');

// Demande un pseudo et envoie l'info au serveur
var name = prompt('Quel est votre pseudo ?', 'User' + Math.floor(Math.random() * 9999));
socket.emit('user_enter', name);

// Gestion de l'historique
socket.on('history', setHistoryMessages);

// Gestion des événements diffusés par le serveur
socket.on('new_message', receiveMessage);
socket.on('delete_user_from_list', deleteUserFromList);
socket.on('load_users_list', loadUsersList);

// Action quand on clique sur le bouton "Envoyer"
$('#send-message').click(sendMessage);

// Gestion des événements diffusés par le serveur
socket.on('receive_erase', erase);
socket.on('receive_color', changeColor);

// Action quand on appuye sur la touche [Entrée] dans le champ de message (= comme Envoyer)
$('#message-input').keyup(function (evt) {
	if (evt.keyCode == 13) // 13 = touche Entrée
		sendMessage();
});

$('#filetoupload').change(function () {

	var fileData = $("#filetoupload")[0].files[0];
	var fileName = fileData.name;
	var fileType = fileData.type;
	var tabFiles = {
		data: fileData,
		name: fileName,
		type: fileType
	}

	socket.emit('file', tabFiles);
});

if (Notification.permission !== "granted")
	Notification.requestPermission();


/**
 * Envoi d'un message au serveur
 */
function sendMessage() {
	// Récupère le message, puis vide le champ texte
	var input = $('#message-input');
	var message = input.val();
	input.val('');

	// On n'envoie pas un message vide
	if (message == '')
		return;

	// Envoi le message au serveur pour broadcast
	socket.emit('message', message);
}

/**
 * Affichage d'un message reçu par le serveur
 */
function receiveMessage(data) {
	if (typeof (data.new_avatar) == 'undefined')
		data.new_avatar = 'defautMan.svg';
	var className = '';

	if (data.name == name) {
		className = 'monMessage';
	}

	console.log(data.new_avatar)

	$('#chat #messages').append(
		'<div class="message ' + className + '">'
		+ '<div class="avatar" style="background-image:url(' + data.new_avatar + '?' + Date.now() + '), url(defautMan.svg);"> </div>'
		+ '<div class="message_container"><span class="user">' + data.name + '</span>  '
		+ '<p class="contenu_message">' + data.message + '</p>  '
		+ '</div></div>'
	)
		.scrollTop(function () { return this.scrollHeight });  // scrolle en bas du conteneur

	if (!data.isMe) {
		trySendNotification(data);
	}
}

function trySendNotification(data) {
	if (!("Notification" in window) || Notification.permission == 'denied')
		return;

	var message = data.message;
	if (message.length > 40) message = message.substr(0, 40) + '...';
	new Notification(data.name + ' : ' + message);
}

function deleteUserFromList(data) {
	let id = data.id;
	let element = document.getElementById(id);

	if (element != null) {
		element.remove();
	}
}

function loadUsersList(data) {
	var list = $("#users-list-container");
	list.empty();

	for (let user in data) {
		let name = data[user].name;
		let fullPseudo = data[user].name;
		let avatar = data[user].avatar || "defautMan.svg";

		if (name.length >= 13) {
			name = textMinimizer(data[user].name);
		}

		var listItem = $(`<div class="users-list-item" id="${data[user].id}" title="${fullPseudo}">
							<div class="users-list-item-picture" style="background-image:url(${avatar}?${Date.now()});"></div>
							<div class="users-list-item-name">${name}</div>
							<div class="users-list-item-status" style="display: none"><img src="lapiz.png" width="30" height="30px"></div>
						</div>`);
		list.append(listItem);
	}

}

socket.on("upload_personal_avatar", updatePersonalAvatar);

function updatePersonalAvatar(avatar) {
	console.log("final : " + avatar);
	$("#imageAvatar").attr('style', `background-image:url(${avatar}?${Date.now()});`);
}

function textMinimizer(str) {
	let content = str.substr(0, 10);

	return content + `<span fullPseudo='${str}' class='showFullName'>...</span>`;
}

function erase(effacer) {
	if (effacer) {
		ctx.clearRect(0, 0, w, h);
	}
}

function changeColor(data) {
	ctx.strokeStyle = data.colorX;
	ctx.lineWidth = data.colorY;
}

$('#btn-help').click(function () {
	$(this).hide();
	$(this).siblings('.inner').show();
});

$('#btn-close-help').click(function () {
	$(this).parent('.inner').hide();
	$('#btn-help').show();
});

$('#smiley').click(clickSmiley);
$('span').click(sendSmiley);

function clickSmiley() {
	$('#smiley-list').toggleClass('smiley-container');
}

function sendSmiley() {
	var smiley = $(this).data('smiley');

	if (typeof (smiley) == undefined)
		return;
	;
	$('#smiley-list').toggleClass('smiley-container');
	socket.emit('message', smiley);
}

$('#bulle-button').click(function () {
	socket.emit('message', 'bulle');
});

/**
 * Réafficher tout les anciens messages via l'historique
 */
function setHistoryMessages(data) {
	for (let i = 0; i < data.history.length; ++i) {
		var msg = data.history[i];
		msg.isMe = true; // <- pour éviter les notifications
		receiveMessage(msg);
	}
}

// récupère le clic sur l'engrenage
document.querySelector("#changeName").addEventListener("click", function () {
	var nom = window.prompt("c'est quoi ton nom ?");
	console.log(nom);
	if (nom == "" || nom == null) {
		console.log("om invalide");
	} else {
		name = nom;
		socket.emit('user_name_change', name);
	}
});


/**
 * Vérifie si une variable est "set" (pas undefined)
 */
function isset(val) {
	return typeof (val) != 'undefined';
}
