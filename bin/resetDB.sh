node_modules/.bin/sequelize db:drop
node_modules/.bin/sequelize db:create
node_modules/.bin/sequelize db:migrate
psql -d 667termproject -a -f db/load_cards.sql
