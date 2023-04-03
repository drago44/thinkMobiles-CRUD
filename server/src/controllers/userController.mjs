import User from "../models/users.mjs";
import Event from "../models/events.mjs";

export default {
  async getAllUsers(req, res) {
    try {
      const users = await User.find({}, [
        "email",
        "first_name",
        "last_name",
        "phone_number",
        "_id",
      ]);

      const result = [];

      for (const user of users) {
        const { _id } = user;
        const events = await Event.find({ owner_id: _id });
        result.push({ ...user, events });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findById(id, [
        "email",
        "first_name",
        "last_name",
        "phone_number",
        "_id",
      ]);

      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
