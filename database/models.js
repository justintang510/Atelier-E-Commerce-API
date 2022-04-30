const db = require('./db');

module.exports = {

  getReviews: ({
    product_id, page, count, sort,
  }) => {
    if (sort === 'newest') {
      sort = 'r.date';
    } else if (sort === 'relevant') {
      sort = 'r.helpfulness, r.date';
    } else {
      sort = 'r.helpfulness';
    }
    const query = `
      SELECT
        r.id AS review_id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness,
        (SELECT array_to_json(COALESCE(array_agg(photo), array[]::record[]))
          FROM (SELECT rp.id,rp.url FROM reviews_photos rp WHERE rp.review_id = r.id) photo
        ) AS photos
      FROM reviews r
      WHERE product_id = ${product_id}
      ORDER BY ${sort} DESC
      LIMIT ${count}
      OFFSET ${count * (page - 1)};
    `;
    return db.query(query)
      .then((data) => {
        const returnObject = {
          product: product_id,
          page: Number(page),
          count: Number(count),
          results: data.rows,
        };
        return returnObject;
      })
      .catch((err) => err);
  },

  addReview: ({
    product_id, rating, summary, body, recommend, name, email,
  }) => {
    const query = `
      INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email)
      VALUES ($1, $2, now(), $3, $4, $5, $6, $7)
      RETURNING id;
    `;
    const values = [product_id, rating, summary, body, recommend, name, email];
    return db.query(query, values)
      .then((data) => data.rows[0])
      .catch((err) => err);
  },

  addPhotos: (review_id, photos) => {
    const query = `
      INSERT INTO reviews_photos (review_id, url)
      SELECT review_id, url
      FROM unnest($1::int[], $2::text[])
      AS u (review_id, url);
    `;
    const values = [
      Array(photos.length).fill(review_id),
      photos,
    ];
    return db.query(query, values)
      .catch((err) => err);
  },

  addCharacteristics: (review_id, characteristics) => {
    const query = `
      INSERT INTO characteristics_reviews (characteristic_id, review_id, value)
      SELECT characteristics_id, review_id, value
      FROM unnest($1::int[], $2::int[], $3::int[])
      AS u (characteristics_id, review_id, value);
    `;
    const values = [
      Object.keys(characteristics),
      Array(Object.keys(characteristics).length).fill(review_id),
      Object.values(characteristics),
    ];
    return db.query(query, values)
      .catch((err) => err);
  },

  markAsHelpful: ({ review_id }) => {
    const query = `
      UPDATE reviews
      SET helpfulness = helpfulness + 1
      WHERE id = $1;
    `;
    const values = [review_id];
    return db.query(query, values)
      .catch((err) => err);
  },

  markAsReported: ({ review_id }) => {
    const query = `
      UPDATE reviews
      SET reported = true
      WHERE id = $1;
    `;
    const values = [review_id];
    return db.query(query, values)
      .catch((err) => err);
  },

  getMetadata: ({ product_id }) => {
    const query = `
      SELECT jsonb_build_object(
        'product_id', ${product_id},
        'ratings',(
          SELECT jsonb_object_agg(rating, value) FROM (SELECT rating, COUNT(rating) as value FROM reviews WHERE product_id = $1 GROUP BY rating) as rating
        ),
        'recommend', (
          SELECT jsonb_build_object(
            'true', (SELECT COUNT(recommend) FROM reviews WHERE recommend = true AND product_id = $1),
            'false', (SELECT COUNT(recommend) FROM reviews WHERE recommend = false AND product_id = $1)
          )
        ),
        'characteristics', (
          SELECT (json_object_agg(name, jsonb_build_object('id', id, 'value', avg)))
          FROM (SELECT characteristics.name, characteristics.id, avg(characteristic_reviews.value)
          FROM characteristics
          INNER JOIN characteristic_reviews
          ON characteristics.id = characteristic_reviews.characteristic_id
          WHERE characteristics.product_id = $1
          GROUP BY characteristics.id)
          AS c
        )
      ) as data
      FROM reviews
      WHERE product_id = $1;
    `;
    const values = [product_id];
    return db.query(query, values)
      .then((data) => data.rows[0].data)
      .catch((err) => err);
  },

};
