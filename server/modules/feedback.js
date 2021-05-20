/*
 * Nom : feedback
 * Description : module pour feedback lorsque user écrit
 * Auteur(s) : team feedbackeurs
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleTyping:handleTyping // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

/**
 * Si l'user est en train d'écrire un message apparait
 */

//broadcast aux user le fait que qq est en train d'écrire
function handleTyping(io, socket, isTyping)
{
	socket.broadcast.emit('who_typing',
	{
		typing_socket_name:socket.name,
		typing_socket_id:socket.id,
		isTyping:isTyping
	})
}
