import mongoose from "mongoose";
const { Schema } = mongoose;

// Create Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  projectType: {
    type: String,
    enum: ["Ciudad", "Desarrollo"],
    required: true,
  },
  lotes: {
    type: String,
    required: false,
    default: '',
  },
  greenAreas: {
    type: String,
    required: false,
    default: '',
  },
  surface: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
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
  favorite: {
    type: Boolean,
    required: false,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Projects", ProjectSchema);

export default Project;
