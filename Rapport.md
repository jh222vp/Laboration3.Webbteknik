#Rapport

L�nk till webbapplikationen: http://jh222vp.com/trafik/index.php

##Vad finns det f�r krav du m�ste anpassa dig efter i de olika API:erna?

###Google

Hos Google fungerar det som s� att man f�r anv�nda tj�nsten gratis s�l�nge man h�ller sig under viss m�ngd datatrafik samt har en godk�nd
API-nyckel. Denna nyckeln anv�nds ocks� s� google vet vem som anv�nder APIet samt har m�jlighet att kontakta anv�ndaren. 

###SR
Den data och material som h�mtas via sveriges Radios API f�r inte anv�ndas p� ett s�dant s�tt att det skulle kunna skada
Sveriges Radios oberoende eller trov�rdighet.

###Hur och hur l�nga cachar du ditt data f�r att slippa anropa API:erna i on�dan?
Min cachning sker genom att n�r datan �r h�mtad fr�n SR:s API s� sparas denna ned i en JSON fil. Sedan kontrolleras filen s� den ska uppdateras
efter 5 minuter. Har inte 5 minuter passerat s� g�rs inget nytt anrop mot SR och filen sparas inte om.

###Vad finns det f�r risker med din applikation?
Skulle n�got �ndras i APIet s� skulle applikation inte att fungera l�ngre.

###Hur har du t�nkt kring s�kerheten i din applikation?
F�rs�kt hindra s� att svaret man f�r fr�n SR inte kan vara tomt d� jag ist�llet l�ser fr�n f�reg�ene fil.
TextContent anv�nds n�r titlar l�ggs ut f�r att f�rhindra ifall n�gon skulle f�rs�ka sig p� XSS och <script>-taggar d�r.

###Hur har du t�nkt kring optimeringen i din applikation?
CDN p� bootstap samt jquery och minifiering