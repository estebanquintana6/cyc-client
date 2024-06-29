import mongoose from "mongoose";
const { Schema } = mongoose;

// Create Schema
const ContactSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  attended: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

const Contact = mongoose.model('Contact', ContactSchema);

export default Contact;