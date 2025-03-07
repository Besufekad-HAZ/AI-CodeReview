const express = require("express");
const cors = require("cors"); // add this line
const aiRoutes = require("./routes/ai.routes");

const app = express();

app.use(cors()); // add this line to enable CORS
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/ai", aiRoutes);

module.exports = app;
