
> Warning: For the LP4, be careful to meet prerequerities whithout which your work won't be scored: 
>
> 1. There is a *valid* commitment link submitted on učilnica (If you don't fell like bothering with giving a specific acess
>to the `AssistentFRI` just make your repository public after the submission deadline. :) )
>2. dynamic part is not hardcoded, i.e. written in PUG, 
>3. your application is using your REST API to fatch the data from the database, 
>4. you have published your application on Heroku, 
>5. I can run your application locally fillowing your instructions (you may assime that I have mongoDB installed, and that those instructions will be run inside cloud9 enviroment and NOTHING else.) When running the application locally, I am an ordinary programmer, I do not know this specific tehnology. (5) application is not working properlly (really annoying broken links, functionalities that should have been presented (excluding login) with wireframes in LP1 are not present or not working (adding, deleting, editing, search, master-detail, listing one type of documents on the page). You have to implement them so that I can feel 
>that those functionalities are actually working (as an user - ordinary or admin - and not as a programer).


# Quick start

## Download the source code
~~~~ {.bash}
~/workspace $ git clone <URL-to-repo>
~/workspace $ cd <repo>

~/workspace/v5 (master) $ npm install //set express app  
~~~~

## Cerate the local database

### Requirements
~~~~ {.bash}
$ sudo apt-get remove mongodb-org mongodb-org-server
$ sudo apt-get autoremove
$ sudo rm -rf /usr/bin/mongo*
$ sudo rm /etc/apt/sources.list.d/mongodb*.list
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
$ echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
$ sudo apt-get update
$ sudo apt-get install mongodb-org mongodb-org-server
$ sudo touch /etc/init.d/mongod
$ sudo apt-get install mongodb-org-server
~~~~

### Create local serving system
~~~~ {.bash}
~/workspace/v5 (master) $ cd ~/workspace
~/workspace $ mkdir mongodb
~/workspace $ cd mongodb

~/workspace/mongodb $ mkdir data
~/workspace/mongodb $ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal "$@"' > mongod
~/workspace/mongodb $ chmod a+x mongod
~~~~

### Host local database 
~~~~ {.bash}
~/workspace/mongodb $ ./mongod
~~~~

### Import the data into the database
Do this in new terminal. You need to leave the database to be served to access it.

~~~~ {.bash}
$ mongoimport --db Comments --collection Comments --mode upsert --upsertFields name --jsonArray --file ~/workspace/v5/app_server/models/comments-mongodb.json
~~~~

## Start the app
~~~~ {.bash}
~/workspace (master) $ cd ~/workspace/v5
~/workspace/v5 (master) $ npm start
~~~~

# Host on Heroku (by your account)

~~~~ {.bash}
$ curl https://cli-assets.heroku.com/install.sh | sh
$ sudo ln -s /usr/local/bin/heroku /usr/bin/heroku
$ heroku login -i
$ cd ~/workspace/v5
~/workspace/v5 (master) $ heroku create
~/workspace/v5 (master) $ git push heroku master
~/workspace/v5 (master) $ heroku config:set MLAB_URI=mongodb://{user}:{pass}@dsX{koda-mLab-baze}.mlab.com:{koda-mLab-baze}/{database-name}
~/workspace/v5 (master) $ heroku config:set NODE_ENV=production
~~~~


Note that the collections' names of the local and mLabl database MUST match complitely (case as well)!
The database names can differ.

# SOLUTION 
Step by step solution explained in words can be found under 
[`docs/solution.md`](https://bitbucket.org/mfilic/v5-resitev/src/master/docs/solution.md).

It is the solution up to the [commit](https://bitbucket.org/mfilic/v5-resitev/commits/713e63f7e0e25d9e3df6a647781c57c9413db43e)
The source code up to that commit downloaded with the following. 

~~~~.bash
git clone https://bitbucket.org/mfilic/v5-resitev/commits/713e63
~~~~

or, if you have already downloader `v5-resitev`, with the following.

~~~~.bash
cd v5-resitev
git reset --hard 713e63
~~~~