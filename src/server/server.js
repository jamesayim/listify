const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes - Signup and Login
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port https://localhost:${PORT}`));
