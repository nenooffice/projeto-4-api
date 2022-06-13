const Sorvete = require("../../models/sorvete.model");

module.exports = (req, res) => {
  if (!req.params.id || Buffer.from(req.params.id).length !== 24)
    return res.status(400).json({ error: "Invalid id" });
  Sorvete.findById(req.params.id, (err, sorvete) => {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    } else if (!sorvete) {
      res.status(404).json({ error: "Sorvete not found" });
    } else {
      const { name, description, price, image } = req.body;
      let sorveteUpdated = {};
      if (name && typeof name === "string")
        sorveteUpdated.name = name;
      if (description && typeof description === "string")
        sorveteUpdated.description = description;
      if (price && typeof price === "number")
        sorveteUpdated.price = price;
      if (image && typeof image === "string") 
        sorveteUpdated.image = image;
      if (Object.keys(sorveteUpdated).length === 0)
        return res.status(400).json({ error: "None of the fields are included" });
      sorvete.updateOne({ name, description, price, image}, (err2) => {
        if (err2) {
          console.log(err2);
          res.status(500).json({ error: "Internal server error" });
        } else {
          res.status(200).json({
            old: sorvete,
            new: sorveteUpdated
          });
        }
      });
    }
  });
};
