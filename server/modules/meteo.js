/*
 * Nom : Meteo !
 * Description : Ce module ne fait pas grand chose... quand on appelle Meteo, il répond !
 * Auteur(s) : Jérémie Brizard
 */

var querystring = require('querystring');
var request     = require("request");

// Définit les méthodes "publiques" (utilisation à l'extérieur du module)
module.exports =  {
	handleMeteo: handleMeteo // permet d'appeler cette méthode dans server.js -> meteo.handleMeteo(...)
}

/**
 * Lorsqu'on appelle Meteo, il répond...
 */
function handleMeteo(io, message)
{
	// Passe le message en minuscules (recherche insensible à la casse)
	message = message.toLowerCase();
	
	// Est-ce qu'il contient une référence à Meteo ?
	if (message.includes('meteo'))
	{
		var request = require('request');

		var city = message.slice(5);

		var apiKey =  '93309befbaba2420988bf9fbcc438564';
		var url = `http://api.openweathermap.org/data/2.5/weather?q=${city},fr&units=metric&appid=${apiKey}`
		
		request(url, function (err,response, body)
		{
			var weather = JSON.parse(body)
			if (weather.cod == 404)
			{
				io.sockets.emit('new_message', {name:"Toobo", message:"Désolé, je ne connais pas la météo de cette ville <img id='jsp' src='sorry.png'>"});
			}
			else
			{
				var message = `Voici ce que j'ai trouvé pour la météo à <b>${weather.name}</b><br>
				<table>
					<tr>
						<th>${weather.weather[0].description}</th>
					</tr>
					<tr>
						<td>Temp :</td>
						<td>${weather.main.temp} °C</td>
					</tr>
					<tr>
						<td>Pression :</td>
						<td>${weather.main.pressure} hPa</td>
					</tr>
					<tr>
						<td>Humidité :</td>
						<td>${weather.main.humidity} %</td>
					</tr>
					<tr>
						<td>Nuages :</td>
						<td>${weather.clouds.all} %</td>
					</tr>
					<tr>
						<td>Vent :</td>
						<td>${weather.wind.speed} m/s</td>
					</tr>
					<tr>
						<td><img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}.png"</td>
					</tr>
				</table>`;
				console.log(weather);
				console.log (message);
				
				// Si oui, envoie la réponse de Meteo...
				io.sockets.emit('new_message', {name:"Toobo", message:message});
			}
		});
	}
}
