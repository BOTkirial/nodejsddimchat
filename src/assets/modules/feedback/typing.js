/*
 * Nom : feedback
 * Description : module pour feedback lorsque user écrit
 * Auteur(s) : team feedbackeurs
*/

var tabTyping = [];

    //var isTyping = false;
var timeout;
var messageValue = $('#message-input').val();

//envoie au serv que le client commence à taper
$('#message-input').on("keypress", function()
{
    if(messageValue !=$('#message-input').val())
	{
       messageValue = $('#message-input').val();
       //isTyping = true;
       //Si le client est entrain de taper, on annule le timeout de 3scd sur le
       //fait qu'il ai relaché une touche.
       clearTimeout(timeout);
       socket.emit("is_typing",true);
    }
});

//--------------------------------A FAIRE --------------------------
//Quand un user se co, il broadcast son pseudo a tt le monde et tt le monde lui
//broadcast leurs pseudo en retour.

//après avoir recup nom users connectés
//user en train de taper passe a TRUE et on affiche qu'il est en train de taper

//Partie 2 où l'user est en train d'arrêter de taper.

//Récupère le fait que quelqu'un est en train de taper.

socket.on('who_typing',who_typing);

function who_typing(data)
{
    if(data.isTyping){
        tabTyping[data.typing_socket_id] = data.typing_socket_name;

        $(`div[pseudo="${data.typing_socket_name}"]`).find('.users-list-item-status').show();
    }
	else{
       delete tabTyping[data.typing_socket_id];
    }
	
    var cpt = 0;
    var string = "";
    $('#is_typing').html(string);
	
    if(Object.keys(tabTyping).length == 1){
        Object.keys(tabTyping).forEach(function(key,index){
          string += this[key];
        },tabTyping);
    }
	else if(Object.keys(tabTyping).length == 2){
        Object.keys(tabTyping).forEach(function(key,index){
            cpt++;
            if(cpt==1){
                string += this[key];
            }else{
                string += ' et '+this[key];
            }
        },tabTyping);
    }
	else if(Object.keys(tabTyping).length > 2){
        var nbPersonnes = Object.keys(tabTyping).length;
        nbPersonnes -= 2;
        var cpt2=0;
        Object.keys(tabTyping).forEach(function(key,index){
            cpt++;
            if(cpt==1){
                string += this[key];
            }else if(cpt == 2){
                string += ', '+this[key];
            }else if(cpt > 2 && cpt2 == 0){
                cpt2++;
                string += ' et ' + nbPersonnes + ' autres personnes';
            }
        },tabTyping);
    }

    if(Object.keys(tabTyping).length == 1){
        string +=  ' est';
    }else{
        string += ' sont';
    }
	
    string += ' en train d\'écrire';
	
    if(Object.keys(tabTyping).length == 0){
        var string = "";
    }
	
    $('#is_typing').html(string);  // A DEBUG
}

//le client arrête de taper
$('#message-input').on("keyup", function(){
    //lorsque le client releve une touche, attente de 3scd avant delete le msg
    timeout = setTimeout(function(){
        $('.users-list-item-status').hide();
        socket.emit("is_typing", false);
    }, 1000);
});





