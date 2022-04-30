-- LOAD CSV FILES
\COPY reviews FROM 'reviews.csv' DELIMITER ',' CSV HEADER;
\COPY reviews_photos FROM 'reviews_photos.csv' DELIMITER ',' CSV HEADER;
\COPY characteristics FROM 'characteristics.csv' DELIMITER ',' CSV HEADER;
\COPY characteristic_reviews FROM 'characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

-- Format timestamps for all rows in reviews
-- ALTER TABLE reviews ALTER COLUMN date TYPE TEXT; UPDATE reviews SET date = to_timestamp(reviews.date::bigint / 1000);

-- psql -h localhost -U postgres -d reviewsdb -f ./reviews-api/database/seed.sql