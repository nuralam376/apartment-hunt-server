const ObjectId = require("mongodb").ObjectID;

module.exports = (app, apartmentCollection) => {
  // Gets all apartments
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

  //Adds new apartments
  app.post("/addHouse", (req, res) => {
    const { serviceTitle, price, location, noBedroom, noBathroom } = req.body;
    const thumbnailFile = req.files.thumbnail;

    const thumbnailImageFile = thumbnailFile.data;
    const encodedThumbnailImage = thumbnailImageFile.toString("base64");

    const thumbnailImage = {
      contentType: thumbnailFile.mimeType,
      size: thumbnailFile.size,
      img: Buffer.from(encodedThumbnailImage, "base64"),
    };

    apartmentCollection
      .insertOne({
        serviceTitle,
        price,
        location,
        noBedroom,
        noBathroom,
        thumbnailImage,
      })
      .then((result) => {
        return res.send(result.insertedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  // Gets the individual apartment information
  app.get("/getAllHouses/:id", (req, res) => {
    const id = req.params.id;

    apartmentCollection
      .findOne({ _id: ObjectId(id) })
      .then((service) => {
        if (service) {
          return res.send(service);
        }
        return res.send(null);
      })
      .catch((err) => console.log(err));
  });
};
