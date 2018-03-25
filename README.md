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
# Install instructions
Check out the source code, then run following commands to install:

cd myapp

npm install

touch .env

echo DATABASE_URL=postgres://\`whoami\`@localhost:5432/667termproject >> .env

bin/resetDB.sh

npm run start:dev
