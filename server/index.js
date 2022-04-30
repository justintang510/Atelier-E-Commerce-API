const express = require('express');

const app = express();

const path = require('path');

const port = 3000;

app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist')));

const controller = require('./controllers');

app.get('/reviews', controller.getReviews);
app.post('/reviews', controller.addReview);
app.put('/reviews/:review_id/helpful', controller.markAsHelpful);
app.put('/reviews/:review_id/report', controller.markAsReported);
app.get('/reviews/meta', controller.getMetadata);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
