import userController from "../controllers/userController.mjs";

export const userRoutes = (app) => {
  app.get("/api/users", userController.getAllUsers);
  app.get("/api/users/:id", userController.getUserById);
};
