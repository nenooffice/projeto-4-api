const Sorvetes = require('../../models/sorvete.model');

module.exports = ({ params }, res) => {
  Sorvetes.findById(params.id, (err, sorvete) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (!sorvete) {
      res.status(404).json({ error: 'Sorvete not found' });
    }
    res.status(200).json(sorvete);
  })
}