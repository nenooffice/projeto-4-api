const Sorvete = require('../../models/sorvete.model');

module.exports = (req, res) => {
  const { name, description, price, image } = req.body;
  if (!name || !description || !price || !image)
    return res.status(400).json({ error: 'Missing required fields' });
  if (typeof name !== 'string' || typeof description !== 'string' || typeof price !== 'number' || typeof image !== 'string')
    return res.status(400).json({ error: 'Invalid data type' });
  new Sorvete({ name, description, price, image }).save((err, sorvete) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json(sorvete);
    }
  });
}