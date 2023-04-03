import eventController from "../controllers/eventController.mjs";

export const eventRoutes = (app) => {
  app.post("/api/events/add", eventController.createEvent);
  app.get("/api/events/:id", eventController.getEventsById);
};
