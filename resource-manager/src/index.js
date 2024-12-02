require("dotenv").config();
const express = require("express");
const cron = require("./cron");
const resourceRoutes = require("./routes/resources");

const app = express();
app.use(express.json());
app.use("/resources", resourceRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
