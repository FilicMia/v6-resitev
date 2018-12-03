# MongoDB in Heroku
## Uvod

Za lažje razumevanje vaj si poglejte vsebino predavanj **P3.2** [Shranjevanje podatkov v MongoDB, dostop preko Mongoose ODM vmesnega sloja in REST API dostop do podatkovne baze](#MongoDB-Mongoose-REST) in **P3.3** [REST API dostop do podatkovne baze in uporaba REST API v Express aplikaciji](#Uporaba-REST-API).

V **V3** smo izdelali aplikacijo **ComMENT TO BE**, ki teče na strežniku Node.js in je realizirana s pogledi PUG. Izvorna koda resitev **V3** je dostopna na [V3-resitev](https://bitbucket.org/spfri/v3-resitev).

V okviru te naloge želimo aplikacijo iz prejšnje naloge nadgraditi, da bomo podatke sahranili v podatkovni bazi MongoDB in ju objaviti na Heroku.
Za osnovo lahko uporabite repozitorij  [V4](https://bitbucket.org/spfri/v4) (prečiščena verzija) ali [V3-resitev](https://bitbucket.org/mfilic/v3-resitev). Najbolje, da naredite svojo kopijo repozitorija (angl. fork) in ga preimenujete v `v4` pa izvedete naslednje ukaze:

~~~~ {.bash}
~/workspace $ git clone https://{študent}@bitbucket.org/{študent}/v4.git
~/workspace $ cd v4
~~~~

## Objava aplikacije

### Priprava okolja Heroku

V Cloud9 okolju si namestimo Heroku Command Line Interface (CLI).

~~~~ {.bash}
~/workspace $ curl https://cli-assets.heroku.com/install.sh | sh
~/workspace $ sudo ln -s /usr/local/bin/heroku /usr/bin/heroku
~/workspace $ cd <repo>
~~~

### Objava na Heroku
Posodobljeno aplikacijo sedaj objavimo na Heroku z naslednjimi ukazi:

~~~~ {.bash}
~/workspace/v4 (master) $ heroku login -i
heroku: Enter your login credentials
Email: filicmia@gmail.com
Password: ***********
Logged in as filicmia@gmail.com

~/workspace/v4 (master) $ heroku create
Creating app... done, ⬢ {dodeljeni-naziv}
https://{dodeljeni-naziv}.herokuapp.com/ | https://git.heroku.com/{dodeljeni-naziv}.git
~~~~

Sedaj imamo prazno aplikacijo, ki je na voljo na `https://{pridjeljeni-naziv}.herokuapp.com/`. Aplikaciji je dodeljen naziv `{dodeljeni-naziv}`. Če želimo spremeniti naziv aplikacije, lahko izvedemo naslednje ukaze:

~~~~ {.bash}
~/workspace/v4 (master) $ heroku apps:rename {drugo-ime}
~~~~

### Sprememba Express aplikacije za objavu na Heroku

Najprej preverimo verzijo `node` in `npm` s spodnjima ukazoma.

~~~~ {.bash}
~/workspace/v4 (master) $ node --version
v6.11.2

~/workspace/v4 (master) $ npm --version
3.10.10
~~~~

Po tem dopolnimo datoteko `package.json` z naslednjimi spremembami, prikazanimi spodaj. Shraniti moramo `npm` in `node` verzije, tako da zagotovimo samodejno postavitev okolja v okolju Heroku.

`package.json`

~~~~ {.javascript}
{
  "name": "edugeocache",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "engines": {
    "node": "~6.11.2",
    "npm": "~3.10.10"
  },
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "morgan": "~1.9.0",
    "pug": "2.0.0-beta11"
  }
}
~~~~

Še vedno manjka informacijo o tem, kako aplikacijo poženemo. Zato potrebujemo datoteko `Procfile`, ki jo shranimo v mapo projekta.

`Procfile`

~~~~ {.text}
web: npm start
~~~~

**Sedaj odstranimo datoteke iz aplikacije, ki jih ne potrebujemo**. Nato z naslednjim ukazom namestimo aplikacijo na oddaljeni Heroku vsebnik.

~~~~ {.bash}
~/workspace/v4 (master) $ git add . 
~/workspace/v4 (master) $ git commit -m  'pre-heroku deploy cleanup'
~/workspace/v4 (master) $ git push heroku master
~~~~

### Dodatno pojasnilo #1

Če smo Heroku aplikacijo ustvarili preko spletnega vmesnika in je `v4` git repozitorij, potem namesto `~/workspace/v4 (master) $ heroku create`, svojemu repozitoriju `v4` le dodamo nov oddaljen repozitorij in na njem objavimo vse iz trenutnega repozitorija.

~~~~ {.bash}
~/workspace/v4 (master) $ heroku git:remote -a {ime-Heroku-aplikacije}
~/workspace/v4 (master) $ git push heroku master
~~~~

### Dodatno pojasnilo #2

Če `v4` ni git repozitorij, potem ga najprej lokalno inicializirajmo in ga potem posredujemo na odaljeni Heroku repozitorij.

~~~~ {.bash}
~/workspace/v4 $ git init
~/workspace/v4 (master) $ heroku git:remote -a {ime-Heroku-aplikacije}

~/workspace/v4 (master) $ git add .
~/workspace/v4 (master) $ git commit -m "app init"
~/workspace/v4 (master) $ git push heroku master
~~~~


## Podatkovna baza in REST API

### Priprava okolja

Pred začetkom tega koraka si namestite podatkovno bazo MongoDB, kar je predstavljeno na predavanjih <span class="sklop3">P3.2</span> v poglavju [Namestitev MongoDB podatkovne baze v Cloud9 okolju](#Namestitev-MongoDB-NavodilaC9). Priporočamo, da postopek začnete v mapi `~/workspace` vašega Cloud9 delovnega okolja. Prav tako namestite knjižnico za delo s podatkovno bazo in knjižnico za uporabo storitev REST (znotraj Heroku projekta):

~~~~ {.bash}
~/workspace/v4 (master) $ npm install --save mongoose
~/workspace/v4 (master) $ npm install --save request 
~~~~

API bomo razvijali ločeno od spletne strani, zato si v korenskem imeniku aplikacije ustvarimo mapo `app_api` s podmapami za usmerjevalnike (`routes`), krmilnike (`controllers`) in modele (`models`).

~~~~ {.bash}
~/workspace/v4 (master) $ mkdir app_api
~/workspace/v4 (master) $ cd app_api
~/workspace/v4/app_api (master) $ mkdir models
~/workspace/v4/app_api (master) $ mkdir views
~/workspace/v4/app_api (master) $ mkdir controllers
~~~~

### Dodajanje Mongoose povezave 

Ustvarite datoteko `app_api/models/db.js`, v kateri definirajte povezavo do podatkovne baze ter akcije, ki se izvedejo ob spremembah aplikacije. 

`app_api/models/db.js`

~~~~ {.javascript}
var mongoose = require('mongoose');

mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
  console.log('Mongoose error at connection: ' + err);
});

mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection has been terminated.');
});

var runOK = function(message, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose has been closed on ' + message);
    callback();
  });
};

// Re-run with nodemon
process.once('SIGUSR2', function() {
  runOK('nodemon re-run', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});

// Close
process.on('SIGINT', function() {
  runOK('close', function() {
    process.exit(0);
  });
});

// Close on Heroku
process.on('SIGTERM', function() {
  runOK('close on Heroku', function() {
    process.exit(0);
  });
});
~~~~

Na podatkovno bazo, ki se nahaja na istem računalniku (Cloud9) se povežemo tako, da dodamo naslednje v datoteko `db.js`.

`app_api/models/db.js`

~~~~ {.javascript}
var dbURI = 'mongodb://localhost/{podatkovna_baza}';
mongoose.connect(dbURI, { useNewUrlParser: true, useCreateIndex: true });
~~~~
	
Pripravite osnovni krmilnik ter usmerjevalnik. Nato v aplikacijo dodajte povezavo na podatkovno bazo

### Definicija Mongoose podatkovnih shem

Definirajte MongoDB shemo za komentarije (`app_api/models/comments.js`), in jo registrirajte v `db.js`.

### Izdelava API-ja

Pripravite REST API, ki omogoča:

* kreiranje novega komentarja,
* branje določenega komentarja.

Pri tem uporabite ustrezne metode in URL naslove.  

### Uporaba API-ja 
Vzpostavite testno `MongoDB` podatkovno bazo, kar je predstavljeno na predavanjih <span class="sklop3">P3.3</span> v okviru poglavja [Uporaba MongoDB ukazne lupine za dodajanje podatkov](#zakaj-je-potrebno-modelirati-podatke). 

Lahko pa si tudi pripravimo JSON datoteko ter vse podatke uvozimo z naslednjim ukazom:
~~~~ {.bash}
$ mongoimport --db Comments --collection Comments --mode upsert --upsertFields name --jsonArray --file ~/workspace/v4/app_server/models/comments-mongodb.json
~~~~

> **Namig**: Ker pri takšnem uvozu podatkov odvisni dokumenti nimajo polja _id, jih je treba pri komentarjih dodati
(če ih imamo).

Nato preverite delovanje vašega REST API-ja. Uporabite API v aplikaciji za kreiranje novega komentarija preko obrazca za komentarje in za branje določenega komentarija preko navigacijske vrstice obrazca (`Search`).

## Uporaba podatkovne baze mLab

Najprej ustvarite račun za uporabo platforme mLab, kjer boste gostovali svojo MongoDB podatkovno bazo. Navodila za uporaba mLab okolja so dostopna tudi v poglavju [Gostovanje MongoDB podatkovne baze na mLab](#Gostovanje-mLab) predavanja <span class="sklop3">P3.2</span>.

Podatke iz lokalne podatkovne baze prenesite na mLab nasljednjim ukazima:
~~~~{.bash}
mkdir -p ~/workspace/mongodb/dump
mongodump -h localhost:27017 -d Comments -o ~/workspace/mongodb/dump

mongorestore -h ds{koda-mLab-baze}.mlab.com:{koda-mLab-baze} -d comments -u user ~/workspace/mongodb/dump/Comments
~~~~

## Objava sprememba na Heroku in mLab

* Spremembe posredujte na produkcijski sistem Heroku,
* spremembe naj vključuje privzeto uporabo lokalne podatkovne v lokalnem razvojnem okolju in samodejno uporabo mLab podatkovne baze v okolju Heroku.

> **Namig**: Ustrezno nastavite okoljsko spremenljivko *MLAB_URI*, da bo aplikacija uporabljala podatkovno bazo na mLab.
  `heroku login`
  ` heroku git:remote -a IME_APLIKACIJE`
  `git push heroku master `
  `heroku config:set MLAB_URI=mongodb://{user}:{pass}@ds{koda-mLab-baze}.mlab.com:{koda-mLab-baze}/{database-name}`

Izvorna koda rešitve naloge bo na voljo ob koncu tedna na [V4-resitev](https://bitbucket.org/spfri/v4-resitev).

Za nekaj časa si lahko oddahnemo, a kmalu ugotovimo, da moramo oddait **3. LP** na [spletni učilnici](https://ucilnica.fri.uni-lj.si/mod/assign/view.php?id=26358). 
