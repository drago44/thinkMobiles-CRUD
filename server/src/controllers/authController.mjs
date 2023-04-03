import User from "../models/users.mjs";

export default {
  async register(req, res) {
    try {
      const user = req.body;
      const isExist = await User.exists({ email: user.email });

      if (isExist) {
        res.status(400).json({ message: "User already exists" });
        return;
      } else {
        const newUser = new User(user);
        newUser.setPassword(user.password);
        await newUser.save();

        res.status(201).json({ message: "success" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async login(req, res) {
    try {
      const user = req.body;
      const userThis = await User.findOne({ email: user.email });

      if (!userThis) {
        res.status(400).send({
          message: "User not found.",
        });
        return;
      }

      if (!userThis.validPassword(user.password)) {
        res.status(400).send({
          message: "Wrong Password",
        });
        return;
      }

      const { first_name, last_name, email, events, phone_number, _id } =
        userThis;

      res
        .status(201)
        .send({ first_name, last_name, email, events, phone_number, _id });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};
