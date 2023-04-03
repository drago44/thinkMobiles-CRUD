import Event from "../models/events.mjs";

export default {
  async createEvent(req, res) {
    try {
      const id = req.body.id;
      const { title_event, descr_event, start_data_event, end_data_event } =
        req.body.values;

      const events = await Event.find({ owner_id: id });

      const overlappingEvent = events.find(
        (event) =>
          (start_data_event >= event.start_data_event &&
            start_data_event <= event.end_data_event) ||
          (end_data_event >= event.start_data_event &&
            end_data_event <= event.end_data_event)
      );

      if (overlappingEvent) {
        return res
          .status(400)
          .send({ message: "You can’t create event for this time" });
      }

      const event = new Event({
        title_event,
        descr_event,
        start_data_event,
        end_data_event,
        owner_id: id,
      });

      await event.save();

      res.status(201).send({ message: "success" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  async getEventsById(req, res) {
    try {
      const id = req.params.id;
      const events = await Event.find({ owner_id: id });

      if (!events) {
        return res.status(404).send({ message: "Events not found" });
      }

      res.status(201).send(events);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
