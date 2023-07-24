// Create web server

// Import modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { uuid } = require("uuidv4");

// Create web server
const app = express();

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Create a route for GET request
app.get("/", (req, res) => {
  res.json({ message: "Welcome to comments application." });
});

// Create a route for POST request
app.post("/api/comments", (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Name cannot be empty.",
    });
  }

  // Create a comment
  const comment = {
    id: uuid(),
    name: req.body.name,
    description: req.body.description,
  };

  // Send response
  res.send(comment);
});

// Create a route for GET request
app.get("/api/comments", (req, res) => {
  // Send response
  res.send({
    comments: [
      {
        id: uuid(),
        name: "John Doe",
        description: "This is a comment.",
      },
      {
        id: uuid(),
        name: "Jane Doe",
        description: "This is another comment.",
      },
    ],
  });
});