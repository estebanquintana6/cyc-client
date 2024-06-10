import mongoose from "mongoose";
const { Schema } = mongoose;

// Create Schema
const PinSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

const Pins = mongoose.model('Pins', PinSchema);

export default Pins;