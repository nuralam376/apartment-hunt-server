module.exports = (app, apartmentCollection) => {
  // Gets all services
  app.get("/getAllHouses", (req, res) => {
    apartmentCollection
      .find({})
      .limit(6)
      .sort({ _id: -1 })
      .toArray((err, documents) => {
        if (!err) {
          return res.send(documents);
        }
      });
  });
};
