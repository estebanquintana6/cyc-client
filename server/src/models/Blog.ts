import mongoose from "mongoose";
const { Schema } = mongoose;

// Create Schema
const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  photoDescription: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

const Blog = mongoose.model('Blogs', BlogSchema);

export default Blog;