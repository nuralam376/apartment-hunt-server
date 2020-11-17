const ObjectId = require('mongodb').ObjectId;
module.exports = (app, userCollection) => {
  //request booking
  app.post("/requestBooking", (req, res) => {
    const {
      fullName,
      phoneNumber,
      email,
      message,
      status,
      apartmentId,
    } = req.body;

    userCollection
      .insertOne({
        fullName,
        phoneNumber,
        email,
        message,
        status,
        apartmentId,
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

  // Gets all bookings of an user
  app.get("/getAllBookings/:email", (req, res) => {
    const email = req.params.email;
    userCollection
      .find({ email: email })
      .sort({ _id: -1 })
      .toArray((err, documents) => {
        if (!err) {
          return res.send(documents);
        }
      });
  });

  // Changed order status
  app.patch("/changeorderstatus/:id", (req, res) => {
    userCollection.updateOne({ _id: ObjectId(req.params.id) },

      {
        $set: { status: req.body.status }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })

};
