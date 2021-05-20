module.exports =  {
	handleJukebox: handleJukebox // permet d'appeler cette méthode dans server.js -> jukebox.handleJukebox(...)
}

/**
 */
function handleJukebox(io, message)
{
	message = message.toLowerCase();
	
	if (message.includes('tu'))
	{
		io.sockets.emit('new_message',
		{
			name:'BOOOM BOOOM BOOOM',
            message:"<audio autoplay> <source src='boom.mp3'> </audio>"
		});
	}
}
