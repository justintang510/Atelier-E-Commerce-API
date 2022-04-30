const model = require('../database/models');

module.exports = {

  getReviews: (req, res) => {
    model.getReviews(req.query)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  },

  addReview: (req, res) => {
    model.addReview(req.body)
      .then((data) => {
        const reviewId = data.id;
        model.addPhotos(reviewId, req.body.photos);
        model.addCharacteristics(reviewId, req.body.characteristics);
      })
      .then(res.sendStatus(201))
      .catch((err) => res.status(400).send(err));
  },

  markAsHelpful: (req, res) => {
    model.markAsHelpful(req.params)
      .then(res.sendStatus(204))
      .catch((err) => res.status(400).send(err));
  },

  markAsReported: (req, res) => {
    model.markAsReported(req.params)
      .then(res.sendStatus(204))
      .catch((err) => res.status(400).send(err));
  },

  getMetadata: (req, res) => {
    model.getMetadata(req.query)
      .then((data) => res.status(200).send(data))
      .catch((err) => res.status(400).send(err));
  },

};
