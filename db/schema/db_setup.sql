-- -----------------------------------------------------
-- Schema uno_db
-- -----------------------------------------------------
CREATE SCHEMA  uno;
-- -----------------------------------------------------
-- Table uno_db.games
-- -----------------------------------------------------
CREATE TABLE uno.games (
  game_id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  game_start TIMESTAMP(0) NOT NULL);


-- -----------------------------------------------------
-- Table uno_db.users
-- -----------------------------------------------------
CREATE TABLE uno.users (
  user_id  SERIAL NOT NULL PRIMARY KEY UNIQUE,
  username VARCHAR(45) NOT NULL,
  screen_name VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL);


-- -----------------------------------------------------
-- Table uno.games_has_players
-- -----------------------------------------------------
CREATE TABLE uno.games_has_players (
  game_id INT NOT NULL,
  user_id INT NOT NULL,
  seat_num INT NOT NULL,
  PRIMARY KEY (game_id, user_id),
  FOREIGN KEY (game_id) REFERENCES uno.games (game_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES uno.users (user_id) ON DELETE CASCADE ON UPDATE NO ACTION);

-- -----------------------------------------------------
-- Table uno.cards
-- -----------------------------------------------------
CREATE TABLE uno.cards (
  card_id INT NOT NULL PRIMARY KEY UNIQUE,
  description VARCHAR(45) NOT NULL,
  image_adress VARCHAR(45) NOT NULL);

-- -----------------------------------------------------
-- Table uno_db.decks
-- -----------------------------------------------------
CREATE TABLE uno.decks (
  deck_id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  game_id INT NOT NULL,
  FOREIGN KEY (game_id)REFERENCES uno.games (game_id) ON DELETE CASCADE ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table uno.hands
-- -----------------------------------------------------
CREATE TABLE uno.hands (
  hand_id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  player_id INT NOT NULL,
  FOREIGN KEY (player_id) REFERENCES uno.users (user_id) ON DELETE CASCADE ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table uno.records
-- -----------------------------------------------------
CREATE TABLE uno.records (
  game_id INT NOT NULL,
  user_id INT NOT NULL,
  score INT NOT NULL,
  game_status VARCHAR(45) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES uno.users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (game_id) REFERENCES uno.games (game_id) ON DELETE CASCADE ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table uno.chat_rooms
-- -----------------------------------------------------
CREATE TABLE  uno.chat_rooms (
  chat_room_id SERIAL NOT NULL PRIMARY KEY UNIQUE,
  games_game_id INT NOT NULL,
  FOREIGN KEY (games_game_id) REFERENCES uno.games (game_id) ON DELETE CASCADE ON UPDATE CASCADE);


-- -----------------------------------------------------
-- Table uno.messages
-- -----------------------------------------------------
CREATE TABLE uno.messages (
  user_id INT NOT NULL,
  chat_room_id INT NOT NULL,
  text TEXT NOT NULL,
  time_sent TIMESTAMP(6) NULL,
  PRIMARY KEY (user_id, chat_room_id),
  FOREIGN KEY (user_id) REFERENCES uno.users (user_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (chat_room_id) REFERENCES uno.chat_rooms (chat_room_id) ON DELETE CASCADE ON UPDATE CASCADE);