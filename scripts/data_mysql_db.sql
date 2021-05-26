INSERT INTO category(name) VALUES("vegetable");
INSERT INTO category(name) VALUES("meat");
INSERT INTO category(name) VALUES("poultry");

INSERT INTO ingredient(name) VALUES("brocoli");
INSERT INTO ingredient(name) VALUES("green bean");
INSERT INTO ingredient(name) VALUES("chicken");
INSERT INTO ingredient(name) VALUES("beef");

INSERT INTO ingredient_category(ingredient_id, category_id) VALUES (
    (SELECT id FROM ingredient WHERE name="beef"),
    (SELECT id FROM category WHERE name="meat"));

INSERT INTO ingredient_category(ingredient_id, category_id) VALUES (
    (SELECT id FROM ingredient WHERE name="chicken"),
    (SELECT id FROM category WHERE name="meat"));

INSERT INTO ingredient_category(ingredient_id, category_id) VALUES (
    (SELECT id FROM ingredient WHERE name="chicken"),
    (SELECT id FROM category WHERE name="poultry"));

INSERT INTO ingredient_category(ingredient_id, category_id) VALUES (
    (SELECT id FROM ingredient WHERE name="brocoli"),
    (SELECT id FROM category WHERE name="vegetable"));

INSERT INTO ingredient_category(ingredient_id, category_id) VALUES (
    (SELECT id FROM ingredient WHERE name="green bean"),
    (SELECT id FROM category WHERE name="vegetable"));
