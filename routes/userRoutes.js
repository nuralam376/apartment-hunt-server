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
  app.patch("/changeorderstatus", (req, res) => {
    const { email, status } = req.body;

    userCollection
      .findOneAndUpdate(
        { email: email },
        {
          $set: {
            status,
          },
        }
      )
      .then(() => {
        userCollection.find({}).toArray((err, documents) => {
          if (!err) {
            return res.send(documents);
          }
          return res.send(false);
        });
      });
  });
};
