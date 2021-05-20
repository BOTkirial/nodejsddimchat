var fs = require('fs');

module.exports =  {
	handleUpload: handleUpload // permet d'appeler cette méthode dans server.js -> upload.handleUpload(...)
}

function handleUpload(io, tabFiles, socket) {
			var filePath = "../client/assets/upload/" + tabFiles.name;
			fs.writeFile(filePath, tabFiles.data, function(err) {

				if(err) {
					return console.log(err);
				}
				var chooseType = function(tabFiles){
					if (tabFiles.type == 'application/pdf'){
						io.sockets.emit('new_message', {name:socket.name,
							message:"<br><i class='fa fa-file-pdf-o' style='font-size:72px;color:red'></i><br>"
								+ "<a href=" + encodeURI(tabFiles.name) 
								+ " id='fileButton' download >Download</a>"
						});

				} else if (tabFiles.type == 'image/jpeg' ||  tabFiles.type == 'image/png' || tabFiles.type == 'image/gif'){
						io.sockets.emit('new_message', {name:socket.name,
							message:"<br><img class='sharedFile' src=" + encodeURI(tabFiles.name) + "><br>"
								+ "<a href=" + encodeURI(tabFiles.name) 
								+ " id='fileButton' download >Download</a>"
						});
					
				} else if (tabFiles.type == 'video/mp4' || tabFiles.type == 'video/mpeg' || tabFiles.type == 'video/x-msvideo' || tabFiles.type == 'video/ogg' || tabFiles.type == 'video/webm'){
						io.sockets.emit('new_message', {name:socket.name,
							message:"<br><video autoplay loop width='256px' height='256px'><source src=" + encodeURI(tabFiles.name) + "></video><br>"
								+ "<a href=" + encodeURI(tabFiles.name) 
								+ " id='fileButton' download >Download</a>"
						});

				} else if (tabFiles.type == 'audio/x-wav' || tabFiles.type == 'audio/ogg' || tabFiles.type == 'audio/webm' || tabFiles.type == 'audio/aac'){
					io.sockets.emit('new_message', {name:socket.name,
						message:"<br><i class='fa fa-file-audio-o' style='font-size:72px;color:black'></i><br>"
							+ "<a href=" + encodeURI(tabFiles.name) 
							+ " id='fileButton' download >Download</a>"
						});	

				} else if (tabFiles.type == 'application/x-rar-compressed' || tabFiles.type == 'application/x-tar' || tabFiles.type == 'application/zip' || tabFiles.type == 'application/x-7z-compressed' || tabFiles.type == 'application/x-zip-compressed'){
					io.sockets.emit('new_message', {name:socket.name,
						message:"<br><i class='fa fa-file-archive-o' style='font-size:72px;color:black'></i><br>"
							+ "<a href=" + encodeURI(tabFiles.name) 
							+ " id='fileButton' download >Download</a>"
						});	

				} else if (tabFiles.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || tabFiles.type == 'application/msword') {
					io.sockets.emit('new_message', {name:socket.name,
						message:"<br><i class='fa fa-file-word-o' style='font-size:72px;color:blue'></i><br>"
							+ "<a href=" + encodeURI(tabFiles.name) 
							+ " id='fileButton' download >Download</a>"
						});	
						
				} else if (tabFiles.type == 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || tabFiles.type == 'application/vnd.ms-powerpoint') {
					io.sockets.emit('new_message', {name:socket.name,
						message:"<br><i class='fa fa-file-powerpoint-o' style='font-size:72px;color:red'></i><br>"
							+ "<a href=" + encodeURI(tabFiles.name) 
							+ " id='fileButton' download >Download</a>"
						});	
				} else if (tabFiles.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || tabFiles.type == 'application/vnd.ms-excel') {
					io.sockets.emit('new_message', {name:socket.name,
						message:"<br><i class='fa fa-file-excel-o' style='font-size:72px;color:green'></i><br>"
							+ "<a href=" + encodeURI(tabFiles.name) 
							+ " id='fileButton' download >Download</a>"
						});	
				} else {
					io.sockets.emit('new_message', {name:socket.name,
						message:"<br><i class='fa fa-file-text-o' style='font-size:72px;color:black'></i><br>"
							+ "<a href=" + encodeURI(tabFiles.name) 
							+ " id='fileButton' download >Download</a>"
						});	
				}
			};
				chooseType(tabFiles);
			}); 
}