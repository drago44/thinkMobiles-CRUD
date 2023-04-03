import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { authRoutes } from "./routes/authRoutes.mjs";
import { userRoutes } from "./routes/userRoutes.mjs";
import { eventRoutes } from "./routes/eventRoutes.mjs";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  const contentType = req.headers["content-type"];
  if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
    req.isFormData = true;
  }
  next();
});
app.use((req, res, next) => {
  const contentType = req.headers["content-type"];
  if (
    contentType &&
    contentType.indexOf("application/x-www-form-urlencoded") !== -1
  ) {
    req.body = qs.parse(req.body);
  }
  next();
});

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/crud", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

authRoutes(app);
userRoutes(app);
eventRoutes(app);

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
