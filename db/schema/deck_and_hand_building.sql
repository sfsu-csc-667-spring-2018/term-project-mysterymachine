-- ------------------------------------------------------------------
-- Queries for creating a deck, drawing five cards and crating a hand 
-- !!MUST FIX ISSUE OF RANDOMNESS!!
-- ------------------------------------------------------------------

-- ------------------------------------------------------------------
-- Creates a new deck with a random order 
-- ------------------------------------------------------------------

CREATE VIEW deck_1 AS
SELECT *
FROM uno.cards
ORDER BY RANDOM();

-- ------------------------------------------------------------------
-- Creates a new hand from that view 
-- ------------------------------------------------------------------

CREATE VIEW hand_1 AS
SELECT * 
FROM deck_1 
LIMIT 5;

-- ------------------------------------------------------------------
-- Delets five cards from that deck 
-- ------------------------------------------------------------------

DELETE FROM deck_1 
WHERE card_id IN (SELECT card_id FROM deck_1 LIMIT 5);