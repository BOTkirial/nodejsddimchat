/*
 * Nom : Daffy !
 * Description : Plein d'easter eggs marrant (ou pas) !
 * Auteur(s) : Mathieu BARCO Elie GAREZ
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleEasterEggs: handleEasterEggs // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

/**
 * Lorsqu'on appelle Daffy, il répond...
 */
function handleEasterEggs(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
    message = message.toLowerCase();

    if (message.includes('ah') || message.includes('ha'))
    {
        // Si oui, envoie la réponse de Wizz...
        io.sockets.emit('easter_egg',{
			name:'ahhhhh.wav',
        });
        
        io.sockets.emit('new_message',
		{
			name:'Jimmy Barnes ',
            message:'<span>AAAAAAAAAAAAAHHHH</span>',
            new_avatar : '/modules/easter-eggs/AAAAAAh.jpg'
		});
    }
    
    if (message.includes('barrel roll'))
    {
        // Si oui, envoie la réponse de Wizz...
        io.sockets.emit('barrel')

        io.sockets.emit('new_message',
		{
			name:'Peppy ',
            message:'<span>Do a barrel roll</span>',
            new_avatar : '/modules/easter-eggs/barrel.jpg'
		});
    }

		if (message.includes('uh'))
    {
        // Si oui, envoie la réponse de Wizz...
        io.sockets.emit('easter_egg',{
			name:'THWOMP.wav',
        });
        
        io.sockets.emit('new_message',
		{
			name:'THWOMP ',
            message:'<span>UH</span>',
            new_avatar : '/modules/easter-eggs/THWOMP.png'
		});
    }

    if (message.includes('wtf'))
    {
        // Si oui, envoie la réponse de Wizz...
        io.sockets.emit('easter_egg',{
			name:'wtf.mp3',
        });
        
        io.sockets.emit('new_message',
		{
			name:'Bruce U ',
            message:'<span>What the fu-</span>',
            new_avatar : '/modules/easter-eggs/WTF.jpg'
		});
    }
    
    if (message.includes('oof'))
    {
        // Si oui, envoie la réponse de Wizz...
        io.sockets.emit('easter_egg',{
			name:'oof.mp3',
        });

        io.sockets.emit('new_message',
		{
			name:'Roblox Death sound ',
            message:'<span>OOF</span>',
            new_avatar : '/modules/easter-eggs/OOF.png'
		});
       
        
    }

    if (message.includes('arabic'))
    {
        // Si oui, envoie la réponse de Wizz...
        io.sockets.emit('easter_egg',{
			name:'NokiaArabicRingtone.wav',
        });
        
        io.sockets.emit('new_message',
		{
			name:'Nokia Ringtone ',
            message:'<span>Incoming call</span>',
            new_avatar : '/modules/easter-eggs/arabic_nokia.jpg'
		});
    }

    if (message.includes('bruce lee') || message.includes('bruce u'))
    {
        // Si oui, envoie la réponse de Wizz...
        io.sockets.emit('easter_egg',{
			name:'bruce.mp3',
        });
        
        io.sockets.emit('new_message',
		{
			name:'Bruce U ',
            message:'<span>Ugandan Bruce Lee. We call him Bruce U</span>',
            new_avatar : '/modules/easter-eggs/Bruce_U.png'
		});
    }
} 