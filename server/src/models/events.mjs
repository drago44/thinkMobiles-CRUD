import mongoose, { Schema, model } from 'mongoose';

const eventsSchema = new Schema({
  owner_id: { type: mongoose.Types.ObjectId },
  title_event: { type: String },
  descr_event: { type: String },
  start_data_event: { type: String },
  end_data_event: { type: String },
});

export default model('Event', eventsSchema);