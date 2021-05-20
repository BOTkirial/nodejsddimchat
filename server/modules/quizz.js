/*
 * Nom : Quizz !
 * Description : Pose des questions pour tout le monde ! 
 * Auteur(s) : Mathieu BARCO Elie GAREZ
 */

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleQuizz: handleQuizz // permet d'appeler cette méthode dans server.js -> daffy.handleQuizz(...)
}

var reponse;
// récupère la question et les réponses de l'api 
    function getQuizz(io, message) {
        const request = require('request');
        request('https://opentdb.com/api.php?amount=1', { json: true }, (err, res, body) => {
          if (err) { return console.log(err); }
          reponse = body.results[0].correct_answer;
// Range les différentes propositions dans le désordre 
          if (body.results[0].type == "multiple") {
            reponse2 = body.results[0].incorrect_answers[0];
            reponse3 = body.results[0].incorrect_answers[1];
            reponse4 =  body.results[0].incorrect_answers[2];

            var possibiliteChiffre = Math.floor(Math.random() * 4) + 1;

            var possibilite1 = reponse + ', ' + reponse2  + ', ' + reponse3 + ', ' + reponse4;
            var possibilite2 = reponse3 + ', ' + reponse2  + ', ' + reponse + ', ' + reponse4;
            var possibilite3 = reponse4 + ', ' + reponse  + ', ' + reponse2 + ', ' + reponse3;
            var possibilite4 = reponse2 + ', ' + reponse4  + ', ' + reponse3 + ', ' + reponse;

            var reponses;

            if(possibiliteChiffre == 1) {
                reponses = possibilite1;
            } else if (possibiliteChiffre == 2) {
                reponses = possibilite2;
            }  else if (possibiliteChiffre == 3) {
                reponses = possibilite3;
            }  else if (possibiliteChiffre == 4) {
                reponses = possibilite4;
            }
          }
         
          io.sockets.emit('new_message',
            {
                name:'Quizz Bot ',
                message: body.results[0].question + '('+body.results[0].type+')'
            });
            if (body.results[0].type == "multiple") {
                io.sockets.emit('new_message',
            {
                name:'Quizz Bot ',
                message: reponses
            });
            }
            
        });
    }


    function handleQuizz(io, message)
{

	// Est-ce qu'il contient une référence au quizz ?
	if (message.includes('quizz') || message.includes('quiz'))
	{
		getQuizz(io, message);
    }

    if (reponse!=null && reponse!='undefined') {
        console.log(reponse);
        if (message.includes(reponse) || message.includes(reponse.toLowerCase())) {
            io.sockets.emit('new_message',
                {
                    name:'Quizz Bot ',
                    message: 'Bravo la bonne réponse était :'+ reponse
                });
                reponse = null;
        }
    }

}

