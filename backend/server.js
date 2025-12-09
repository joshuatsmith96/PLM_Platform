const express = require("express");
const projectRoutes = require("./routes/projectRoutes");
const stageRoutes = require("./routes/stageRoutes");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:5173",
  })
);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/stages", stageRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
