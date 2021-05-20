
socket.on('barrel', barrelSon);
socket.on('easter_egg', easterEgg)

//lance le son du wizz
var audioBarrel = new Audio('modules/easter-eggs/roll.mp3');

var audioCount = 0;



function easterEgg(data) {
    if (typeof window.audio !== "undefined") {
        window.audio.pause();
        window.audio.currentTime = 0;
    }
    window.audio = new Audio('modules/easter-eggs/' + data.name);
    window.audio.play();
}


function barrelSon() {
    if (audioCount < 1) {
        audioBarrel.play();
        $('body').css('transition', 'transform 1s');
        $('body').css('transform', 'rotate(360deg)');
        audioCount++;
    }
    else {
        audioBarrel.play();
        $('body').css('transform', 'rotate(0deg)');
        audioCount = 0;
    }
}
