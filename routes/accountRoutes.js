module.exports = (app, accountCollection) => {
  //creates new user
  app.post("/createAccount", (req, res) => {
    const { name, email, password } = req.body;

    accountCollection
      .insertOne({
        name,
        email,
        password,
      })
      .then((result) => {
        return res.send(result.insertedCount > 0);
      })
      .catch((err) => console.log(err));
  });
};
