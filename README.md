# projekt-1dv449

## Inledning  
Plurlist är en sammansättning av orden *plural*, *url* och *list* och är en webbapp där man genom att kopiera URL:en till en låt kan skapa spellistor som man sedan kan bokmärka och dela med sig av via en URL. När man lyssnar på en låt kan man också få information om artisten, och lista liknande artister. I dagsläget finns endast stöd för SoundCloud, men planer finns att utöka stöd för YouTube och kanske även Spotify.

Liknande appar jag hittat är native-appen [Tomwhawk-player](https://www.tomahawk-player.org/), som tydligen ska vara rätt besvärlig att få att funka, och iOS-appen [Amplifind](http://www.amplifindapp.com/). Ingen av dem har dock möjlighet att visa liknande artister eller artistinfo.

I detta projekt har jag använt mig av MERN-stacken, dvs MongoDB (med Mongoose som ORM), ExpressJS, ReactJS (med Flux för att hantera dataflöde och state) och NodeJS. För frontendkod avänder jag mig av ES2015 som transpileras med hjälp av Babel, och Webpack för att bundla och minifiera kod. [OfflineJS](https://github.com/HubSpot/offline) används för att varna användaren för tappad uppkoppling.

Jag tycker att Express och Mongoose är smidigt att arbeta med, därför valde jag dem. ReactJS är smidigt att arbeta med och jag upplever ofta att webbappar som kör React känns snabba, därför valde jag React. Jag föredrar ES6 framför ES5, därför använder jag det. Webpack gör det bland annat smidigt att bundla och minifiera kod, och gör transpileringen av ES6-kod till ES5-kod enkel, därför använder jag det.

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

**Cachning** De två scriptfiler som skickas till klienten cachas. Eftersom appen är ny är chansen för ändringar relativt stora, därför cachas de endast en dag.

**Komprimering** Statiska filer komprimeras på servern med [express serve-static](https://github.com/expressjs/serve-static).

**Minifiering** Javascript och CSS bundlas och minifieras med hjälp av Webpack.

## Offline-first  
Jag använder mig av OfflineJS för att varna användaren när den tappar uppkopplingen. Då visas en varningsruta, och OfflineJS fortsätter kontinuerligt att kolla om uppkopplingen är återupprättad, och meddelar isåfall användaren om detta. 

För att lägga till en låt i en spellista krävs det att man har tillgång till en SoundCloud-URL, och för att få tillgång till SoundCloud krävs en uppkoppling, därför ansåg jag att en offline-first-lösning när man lägger till låtar kändes onödig, eftersom man hämtar URL:en från en annan webbplats och behöver vara uppkopplad för att göra det. 

För att hämta artistinfo, hämta liknande artister eller för att spela en låt behöver anrop till API:er göras, så någon offline-first-lösning kring detta har också känts onödig, och inte implementerats.

## Risker med din applikation  
Eftersom hela appen är byggd med React krävs Javascript på klienten, så en del användare kan inte använda Plurlist alls om de inte slår på Javascript.  

Det finns såklart risk att de API:er jag använder ligger nere. Dock är det endast Soundclouds API som är nödvändigt för att appen ska gå att använda, medan de andra API:erna endast tillför extra features.

Uppdateringar i API:erna som gör att Plurlist inte fungerar är en risk. Soundclouds API fick en rejäl ansiktslyftning för ett tag sen, och jag har gjort bedömningen att den håller ett tag framöver. Den del av Spotifys API som jag använder hörde tidigare till [http://the.echonest.com/](http://the.echonest.com/), och därför finns såklart en risk att Spotify kan göra ändringar i API:et, men när Spotify gick från version 1 till version 2 i sitt API så fortsatte de stödja version 1 en lång tid, därför anser jag att det borde finnas tid att uppdatera Plurlist om Spotify gör ändringar.

För att hämta information från Soundclouds API skickar jag in URL:en till en låt från Soundcloud, till exempel https://soundcloud.com/artist_name/track_title, så som Soundcloud rekommenderar. Trots detta har jag märkt att en del URL:er ger en 404. Jag har inte lyckats hitta några mönster i detta, men har rapporterat det som en bugg till Soundcloud. Det har dock varit svårt att testa då det bara hänt med ett fåtal URL:er.

Ett annat problem uppstår när en artist är registrerad under ett Soundcloud-username som inte är samma som artistnamnet, då är det det registrerade användarnamnet som skickas till Spotify/Discogs, och det leder isåfall ofta till att ingen information hittas. Detta har jag tänkt lösa genom att användaren själv kan fylla i/ändra namn på låtar i spellistan, men jag har inte hunnit implementera detta ännu.

Några etiska synpunkter kan jag inte komma på i dagsläget. Soundcloud uppmanar folk att använda deras API för att bygga egna appar, och eftersom låtarna spelas i en inbakad spelare som tillhandahålls av Soundcloud så går de inte miste av någon statistik etc, eftersom själva uppspelningen fortfarande sker via Soundcloud. När jag bygger ut appen med fler källor så bör jag dock se upp så att jag inte strider mot några regler i andra API:er kring blandningen av olika musikkällor.

## Egen reflektion kring projektet  
Det finns massvis med grejer som jag gärna hade hunnit med att implementera. För det första så vill jag att nästa låt i spellistan ska spelas upp automatiskt när en låt är slut. Det finns ett finish-event i Soundcloud-spelaren där jag kan kalla på en funktion som laddar nästa låt, men detta fungerar endast första gången spelaren laddas. En lösning på detta är att ladda om sidan när en låt tar slut, och hålla reda på state i en session. Eftersom script etc cachas skulle inte detta medföra några längre väntetider, men jag hann inte undersöka detta ytterligare.  

Jag vill också utöka så att man kan lägga till låtar från Youtube, och eventellt Spotify, men detta har jag inte hunnit med. Nästa steg är alltså att lägga till stöd för Youtube, och undersöka om Spotifys ganska begränsade API går att använda för att lägga till låtar från Spotify också.

Utöver detta tycker jag att arbetet har flutit på rätt bra. Jag tycker API:erna har varit ganska smidiga att jobba med, och att det varit en rolig, givande och inspirerande uppgift.

## Betygshöjande  
Jag har använt mig av fler än två externa tjänster och jag tycker att jag har en bra motivation till mina tekniker och optimering, annars håller jag mig nog mest på betygsnivå 3.
