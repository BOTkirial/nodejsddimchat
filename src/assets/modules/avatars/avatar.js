
// Envoie le fichier photo au serveur
$("#avatarUpload").change(function () {
    var avatar = $("#avatarUpload").prop('files')[0];
    socket.emit('new_avatar', avatar);
    console.log("uploadé : " + avatar);
});
