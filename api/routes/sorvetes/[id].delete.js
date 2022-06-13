const Sorvete = require('../../models/sorvete.model');

module.exports = (req, res) => {
  if (!req.params.id || req.params.id.length !== 24) 
    return res.status(400).json({ error: 'Invalid id' });
  Sorvete.findById(req.params.id, (err, sorvete) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (!sorvete) {
      res.status(404).json({ error: 'Sorvete not found' });
    } else {
      sorvete.remove((err2) => {
        if (err2) {
          console.log(err2);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(200).end();
        }
      });
    }
  })
}