/*
 * Nom : Bim bam boom
 * Description :  ça fait pshit et ça fait vroum
 * Auteur(s) : Team bim bam boom
*/


socket.on('bimbamboom', bimbamboom);


function bimbamboom(data){
    if(typeof window.audio !== "undefined"){
        window.audio.pause();
        window.audio.curentTime = 0;
    }
    window.audio = new Audio('modules/bimbamboom/audio/' + data.name +'.mp3');
    window.audio.play();
}