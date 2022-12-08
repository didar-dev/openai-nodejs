const path = require("path");
const express = require("express");
const port = 5000;
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/ai", require("./routes/openaiRoutes"));
app.listen(port, () => console.log(`Server started on port ${port}`));
