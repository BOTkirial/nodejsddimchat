/*
 * Nom : Bim Bam Boom
 * Description : ça fait pshit et ça fait vroum
 * Auteur(s) : Team bim bam boom
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleBimbamboom: handleBimbamboom // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

/**
 * Lorsqu'on appelle bim bam boom dans ta tête il y a tout qui tourne
 */
function handleBimbamboom(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();
	if (message.includes('bim bam boum') || message.includes('bim bam boom'))     // Est-ce qu'il contient une référence à Bim bam boom?
	{
		// Si oui, envoie la réponse de jujufitcat...
		io.sockets.emit('bimbamboom',
		{
            name: "bimbamboomfull"
		});
		io.sockets.emit('new_message',
			{
				name: 'Jujufitcat',
				new_avatar: '/modules/bimbamboom/juju.gif',
				message: '<span class="rainbow_text_animated">Et ça fait bim, bam, boum <br>Ça fait psht et ça fait vroum <br>Ça fait bim, bam, boum <br>Dans ma tête, y\'a tout qui tourne <br>Ça fait shht et puis blabla <br>Ça fait comme ci, comme ça <br>Ça fait bim, bam, hahaha</span>'
			}
		)
	} else if (message.includes('pshit'))     // Est-ce qu'il contient une référence à pshit ?
	{
		// Si oui, envoie la réponse de jujufitcat...
		io.sockets.emit('bimbamboom',
		{
            name: "pshit"
		});
		io.sockets.emit('new_message',
			{
				name: 'Jujufitcat',
				new_avatar: '/modules/bimbamboom/juju.gif',
				message: '<span class="rainbow_text_animated">ça fait pshit</span>'
			}
		)
	} else if (message.includes('vroum'))     // Est-ce qu'il contient une référence à vroum ?
	{
		// Si oui, envoie la réponse de jujufitcat...
		io.sockets.emit('bimbamboom',
		{
            name: "vroum"
		});
		io.sockets.emit('new_message',
			{
				name: 'Jujufitcat',
				new_avatar: '/modules/bimbamboom/juju.gif',
				message: '<span class="rainbow_text_animated">ça fait vroum</span>'
			}
		)
	} else if (message.includes('comme') || message.includes('si') || message.includes('ça'))     // Est-ce qu'il contient une référence à comme si comme ça ?
	{
		// Si oui, envoie la réponse de jujufitcat...
		io.sockets.emit('bimbamboom',
		{
            name: "commesi"
		});
		io.sockets.emit('new_message',
			{
				name: 'Jujufitcat',
				new_avatar: '/modules/bimbamboom/juju.gif',
				message: '<span class="rainbow_text_animated">Comme si comme ça</span>'
			}
		)
	} else if (message.includes('tourne'))     // Est-ce qu'il contient une référence à tout qui tourne ?
	{
		// Si oui, envoie la réponse de jujufitcat...
		io.sockets.emit('bimbamboom',
		{
            name: "toutquitourne"
		});
		io.sockets.emit('new_message',
			{
				name: 'Jujufitcat',
				new_avatar: '/modules/bimbamboom/juju.gif',
				message: '<span class="rainbow_text_animated">Dans ma ma y\'a tout qui tourne</span>' 
			}
		)
	} else if (message.includes('bim') || message.includes('bam') || message.includes('boom') || message.includes('boum'))		// Est-ce qu'il contient une référence à Bim, bam ou boom ?
	{
		// Si oui, envoie la réponse de Jujufitcat...
		io.sockets.emit('bimbamboom',
		{
            name: "bimbamboomshort"
		});
		io.sockets.emit('new_message',
			{
				name: 'Jujufitcat',
				new_avatar: '/modules/bimbamboom/juju.gif',
				message: '<span class="rainbow_text_animated">Et ça fait bim bam boum</span>'
			}
		)
	}
}
