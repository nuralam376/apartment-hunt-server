// Required Modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Mongodb Connection setup
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${user}:${password}@cluster0.wc4e7.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());

// MongoDB and server starts
client.connect((err) => {
  if (err) {
    console.log("Database error", err);
    return;
  }
  console.log("Database connected");
  const db = client.db(`${process.env.DB_NAME}`);

  const apartmentCollection = db.collection("apartments");
  const userCollection = db.collection("users");
  const accountCollection = db.collection("accounts");

  require("./routes/apartmentRoutes")(app, apartmentCollection);
  require("./routes/userRoutes")(app, userCollection);
  require("./routes/accountRoutes")(app, accountCollection);
});

app.get("/", (req, res) => {
  res.send("Server is Wroking");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
