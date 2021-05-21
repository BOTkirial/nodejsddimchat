/*
 * Nom : Smileys !
 * Description : ...!
 * Auteur(s) : Camille Grosjean & Maeva Mezzasalma
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleSmileys: handleSmileys // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

/**
 * ...
 */
function handleSmileys(message)
{
    message = message.replace(':p','<span class="un"></span>');
    message = message.replace('xD','<span class="deux"></span>');
    message = message.replace(':)','<span class="trois"></span>');
    message = message.replace(".;",'<span class="quatre"></span>');
    message = message.replace(':z','<span class="cinq"></span>');
    message = message.replace(":&#39;)",'<span class="six"></span>');
    message = message.replace(":/",'<span class="sept"></span>');
    message = message.replace(':D','<span class="huit"></span>');
    message = message.replace('x.x','<span class="neuf"></span>');
    message = message.replace('*.*','<span class="dix"></span>');
    message = message.replace(':@','<span class="onze"></span>');
    message = message.replace("XwX",'<span class="douze"></span>');
    message = message.replace("^^&#39;",'<span class="treize"></span>');
    message = message.replace(":*",'<span class="quatorze"></span>');
    message = message.replace('x&#39;)','<span class="vingthuit"></span>');
    message = message.replace(";)",'<span class="quinze"></span>');
    message = message.replace('T.T','<span class="seize"></span>');
    message = message.replace('^^','<span class="dixsept"></span>');
    message = message.replace(':(','<span class="dixhuit"></span>');
    message = message.replace('8)','<span class="dixneuf"></span>');
    message = message.replace("x_x",'<span class="vingt"></span>');
    message = message.replace(':&#39;(','<span class="vingtun"></span>');
    message = message.replace("o///o",'<span class="vingtdeux"></span>');
    message = message.replace(":.",'<span class="vingtrois"></span>');
    message = message.replace('-_-','<span class="vingtquatre"></span>');
    message = message.replace(':#','<span class="vingtcinq"></span>');
    message = message.replace(":o",'<span class="vingtsix"></span>');
    message = message.replace(':3','<span class="vingtsept"></span>');
    message = message.replace(";D",'<span class="vingtneuf"></span>');
    message = message.replace('0)','<span class="trente"></span>');
    
    message = message.replace('pepemoji','<span class="pepemoji"></span>');
    message = message.replace('pepechoque','<span class="pepechoque"></span>');
    message = message.replace('pepecool','<span class="pepecool"></span>');
    message = message.replace("pepelarme",'<span class="pepelarme"></span>');
    message = message.replace('pepesad','<span class="pepesad"></span>');
    message = message.replace("pepelove",'<span class="pepelove"></span>');
    message = message.replace("pepeniais",'<span class="pepeniais"></span>');
    message = message.replace('pepemdr','<span class="pepemdr"></span>');
    return message;
}

