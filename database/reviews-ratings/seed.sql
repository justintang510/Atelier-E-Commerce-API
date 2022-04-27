-- DELETE TABLES
-- DROP TABLE reviews CASCADE;
-- DROP TABLE reviews_photos CASCADE;
-- DROP TABLE characteristics CASCADE;
-- DROP TABLE characteristic_reviews CASCADE;

-- CREATE TABLES
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL DEFAULT NULL,
  rating INTEGER NOT NULL DEFAULT NULL,
  date BIGINT NOT NULL DEFAULT NULL,
  summary TEXT NOT NULL DEFAULT NULL,
  body TEXT NOT NULL DEFAULT NULL,
  recommend BOOLEAN NOT NULL DEFAULT NULL,
  reported BOOLEAN NOT NULL DEFAULT FALSE,
  reviewer_name TEXT NOT NULL DEFAULT NULL,
  reviewer_email TEXT NOT NULL DEFAULT NULL,
  response TEXT NULL DEFAULT NULL,
  helpfulness INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL DEFAULT NULL,
  url TEXT NOT NULL DEFAULT NULL,
  CONSTRAINT fk_reviews
    FOREIGN KEY (review_id)
      REFERENCES reviews (id)
);

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER NOT NULL DEFAULT NULL,
  CONSTRAINT fk_characteristic_reviews_characteristic
    FOREIGN KEY (characteristic_id)
      REFERENCES characteristics (id)
);

-- DELETE INDEXES
-- DROP INDEX index_product_id;
-- DROP INDEX index_review_id;
-- DROP INDEX index_characteristic_id;
-- DROP INDEX index_char_review_id;
-- DROP INDEX index_char_char_id;

-- CREATE INDEXES
CREATE INDEX index_product_id ON reviews(product_id);
CREATE INDEX index_review_id ON reviews_photos(review_id);
CREATE INDEX index_char_id ON characteristics(product_id);
CREATE INDEX index_char_review_id ON characteristics_reviews(review_id);
CREATE INDEX index_char_char_id ON characteristics_reviews(characteristic_id);

-- -- UPDATE SERIAL SEQUENCE
-- SELECT SETVAL(
--     (SELECT PG_GET_SERIAL_SEQUENCE('reviews', 'id')),
--     (SELECT (MAX("id") + 1) FROM "reviews"),
--     FALSE);
-- SELECT SETVAL(
--     (SELECT PG_GET_SERIAL_SEQUENCE('reviews_photos', 'id')),
--     (SELECT (MAX("id") + 1) FROM "reviews_photos"),
--     FALSE);
-- SELECT SETVAL(
--     (SELECT PG_GET_SERIAL_SEQUENCE('characteristics', 'id')),
--     (SELECT (MAX("id") + 1) FROM "characteristics"),
--     FALSE);
-- SELECT SETVAL(
--     (SELECT PG_GET_SERIAL_SEQUENCE('characteristics_reviews', 'id')),
--     (SELECT (MAX("id") + 1) FROM "characteristics_reviews"),
--     FALSE);

-- -- LOAD CSV FILES
-- \COPY reviews FROM 'reviews.csv' DELIMITER ',' CSV HEADER;
-- \COPY reviews_photos FROM 'reviews_photos.csv' DELIMITER ',' CSV HEADER;
-- \COPY characteristics FROM 'characteristics.csv' DELIMITER ',' CSV HEADER;
-- \COPY characteristic_reviews FROM 'characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

-- ALTER TABLE reviews ALTER COLUMN date TYPE TEXT; UPDATE reviews SET date = to_timestamp(reviews.date::bigint / 1000);

-- psql -h localhost -U postgres -d reviewsdb -f ../hackreactor/reviews-api/database/reviews-ratings/seed.sql