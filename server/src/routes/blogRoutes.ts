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

interface IBlogEntry {
  title: string;
  subtitle: string;
  text: string;
  author: string;
  photos?: any[];
}

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

// Fetch 4 recent entries
router.get("/recent", async (req: Request, res: Response) => {
  try {
    const blogEntries = await Blog.find({}).sort({ created_at: -1 }).limit(3);
    res.json(blogEntries);
  } catch (error) {
    res.status(500).json({
      error: "Hubo un error en el servidor. Intentalo mas tarde.",
    });
  }
});

// Fetch recommended blog entries
router.get("/recommendations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blogEntries = await Blog.find({ _id: { $nin: id } }).limit(4);
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

// Create a new blog entry
router.post(
  "/create",
  upload.array("photos", 5),
  isAuthMiddleware,
  async (req: Request, res: Response) => {
    const { title, subtitle, text, author, imageDescriptions } = req.body;

    console.log(imageDescriptions);

    const files = req.files as Express.Multer.File[];

    const parsedDescriptions: Array<{
      url: string;
      originalName: string;
      description: string;
      position?: number;
    }> = JSON.parse(imageDescriptions);

    const photos: Array<{
      url: string;
      description: string;
      position: number | undefined;
    }> = [];

    for (const file of files) {
      const imageDesc = parsedDescriptions.find(
        ({ originalName }) => originalName === file.originalname,
      );
      photos.push({
        url: file.filename,
        description: imageDesc?.description || "",
        position: imageDesc.position,
      });
    }

    const newBlogEntry = new Blog({
      title,
      subtitle,
      text,
      author,
      photos,
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

// update a blog entry
router.post(
  "/update",
  upload.array("newPhotos", 5),
  isAuthMiddleware,
  async (req: Request, res: Response) => {
    const {
      id,
      title,
      subtitle,
      text,
      author,
      toDeletePhotos,
      imageDescriptions,
      photos,
    } = req.body;

    const files = req.files as Express.Multer.File[];

    const parsedDescriptions: Array<{
      url: string;
      originalName: string;
      description: string;
      position?: number;
    }> = JSON.parse(imageDescriptions);

    const newPhotos: Array<{ url: string; description: string; position: number | undefined; }> = [];

    for (const file of files) {
      const imageDesc = parsedDescriptions.find(
        ({ originalName }) => originalName === file.originalname,
      );
      newPhotos.push({
        url: file.filename,
        description: imageDesc?.description || "",
        position: imageDesc?.position,
      });
    }

    try {
      const blogEntry = await Blog.findByIdAndUpdate(id, {
        title,
        subtitle,
        text,
        author,
        photos: [...JSON.parse(photos), ...newPhotos],
      });

      const photosToDelete = JSON.parse(toDeletePhotos);

      if (photosToDelete.length > 0) {
        const { photos } = blogEntry;
  
        const filesUrlsToDelete = photos.filter(({ _id }) =>
          photosToDelete.includes(_id.toString()),
        );
  
        filesUrlsToDelete.map(({ url }) => {
          unlink(`./public/${url}`, () => {
            console.log("DELETED FILE: ", url);
          });
        });
  
        const newPhotos = photos.filter(
          ({ _id }) => !toDeletePhotos.includes(_id.toString()),
        );
  
        try {
          await blogEntry.updateOne({
            photos: newPhotos,
          });
        } catch {
          res.status(500).json({
            error: "Error al actualizar las fotos",
          });
          return;
        }
      }  

      if (blogEntry) {
        res.status(200).json(blogEntry);
        return;
      } else {
        res.status(400).json({
          error: "Error al actualizar entrada de blog",
        });
      }
    } catch (error) {
      res.status(400).json({
        error: "Error al actualizar entrada de blog",
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

      const { photos } = blogEntry;

      photos.map(({ url }) => {
        unlink(`./public/${url}`, () => {
          console.log("DELETED FILE: ", url);
        });
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
