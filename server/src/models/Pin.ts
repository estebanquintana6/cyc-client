import mongoose from "mongoose";
const { Schema } = mongoose;

// Create Schema
const PinSchema = new Schema({
  title: {
    type: String,
    required: true,
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
    required: true
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
    }),
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
});

const Pins = mongoose.model('Pins', PinSchema);

export default Pins;