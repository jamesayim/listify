const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../../dist")));

// Routes - Signup and Login
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

