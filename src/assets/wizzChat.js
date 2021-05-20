socket.on('wizz', startWizz);
$('#wizz-button').click(startWizz);
$('#wizz-button').click(sendCliqueWizz);

var colorChat, colorMsg, colorBody;
//recup les couleurs de bases
$(function(){ 
	colorChat = $('#chat').css('background-color');
	colorMsg = $('#messages').css('background-color');
	colorBody = $('body').css('background-color');
});

function sendCliqueWizz()
{
	// Envoi le message au serveur pour broadcast
	socket.emit('message', 'Wizz !');
}

//lance le son du wizz
var audioWizz = new Audio('modules/wizz/sonsonsosn.mp3');
var audioChute = new Audio('modules/wizz/silence.mp3');

var audioCount = 0;
function wizzSon()
{
	if(audioCount <= 2)
	{
		audioWizz.play();
		setTimeout(wizzSon, 600);
		audioCount += 1;
	}else{
		audioCount = 0;
	}
}

//Gere les fonctions du wizz
function startWizz()
{
	wizzChat();
	wizzSon();
	changeColor();
}

var colorCount = 0;
//Permet de changer les couleurs des différentes parties aléatoirement
function changeColor()
{
	if(colorCount <= 70)
	{
		var r = Math.floor(Math.random() * Math.floor(255));
		var g = Math.floor(Math.random() * Math.floor(255));
		var b = Math.floor(Math.random() * Math.floor(255));

		var rbody = Math.floor(Math.random() * Math.floor(255));
		var gbody = Math.floor(Math.random() * Math.floor(255));
		var bbody = Math.floor(Math.random() * Math.floor(255));

		var rmsg = Math.floor(Math.random() * Math.floor(255));
		var gmsg = Math.floor(Math.random() * Math.floor(255));
		var bmsg = Math.floor(Math.random() * Math.floor(255));

		$('#chat').css('background-color', 'rgb('+ r +','+ g +','+ b +')');
		$('body').css('background-color', 'rgb('+ rbody +','+ gbody +','+ bbody +')');
		$('#messages').css('background-color', 'rgb('+ rmsg +','+ gmsg +','+ bmsg +')');
		setTimeout(changeColor, 25);
		colorCount +=1;
	}else{
		$('body').css('background-color', colorBody);
		$('#chat').css('background-color', colorChat);
		$('#messages').css('background-color', colorMsg);
		colorCount = 0;
	}
	
	
}

var sensWizz = 1;
var wizzCount = 0;
//Permet de faire vibrer le chat
function wizzChat()
{
	if(wizzCount <= 70)
	{
		$('#chat').css('transform','rotate(' + sensWizz + 'deg)');
		$('body').css('transform','rotate(' + sensWizz + 'deg)');
		sensWizz *= -1;
		setTimeout(wizzChat, 25);
		wizzCount +=1;
	}else{
		$('#chat').css('transform','rotate(0deg)');
		$('body').css('transform','rotate(0deg)');
		wizzCount = 0;
	}
	
}