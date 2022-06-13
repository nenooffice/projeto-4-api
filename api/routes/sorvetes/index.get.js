const Sorvete = require('../../models/sorvete.model');

module.exports = (req, res) => {
  if (req.query.search) {
    Sorvete.find({ name: { $regex: req.query.search, $options: 'i' } }, (err, sorvetes) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
      } else if (!sorvetes) {
        res.status(404).json({ error: 'Sorvetes not found' });
      }
      res.status(200).json(sorvetes);
    });
  }
  else Sorvete.find({}, 'name description price image', (err, sorvetes) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(sorvetes);
    }
  })
}