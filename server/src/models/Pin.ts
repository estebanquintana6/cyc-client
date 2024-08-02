import mongoose from "mongoose";
const { Schema } = mongoose;

// Create Schema
const PinSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  photos: [
    new Schema({
      url: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      position: {
        type: Number,
        required: false,
      },
    }),
  ],
  pin_color: {
    type: String,
    required: false,
    default: "red",
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

const Pins = mongoose.model('Pins', PinSchema);

export default Pins;