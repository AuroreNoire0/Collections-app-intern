const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./db.js");
const routes = require("./routes.js");
const { notFound, errorHandler } = require("./errorMiddleware.js");
const path = require("path");
const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.use("/api", routes);

__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
