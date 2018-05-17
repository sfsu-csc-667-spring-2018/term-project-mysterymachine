# term-project-mysterymachine
To run on Windows, replace start:dev in package.json with:
```
"start:dev": " SET \"NODE_ENV=development\" SET DEBUG=myapp:* & nodemon ./bin/www",
```

# Game: Uno

# TODO
#
# Deliver milestone 1 - DONE
#
# Make db schema
#   v1 DONE
#   Get approval from Rob
#   Final schema

![alt text](https://github.com/sfsu-csc-667-spring-2018/term-project-mysterymachine/blob/master/public/images/database_schema.jpg "schema")
# Install instructions
## On dev machine
* Install [PostgreSQL](https://www.postgresql.org/download/)
* Install [Node.js](https://nodejs.org/en/download/)
* Clone and create your own branch
```
 git clone https://github.com/sfsu-csc-667-spring-2018/term-project-mysterymachine.git
 cd term-project-mysterymachine
 git checkout -b your_branch
```
* Create database env file
```
touch .env
echo DATABASE_URL=postgres://`whoami`@localhost:5432/667termproject >> .env
```
* Install required packages
```
npm install
```
* Set up database, and load intial data for cards table:
```
bin/resetDB.sh
```
* Then start the web app:
```
npm run start:dev
```
* Make your changes and test them locally
* When ready, create a pull request to merge your features into *master*
## On heroku
### Test
* Heroku app test: https://cs667-uno.herokuapp.com/
* Heroku database conection test: https://cs667-uno.herokuapp.com/tests or
https://cs667-uno.herokuapp.com/cards
### Deploy new changes
* Install [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli).
* Login 
```
heroku login
```
* Set up heroku remote repo
```
heroku git:remote -a cs667-uno
```
* Push code change from master branch to heroku to get the app deployed:
```
git push heroku master
```
* Load initial data for cards table
```
heroku pg:psql postgresql-reticulated-69917 --app cs667-uno < db/load_cards.sql
```

# game_status types
```
* "joining" for when the game is still in its initial phase of people joining in the waiting room
* "waiting" for when the game is waiting for a play action
* "locked" for when the game is in the middle of a process
* "colorDecision" and "drawDecision" for when the game is waiting for a specific action
* "complete" when the game is over, and no longer needs to be displayed in the lobby
```