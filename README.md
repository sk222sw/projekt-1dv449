# projekt-1dv449

## Inledning  
Plurlist är en sammansättning av orden *plural*, *url* och *list* och är en webbapp där man genom att kopiera URL:en till en låt kan skapa spellistor som man sedan kan bokmärka och dela med sig av via en URL. När man lyssnar på en låt kan man också få information om artisten, och lista liknande artister. I dagsläget finns endast stöd för SoundCloud, men planer finns att utöka stöd för YouTube och kanske även Spotify.

Liknande appar jag hittat är native-appen [Tomwhawk-player](https://www.tomahawk-player.org/), som tydligen ska vara rätt besvärlig att få att funka, och iOS-appen [Amplifind](http://www.amplifindapp.com/). Ingen av dem har dock möjlighet att visa liknande artister eller artistinfo.

I detta projekt har jag använt mig av MERN-stacken, dvs MongoDB, ExpressJS, ReactJS (med Flux för att hantera dataflöde och state) och NodeJS. För frontendkod avänder jag mig av ES2015 som transpileras med hjälp av Babel, och Webpack för att bundla och minifiera kod. [OfflineJS](https://github.com/HubSpot/offline) används för att varna användaren för tappad uppkoppling.

### API:er
En URL sparas, och när den spelas upp skapas en "embedded"-spelare med info från [Soundclouds](www.soundcloud.com) API, artistinformation hämtas från [Discogs](www.discogs.com) API, och liknande artister hämtas från [Spotifys](www.spotify.com) API.

## Schematisk bild  

![data flow](https://raw.githubusercontent.com/sk222sw/projekt-1dv449/master/dataflow.jpg)

## Säkerhet och prestandaoptimering  


## Offline-first  
Jag använder mig av OfflineJS för att varna användaren när den tappar uppkopplingen. Då visas en varningsruta, och OfflineJS fortsätter kontinuerligt att kolla om uppkopplingen är återupprättad, och meddelar isåfall användaren om detta. 

För att lägga till en låt i en spellista krävs det att man har tillgång till en SoundCloud-URL, och för att få tillgång till SoundCloud krävs en uppkoppling, därför ansåg jag att en offline-first-lösning när man lägger till låtar kändes onödig, eftersom man hämtar URL:en från en annan webbplats och behöver vara uppkopplad för att göra det. 

För att hämta artistinfo, hämta liknande artister eller för att spela en låt behöver anrop till API:er göras, så någon offline-first-lösning kring detta har också känts onödig, och inte implementerats.

## Risker med din applikation  
Reflektera över vilka risker det finns med din applikation; rent tekniskt, säkerhet, etiskt m.m.
visa urler funkar inte :S


## Egen reflektion kring projektet  
Här tar du upp hur projektet har gått. Vilka eventuella problem har du stött på? Finns det funktioner som du velat implementera men inte hunnit? Hur skulle du vilja jobba vidare med din applikation?

## Betygshöjande  
Skriv också om de eventuella delar du anser vara betygshöjande med din applikation. Motivera varför du anser dessa vara betygshöjande.
