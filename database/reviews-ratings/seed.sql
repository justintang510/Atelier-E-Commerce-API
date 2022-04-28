
-- -- LOAD CSV FILES
\COPY reviews FROM 'reviews.csv' DELIMITER ',' CSV HEADER;
\COPY reviews_photos FROM 'reviews_photos.csv' DELIMITER ',' CSV HEADER;
\COPY characteristics FROM 'characteristics.csv' DELIMITER ',' CSV HEADER;
\COPY characteristic_reviews FROM 'characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

ALTER TABLE reviews ALTER COLUMN date TYPE TEXT; UPDATE reviews SET date = to_timestamp(reviews.date::bigint / 1000);

-- psql -h localhost -U postgres -d reviewsdb -f ../hackreactor/reviews-api/database/reviews-ratings/seed.sql