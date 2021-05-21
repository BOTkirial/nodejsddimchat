/*
 * Nom : Gif
 * Description : Ce module permet de rechercher un gif et de l'envoyer
 * Auteur(s) : Maëva MEZZASALMA Camille GROSJEAN
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleGif: handleGif // permet d'appeler cette méthode dans server.js -> gif.handleGif(...)
}


function handleGif(io,message){
    // Passe le message en minuscules (recherche insensible à la casse)
    message = message.toLowerCase();

    if(message.includes('gif')) {

        message = message.slice(4);

        var giphy = require('giphy-api')();

        giphy.search(message, function (err, res) {

            // console.log(res);

            if(res == undefined ) {
                return;
            }

            if(res.pagination.count == 0) {
                return;
            }

            io.sockets.emit('new_message',
            {
                name:'Giphy',
								new_avatar: '/giphy.gif',
                message:'<iframe id="gif" src="'+res.data[0].embed_url+'"/>'
            })
            // console.log(res.data[0].id);
        });
    };

}
