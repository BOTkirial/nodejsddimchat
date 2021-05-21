//permet de faire bouger la fenêtre

/*
 * Nom : Wizz
 * Description : Fait vibrer l'écran quand on entre :wizz dans le chat.
 * Auteur(s) : Rioky Ya nak, Dylan Louvet
 */

module.exports =  {
	handleWizz: handleWizz // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

function handleWizz(io,message) {
    // Passe le message en minuscules (recherche insensible à la casse)
    message = message.toLowerCase();
        
    // Est-ce qu'il contient une référence à Wizz ?
    if (message.includes('wizz'))
    {
        // Si oui, envoie la réponse de Wizz...
        io.sockets.emit('wizz');
    }
}