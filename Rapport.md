#Rapport

Länk till webbapplikationen: http://jh222vp.com/trafik/index.php

##Vad finns det för krav du måste anpassa dig efter i de olika API:erna?

###Google

Hos Google fungerar det som så att man får använda tjänsten gratis sålänge man håller sig under viss mängd datatrafik samt har en godkänd
API-nyckel. Denna nyckeln används också så google vet vem som använder APIet samt har möjlighet att kontakta användaren. 

###SR
Den data och material som hämtas via sveriges Radios API får inte användas på ett sådant sätt att det skulle kunna skada
Sveriges Radios oberoende eller trovärdighet.

###Hur och hur länga cachar du ditt data för att slippa anropa API:erna i onödan?
Min cachning sker genom att när datan är hämtad från SR:s API så sparas denna ned i en JSON fil. Sedan kontrolleras filen så den ska uppdateras
efter 5 minuter. Har inte 5 minuter passerat så görs inget nytt anrop mot SR och filen sparas inte om.

###Vad finns det för risker med din applikation?
Skulle något ändras i APIet så skulle applikation inte att fungera längre.

###Hur har du tänkt kring säkerheten i din applikation?
Försökt hindra så att svaret man får från SR inte kan vara tomt då jag istället läser från föregåene fil.
TextContent används när titlar läggs ut för att förhindra ifall någon skulle försöka sig på XSS och script-taggar där.

###Hur har du tänkt kring optimeringen i din applikation?
CDN på bootstap samt jquery och minifiering
