# Backend JORDIT Team Fristi

Dit is de backend opgezet voor het project van semester 2 door Team Fristi. 
Hieronder volgen kort wat zaken die van toepassing zijn voor deze applicatie.

# Datalayers

Voor dit project zijn er twee datalayers opgezet. 
Er kan gebruik gemaakt worden van zowel SQL als Sequalize om dezze applicatie te runnen.
Dit kan aangepast worden binnen de config.env binnen de applicatie.
Voor het gemak hebben we het template van de config.env bijgesloten.

# Testing

Voor de testing was er een speciale testing database geschreven. Deze is niet bijgevoegd.
De informatie binnen de config.env moet ingevuld zijn om de tests succesvol te kunnen runnen.


De applicatie kan getest worden door het runnen van het command npm test.
Als er een timeout error is op de tests kun je het best een aparte test runnen door middel van filename met npm run test: runnen


# SQL Files + Provided Dummy Data

Zowel in de wiki (team Fristi algemene wiki, niet de specifieke backend wiki) als binnen de applicatie zelf (SQL files) is er (puur om aan te tonen dat de applicatie werkt) een createscript en een script met dummydata bijgevoegd. 
Dit zouden wij, om security redenen, nooit met een echte applicatie doen, maar hebben wij dit keer wel gedaan om aan te tonen dat de code die wij geschreven hebben echt werkt.


NOTE:
Voor gebruiker "MartijnThorig@jordit.com" is het wachtwoord "Wachtwoord123".