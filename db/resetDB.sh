#cd to the script location first
cd $(dirname "$0")
dropdb 667termproject
createdb 667termproject
psql -d 667termproject -a -f schema/db_setup.sql
psql -d 667termproject -a -f schema/card_data_inserts.sql