const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const mongodbURI = require('./constants.js')
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/files", express.static("uploads"))
// Connect to MongoDB
mongoose
  .connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("ERROR: " + err);
  });

// Routes
app.use('/auth', authRoutes);
app.use('/pdfs', pdfRoutes);
app.use('/subjects', subjectRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
