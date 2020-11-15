const ObjectId = require("mongodb").ObjectID;

module.exports = (app, userCollection) => {
  //request booking
  app.post("/requestBooking", (req, res) => {
    const { fullName, phoneNumber, email, message } = req.body;

    userCollection
      .insertOne({
        fullName,
        phoneNumber,
        email,
        message,
        status,
      })
      .then((result) => {
        return res.send(result.insertedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  // Gets all bookings
  app.get("/getAllBookings", (req, res) => {
    userCollection
      .find({})
      .sort({ _id: -1 })
      .toArray((err, documents) => {
        if (!err) {
          return res.send(documents);
        }
      });
  });
};
