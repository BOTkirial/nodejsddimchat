// Définit les méthodes qui vont être appelées dans server.js
module.exports = 
{
    youtubeSearch : youtubeSearch
}

/**     
* Fonction permettant de lire des vidéo
*/
function youtubeSearch ( io, message )
{
	var found = false;
	
    if (message.startsWith("je veux regarder "))
	{
        message = message.slice(17);
		found = true;
	}
	else if (message.startsWith("youtube"))
	{
        message = message.slice(7);
		found = true;
	}
	
    if (found)
    {
        var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+message+'&type=video&key=AIzaSyAvQIK1HB0wKlkc1ObX-J9hOh_JyrtKeaM'  
        var request = require ( 'request' );
        var videoId;

        //Envoie de la requête
        request.get ( url, function ( error, response, body ) 
        {
            if ( !error )
            {
                //Affichage de la réponse de l'API   
                _body = JSON.parse(body);

                if ( _body && _body.items && _body.items[0] && _body.items[0].id )
                {
                    videoId = _body.items[0].id.videoId;

                    let msg = 
                    { 
						new_avatar:'youtube.png',
                        name:'',
                        message:"<iframe width='280' height='200' src='https://www.youtube.com/embed/"+videoId+"' frameborder='0' allow='accelerometer; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe>"
                    };
					
                    io.sockets.emit('new_message', msg);
                }
                else
                {
                    io.sockets.emit('new_message',
                    {
						new_avatar:'youtube.png',
                        name:'',
                        message: 'Désolé, je n\'ai pas trouvé de vidéo...'  
                    });
                }
            }
            else
                console.log( error );
        });
    } 
}