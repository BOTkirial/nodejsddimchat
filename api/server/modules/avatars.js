/*
 * Nom : Avatars !
 * Description : Ajoute ton avatar !
 * Auteur(s) : Mathieu BARCO Elie GAREZ
 */

var fs = require('fs');			// Accès au système de fichier
var path = require('path');		// Gestion des chemins d'accès aux fichiers

module.exports =  {
    handleAvatars: handleAvatars, // permet d'appeler cette méthode dans server.js -> Avatars.handleAvatars(...)
    deleteAvatars: deleteAvatars // permet d'appeler cette méthode dans server.js -> Avatars.deleteAvatars(...)
}

function handleAvatars(avatar, socket)
{
	// enregistrer avatar
	var file = socket.id + '.gif';
	fs.writeFile(path.resolve(__dirname + '/../../../src/assets/upload/'+file), avatar, function(err)
	{
		if(err)
		{
			return console.log(err);
		}
	});
	// Stocke l'avatar' dans l'objet socket
	// socket.avatar = '/upload/'+file;
	socket.avatar = '/upload/'+file;
}

//Supprime l'avatar à la deconnexion
function deleteAvatars(avatar, socket)
{
    var file = socket.id + '.gif';
    if (socket.avatar === undefined || socket.avatar === null)
	{

    }
    else
	{
        fs.unlinkSync(path.resolve(__dirname + '/../../../src/assets/upload/'+file), avatar, function(err)
		{
            if(err)
                return console.log(err);
        });
    }
}
