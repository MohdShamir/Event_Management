const express = require("express");
const mongoose = require("mongoose");
  const seedEvents = require("./seed");
  const path = require("path");


const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

mongoose.connection.once("open", async () => {
  await seedEvents();
});


// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/api/events", require("./Routes/eventRoutes"));

app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
