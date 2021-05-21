/*
 * Nom : Jack Sparrow
 * Description : Il répond à une liste de mots-clef. Lorsque l'un d'eux est detecté, il répond avec une citation.
 * Auteur(s) : Antoine & Cédric
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleJack: handleJack // permet d'appeler cette méthode dans server.js -> daffy.handleDaffy(...)
}

 // tableau qui associe une citation à un mot clef
 var tabCitations = {
    "interdit" : "- Ce quai est strictement interdit aux civils !<br> - J’en savais rien, je vous demande pardon. Si j’en vois un, je vous en informerai immédiatement.",
    "moi" : "Moi ? Je suis malhonnête ! Et on sait qu’un homme malhonnête le restera quoi qu’il arrive… Honnêtement, ce sont des hommes honnêtes dont il faut se méfier, parce qu’on peut jamais prévoir à quel moment il feront un truc incroyablement… stupide.",
    "remarque" : "Tu ne remarques rien ? Ou plutôt ne remarques-tu pas l’absence de ce que tu devrais remarquer ?",
    "génie" : "-Soit c’est du génie, soit c’est de la folie.<br>- Ce qui est le plus marrant, c’est que le plus souvent, ces deux choses vont ensemble.",
    "vérité" : "-Vous disiez la vérité !<br>- Ça m’arrive très souvent. Je comprends pas pourquoi ça vous étonne.",
    "malade" : "- Vous êtes malade !<br>- Et j’en remercie le ciel parce que autrement je ne pourrais pas faire ça !",
    "rhum" : "- Vous avez passé trois jours sur une plage à boire du Rhum ?<br>- Bienvenue aux caraïbes mon ange !",
    "voler" : "- On va voler l’navire ? Ce navire ?<br>- Réquisitionner. On « réquisitionne » ce « bâtiment », termes nautiques.",
    "barbe" : "Fusillez-le ! Coupez-lui la langue ! Fusillez sa langue ! Et coupez cette vilaine barbe !",
    "poule" : "Ma poule ça c’est un canot. Mon vaisseau est magnifique et féroce et énorme et… et ailleurs. Pourquoi ailleurs ?",
    "trésor" : "Tous les trésors ne sont pas d’argent et d’or…",
    "rêve" : "- Est-ce que je rêve ?<br>- Non… <br> - J’m’en doutais. Si j’rêvais y’aurait du rhum !",
    "ami" : "Vous pouvez me tuer mon ami, mais ne m’insultez pas !",
    "apero" : "Ma cacahuète !",
    "insulter" : "- Jack Sparrow, vous m’avez gravement insulté autrefois…<br>- Oh ça, ça ne me ressemble pas.",
    "tuer" : "Pourquoi je voudrais naviguer avec vous ? Vous êtes quatre à avoir essayé de me tuer, l’un de vous a réussi !",
    "faux" : "- C’est de la barbarie !<br>- C’est de la politique !",
    "stop" : "Personne ne bouge, j’ai perdu ma cervelle !",
    "venir" : "Dans ce cas tu ne serais surement pas venu. Donc tu n’es pas là. CQFD. T’es pas vraiment là !",
    "soirée" : "J’organise une magnifique réception et vous n’êtes pas invités.",
    "boire" : "Et je n’ai même pas eu besoin de boire une seule goute de rhum !",
    "qui " : "- Qui suis-je ?<br>- Je suis le Capitaine Jack Sparrow !",
    "parler" : "- Vous êtes sans nul doute le pirate, le plus pitoyable dont on m’ait parlé.<br>- Au moins, on vous a parlé de moi.",
    "journée" : "Que cette journée reste à jamais celle où vous avez FAILLI capturer le capitaine Jack Sparrow"
    }

function handleJack(io, message, ent)
{
	// Passe le message en minuscules (recherche insensible à la casse)
    message = message.toLowerCase();

    // parcours tous les mots clefs du tableau
    for (var motClef in tabCitations)
    {
        // récupère la citation correspondant au mot clef
        var currentCitation = tabCitations[motClef];

        // encode les mots clefs car ils sont encodés dans le chat
        motClef = ent.encode(motClef);

        // vérifie la présence du mot clef actuel
        if (message.includes(motClef))
        {
            // si il est présent, écrit la citation correspondante après une seconde
             setTimeout(function()
             {
                io.sockets.emit('new_message',
                {
                    name:'Jack Sparrow',
										new_avatar: '/modules/jack/jackFace.jpg',
                    message:'<span class="jacksparrow">' + currentCitation +'</span>'
                });
            }, 1000);
            // sors de la boucle
            break;
        }
    }

}
