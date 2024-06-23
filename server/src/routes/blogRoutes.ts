import { Router, Request, Response } from "express";
import { unlink } from "node:fs";
import multer from "multer";

import isAuthMiddleware from "../middlewares/isAuthMiddleware";
import Blog from "../models/Blog";

const router = Router();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, `blogs/${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: multerStorage,
});


// Fetch all blog entries
router.get("/", async (req: Request, res: Response) => {
    try {
      const blogEntries = await Blog.find();
      res.json(blogEntries);
    } catch (error) {
      res.status(500).json({
        error: "Hubo un error en el servidor. Intentalo mas tarde.",
      });
    }
});


// Fetch by id
router.get("/get/:id", async (req: Request, res: Response) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        res.status(404).json({
          error: "La entrada de blog no existe",
        });
      } else {
        res.status(200).json(blog);
      }
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
});


// Create a new pin
router.post(
    "/create",
    upload.single("photo"),
    isAuthMiddleware,
    async (req: Request, res: Response) => {
      const { title, subtitle, text, author } = req.body;
  
      const file = req.file;
  
      const newBlogEntry = new Blog({
        title,
        subtitle,
        text,
        author,
        photo: file.filename,
      });
  
      try {
        const savedBlogEntry = await newBlogEntry.save();
        res.status(200).json(savedBlogEntry);
      } catch (error) {
        res.status(400).json({
          error: error,
        });
      }
    },
);

// Delete a pin by ID
router.delete(
    "/delete/:id",
    isAuthMiddleware,
    async (req: Request, res: Response) => {
      try {
        const blogEntry = await Blog.findByIdAndDelete(req.params.id);
  
        const { photo } = blogEntry;
  
        unlink(`./public/${photo}`, () => {
          console.log("DELETED FILE: ", photo);
        });

        if (!blogEntry) {
          res.status(404).json({
            error: "La entrada de blog no existe",
          });
        } else {
          res.status(200).json({
            mensaje: "Entrada de blog eliminada",
          });
        }
      } catch (error) {
        res.status(500).json({
          error: error,
        });
      }
    },
);

export default router;