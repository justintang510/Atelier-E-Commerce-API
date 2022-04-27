const model = require('./models');

module.exports = {

  getReviews: (req, res) => {
    model.getReviews(req.query)
      .then(data => res.status(200).send(data))
      .catch(err => console.log(err))
  },

  addReview: (req, res) => {
    model.addReview(req.body)
      .then(data => {
        let review_id = data.id;
        model.addPhotos(review_id, req.body.photos);
        model.addCharacteristics(review_id, req.body.characteristics)
      })
      .then(res.sendStatus(201))
      .catch(err => console.log(err))
  },

  markAsHelpful: (req, res) => {
    model.markAsHelpful(req.params)
      .then(res.sendStatus(204))
      .catch(err => console.log(err))
  },

  markAsReported: (req, res) => {
    model.markAsReported(req.params)
      .then(res.sendStatus(204))
      .catch(err => console.log(err))
  },

  getMetadata: (req, res) => {
    model.getMetadata(req.query)
      .then(data => res.status(200).send(data))
      .catch(err => console.log(err))
  },

}