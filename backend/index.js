const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes");
const connectDB = require("./config/db.js");

const app = express();

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://172.16.5.4:3000",
    "https://refactored-potato-v74r5qgp7j6cx7jg-3000.app.github.dev"
  ],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/manifest.json", cors(corsOptions));

app.use("/api", router);

const PORT = 8000 || process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("MongoDB Connected");
  });
});
