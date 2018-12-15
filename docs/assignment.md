Za lažje razumevanje vaj si poglejte vsebino predavanj <span class="sklop4">P4.1</span> [Dodajanje Angular komponent v Express aplikacijo](#AngularJS).

## Uvod

V <span class="sklop3">V4</span> smo izdelali aplikacijo **ComMENT TO BE**, ki teče na strežniku Node.js in je realizirana s pogledi PUG. Izvorna koda resitev <span class="sklop3">V4</span> je dostopna na [V4-resitev](https://github.com/FilicMia/v4-resitev).
Pri ovoj nalogi bodemo spremenili našo aplikacijo tako da koristi Angular. V nasprotju z Express, ki je strežniško ogrodje, Angular je ogrodje na strani odjemalca.

Naša aplikacija bo koristila Angula za naslednje:

* search, filtriranje objektov na strani odjemalca,
* za prikaz interaktivnih elementov,
* zunanja storitev kji dejansko vpliva na preostanek strani in obratno.

V sklopu vajah <span class="sklop4">V5</span> in <span class="sklop4">V6</span> budemo spremenili našo aplikaciju tako da je delujoča Angular SPA aplikacija na eni strani, ki uporablja REST API za dostop do podatkovne baze.

Pri pretvorbi obstoječe aplikacije v SPA aplikacijo SPA spremenimo obstoječu Express aplikaciju, da vsebuje del odjemalca. Nato nastavimo graditi aplikacijo na eni strani. V tem procesu dodamo

* kontrolorji,
* storitve,
* filtri in
* direktive,

Pri gradnji SPA aplikacije sledimo različite najboljše prakse v razvoju, kot so

* zaščita globalnega konteksta,
* priprava komponent, ki jih je mogoče ponovno uporabiti, in
* optimiziranje kode za boljšo uporabniško izkušnjo v brskalniku.

Vajah <span class="sklop4">V5</span> koristimo za spremenjivanje dela prikaza komentarija tako da je delovanje v celoti na strani odjemalca v okviru Angular SPA aplikacije.

Za osnovo lahko uporabite repozitorij [V5](https://bitbucket.org/spfri/v5) (prečiščena verzija) ali [V4-resitev](https://github.com/FilicMia/v4-resitev). Najbolje, da naredite svojo kopijo repozitorija (angl. fork) in ga preimenujete v v5 pa izvedete naslednje ukaze:

~~~~ {.bash}
~/workspace $ git clone https://{študent}@bitbucket.org/{študent}/v5.git
~/workspace $ cd v5
~~~~

## Priprema okolja

Namestitev je ednostavna.
Za pripremu okolja lahko pratimo upute na <span class="sklop4">P4.1</span> [Dodajanje Angular komponent v Express aplikacijo in začetek izdelave Angular SPA aplikacije na eni strani 16.1](#AngularJS).

## Dodajanje Angular v Express aplikacija

Dobra praksa za razvoj Angular SPA je opredelitev 1 funkcionalnosti na eni datoteki. To pomeni, da je vsaki krmilnik, storitev, direktivo in filter opredelit v svojoj datoteki.

Naj se sva naslednja koda naše SPA aplikacije nahaja v ločenem korenskom direktoriju `app_client`.
Korenska datotek SPA aplikacije je obično ena datoteka v mapi "app_client". V našem primeru bodemo je poimenovali `app.js`. Določite ostatak skladno s <span class="sklop4">P4.1</span> [Dodajanje Angular komponent v Express aplikacijo 16.1.2](#izdelava-angular-spa-aplikacije-na-eni-strani).

> **Napomena**: Na koncu preverite, ali ste: (1) ustvarili ste datoteko `app_client / app.js`,
(2) posodobili ste sklicevanje na aplikacijo Angular SPA za stranke (ker je stran odjemalca, to se nanaša na predloge `PUG`),

## Prehod iz Express v Angular usmerjanje (routing)

* Ustvarite nov Express-krmilnik za posredovanje predloge strani (`layout`),
* Dodajte Angular usmerjanje ngRoute v aplikacijo: 
* Funkcionalnost je na voljo kot del AngularJS kot ločena datoteka, ki jo najdete na spletnem mestu [AngularORG](https://code.angularjs.org/).
  
~~~~ {.bash}
 cd app_client
 mkdir lib
 cd lib

 wget https://code.angularjs.org/1.7.5/angular-route.min.js
 wget https://code.angularjs.org/1.7.5/angular-route.min.js.map

~~~~

* Vključite knjižnico v aplikacijo (`PUG` predlogu),
* Določite usmerjevalnik aplikacije v `app_client/app.js`.

## Pogledi, storitve in filtri

Za prikaz komentarjev v okviru Angular SPA aplikacije, je nekaj opravil ki treba narediti.

* Ustvariti pogled Angular predloge (v tem trenutku so potrebni samo `comments.html`),
* Sahranite ju v mapo `comments` v mapi` app_client`,
* Integrirajte Angular pogled v obstoječo aplikacijo,
* Dodajte krmilnika v usmerjevalnik kji je preprost proces z naslednjimi koraki:

  ** ustvarjanje krmilnika v svoji datoteki,
  ** dodajanje krmilnika v Angular aplikaciji,
  ** definicija krmilnika v metodi `routerComments` v usmerjevalniku,
  ** vključitev datoteko za brskalnik.

Po tem spremenite aplikacijo tako da 

* Uporabite sintakso `controllerAs` pa izvedite ustrezne spremembe,
* Uporabite storitve za povratne podatke REST API (seznam vseh komentarjev iz baze podatkov),
* Uporabite Angular filter, ki filtrira komentarje po imenu.

Izvorna koda rešitve naloge bo na voljo ob koncu tedna na [V5-resitev](https://bitbucket.org/mfilic/v5-resitev) pa objavljena na [drugo-ime238](https://commentangular.herokuapp.com/comments).
