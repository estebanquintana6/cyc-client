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
  designer: {
    type: String,
    required: true,
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
    }),
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Projects", ProjectSchema);

export default Project;
