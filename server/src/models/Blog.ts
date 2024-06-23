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
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  author: {
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
    default: Date.now
  },
});

const Blog = mongoose.model('Blogs', BlogSchema);

export default Blog;