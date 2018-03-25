# term-project-mysterymachine
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
* Check out the *development* branch, 
* Install
```
npm install
```
* Set up database env, migrate database, and load intial data for cards table:
```
touch .env
echo DATABASE_URL=postgres://`whoami`@localhost:5432/667termproject >> .env
bin/resetDB.sh
```
* Then start the web app:
```
npm run start:dev
```
* Create a pull request to merge your features into *master*
## On heroku
### Test
* Heroku app test: https://cs667-uno.herokuapp.com/
* Heroku database conection test: https://cs667-uno.herokuapp.com/card
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
