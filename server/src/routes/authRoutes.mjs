import authController from "../controllers/authController.mjs";

export const authRoutes = (app) => {
  app.post("/api/register", authController.register);
  app.post("/api/login", authController.login);
};
