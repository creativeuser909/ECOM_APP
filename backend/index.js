const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes");
const connectDB = require("./config/db.js");

const app = express();

// const allowedOrigins = [
//   "https://refactored-potato-v74r5qgp7j6cx7jg-3000.app.github.dev",
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors());
app.use(express.json());
app.use("/manifest.json", cors());

app.use("/api", router)

const PORT = 8000 || process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("MongoDB Connected");
  });
});
