# projekt-1dv449

## Inledning  
Plurlist är en sammansättning av orden *plural*, *url* och *list* och är en webbapp där man genom att kopiera URL:en till en låt kan skapa spellistor som man sedan kan bokmärka och dela med sig av via en URL. När man lyssnar på en låt kan man också få information om artisten, och lista liknande artister. I dagsläget finns endast stöd för SoundCloud, men planer finns att utöka stöd för YouTube och kanske även Spotify.

Liknande appar jag hittat är native-appen [Tomwhawk-player](https://www.tomahawk-player.org/), som tydligen ska vara rätt besvärlig att få att funka, och iOS-appen [Amplifind](http://www.amplifindapp.com/). Ingen av dem har dock möjlighet att visa liknande artister eller artistinfo.

I detta projekt har jag använt mig av MERN-stacken, dvs MongoDB, ExpressJS, ReactJS (med Flux för att hantera dataflöde och state) och NodeJS. För frontendkod avänder jag mig av ES2015 som transpileras med hjälp av Babel, och Webpack för att bundla och minifiera kod. [OfflineJS](https://github.com/HubSpot/offline) används för att varna användaren för tappad uppkoppling.

### API:er
En URL sparas, och när den spelas upp skapas en "embedded"-spelare med info från [Soundclouds](www.soundcloud.com) API, artistinformation hämtas från [Discogs](www.discogs.com) API, och liknande artister hämtas från [Spotifys](www.spotify.com) API.

## Schematisk bild  

![data flow](https://raw.githubusercontent.com/sk222sw/projekt-1dv449/master/dataflow.jpg)

## Säkerhet  
Plurlist är en enkel applikation, många av de tekniker som möjliggör de vanligaste säkerhetshålen är täppta automatiskt. Det finns ett sätt att skicka data till servern, och det är genom en POST-request till routen "/playlist", och datat som skickas in där valideras med en regex som bara accepterar Soundcloud-URL:er. Denna validering sker såväl på klienten som på servern. 

Sessions eller cookies används inte alls i dagsläget, och utgör därför ingen risk.

Eftersom jag använder mig av MongoDB så går det inte att göra traditionella SQL-injections. NoSQL-injections är dock möjligt men stoppas i den tidigare nämnda valideringen.

Det finns såklart risk att de API:er jag använder kan innehålla skadlig kod, men eftersom Soundcloud, Spotify och Discogs är tre stora tjänster, som alla använder sina respektive API:er själva, har jag valt att lita på att de har någon typ av säkerhet som hindrar att skadlig kod infekterar deras API.

## Prestandaoptimering  
**Få HTTP-requests** Jag använder Webpack för att slå ihop all klientside-javascript. Även CSS bundlas ihop med Javascript, vilket ger ännu färre requests. React och egen Javascript bundlas med CSS till en fil, och andra externa script (Soundcloud och OfflineJS) bundlas till en annan fil. Inga statiska bilder etc används.

**Ostylad HTML-flash** Eftersom appen är byggd helt med React och all CSS är kopplad till React-element så laddas både CSS och Javascript samtidigt, därför blir det ingen flash med en ostylad HTML-sida, trots att CSS:en laddas kort efter sidan laddats.

**Cachning** De två scriptiler som skickas till klientetn cachas. Eftersom appen är ny är chansen för ändringar relativt stora, därför cachas de endast en dag.

**Komprimering** Statiska filer komprimeras på servern med [express serve-static](https://github.com/expressjs/serve-static)

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
