# projekt-1dv449

## Inledning  
Plurlist är en sammansättning av orden *plural*, *url* och *list* och är en webbapp där man genom att kopiera URL:en till en låt kan skapa spellistor som man sedan kan bokmärka och dela med sig av via en URL. När man lyssnar på en låt kan man också få information om artisten, och lista liknande artister. I dagsläget finns endast stöd för SoundCloud, men planer finns att utöka stöd för YouTube och kanske även Spotify.

Liknande appar jag hittat är native-appen [https://www.tomahawk-player.org/](Tomwhawk-player), som tydligen ska vara rätt besvärlig att få att funka, och iOS-appen [http://www.amplifindapp.com/](Amplifind). Ingen av dem har dock möjlighet att visa liknande artister eller artistinfo.

I detta projekt har jag använt mig av MERN-stacken, dvs MongoDB, ExpressJS, ReactJS (med Flux för att hantera dataflöde och state) och NodeJS. För frontendkod avänder jag mig av ES2015 som transpileras med hjälp av Babel, och Webpack för att bundla och minifiera kod.

Låtar hämtas från [www.soundcloud.com](Soundcloud), artistinformation hämtas från [www.discogs.com](Discogs) API, och liknande artister hämtas från [www.spotify.com](Spotify's) API.

## schematisk bild  
över applikationens beståndsdelar så att läsaren har enklare att förstå applikationens dataflöde.

## Säkerhet och prestandaoptimering  
Hur har du funderat kring säkerhet och prestanda och vilken teori har du kopplat detta emot.

## Offline-first  
Hur har du tänkt kring offline-first?

## Risker med din applikation  
Reflektera över vilka risker det finns med din applikation; rent tekniskt, säkerhet, etiskt m.m.

## Egen reflektion kring projektet  
Här tar du upp hur projektet har gått. Vilka eventuella problem har du stött på? Finns det funktioner som du velat implementera men inte hunnit? Hur skulle du vilja jobba vidare med din applikation?

## Betygshöjande  
Skriv också om de eventuella delar du anser vara betygshöjande med din applikation. Motivera varför du anser dessa vara betygshöjande.
