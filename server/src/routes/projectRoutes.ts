import { Router, Request, Response } from "express";
import { unlink } from "node:fs";
import multer from "multer";

import isAuthMiddleware from "../middlewares/isAuthMiddleware";
import Project from "../models/Project";

const router = Router();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, `projects/${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

/**
 * @route GET /fetch
 * @desc Fetch last 4 projects
 * @params none
 * @access Public
 */
router.get("/fetch", async (req: Request, res: Response) => {
  try {
    const projects = await Project.find(
      {},
      {},
      { sort: { created_at: -1 } },
    ).limit(4);
    res.status(200).send(projects);
  } catch {
    res.status(200).send([]);
  }
});

/**
 * @route GET /
 * @desc Fetch all projects
 * @params none
 * @access Private
 */
router.get("/", async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    res.status(200).send(projects);
  } catch {
    res.status(500).json({
      error: "Error en servicio. Intentar más tarde.",
    });
  }
});

/**
 * @route GET /projects/:id
 * @desc Fetch a project by id
 * @params id
 * @access Public
 */
router.get("/get/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await Project.findById(id);
    res.status(200).send(project);
  } catch {
    res.status(500).json({
      error: "Error en servicio. Intentar más tarde.",
    });
  }
});

/**
 * @route POST /projects/register
 * @desc Create a new event
 * @params name, date, capacity, price
 * @access Private
 */
router.post(
  "/register",
  upload.array("photos", 5),
  isAuthMiddleware,
  async (req: Request, res: Response) => {
    const {
      name,
      imageDescriptions,
      description,
      designer,
      projectType,
      surface,
    } = req.body;

    if (!name || !description || !designer || !projectType || !surface) {
      res.status(400).json({
        error: "Datos faltantes o incompletos",
      });
      return;
    }

    const files = req.files as Express.Multer.File[];

    const parsedDescriptions: Array<{
      url: string;
      originalName: string;
      description: string;
    }> = JSON.parse(imageDescriptions);

    const photos: Array<{ url: string; description: string }> = [];

    for (const file of files) {
      const imageDesc = parsedDescriptions.find(
        ({ originalName }) => originalName === file.originalname,
      );
      photos.push({
        url: file.filename,
        description: imageDesc?.description || "",
      });
    }

    const newProject = new Project({
      name,
      designer,
      projectType,
      surface,
      description,
      photos,
    });

    newProject
      .save()
      .then(({ _id }) => {
        if (_id) {
          res.status(200).json({
            success: true,
          });
          return;
        }
      })
      .catch((err) => {
        res.status(400).json({
          error: err,
        });
      });
  },
);

/**
 * @route POST /projects/register
 * @desc Create a new event
 * @params name, date, capacity, price
 * @access Private
 */
router.delete(
  "/delete",
  isAuthMiddleware,
  async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({
        error: "Datos faltantes o incompletos",
      });
      return;
    }

    const project = await Project.findById(id);

    if (!project) {
      res.status(200).json({
        message: "El proyecto ya no existe",
      });
      return;
    }

    const { photos } = project;

    photos.map(({ url }) => {
      unlink(`./public/${url}`, () => {
        console.log("DELETED FILE: ", url);
      });
    });

    try {
      await project.delete();
      res.status(200).json({
        success: true,
      });
      return;
    } catch {
      res.status(500).json({
        error: "Error en servicio. Intentar más tarde.",
      });
      return;
    }
  },
);

/**
 * @route GET /projects/recommendations
 * @desc Get recommendations for a project
 * @params project_id
 * @access Public
 */
router.get("/recommendations/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const projects = await Project.find({ _id: { $nin: id } }).limit(4);
    res.status(200).json(projects);
    return;
  } catch {
    res.status(500).json({
      error: "Error en servicio. Intentar más tarde.",
    });
    return;
  }
});

/**
 * @route POST /projects/update
 * @desc Update a project
 * @params name, designer, description, surface, projectType, images
 * @access Private
 */
router.post(
  "/update",
  upload.array("newPhotos", 5),
  async (req: Request, res: Response) => {
    const {
      id,
      name,
      description,
      designer,
      projectType,
      surface,
      toDeletePhotos,
      imageDescriptions,
      photos,
    } = req.body;

    const files = req.files as Express.Multer.File[];

    const parsedDescriptions: Array<{
      url: string;
      originalName: string;
      description: string;
    }> = JSON.parse(imageDescriptions);

    const newPhotos: Array<{ url: string; description: string }> = [];

    for (const file of files) {
      const imageDesc = parsedDescriptions.find(
        ({ originalName }) => originalName === file.originalname,
      );
      newPhotos.push({
        url: file.filename,
        description: imageDesc?.description || "",
      });
    }

    try {
      const project = await Project.findByIdAndUpdate(id, {
        name,
        description,
        designer,
        projectType,
        surface,
        photos: [...JSON.parse(photos), ...newPhotos],
      });

      const photosToDelete = JSON.parse(toDeletePhotos);

      if (photosToDelete.length > 0) {
        const { photos } = project;

        const filesUrlsToDelete = photos.filter(({ _id }) =>
          photosToDelete.includes(_id.toString()),
        );

        filesUrlsToDelete.map(({ url }) => {
          unlink(`./public/${url}`, () => {
            console.log("DELETED FILE: ", url);
          });
        });

        const newPhotos = photos.filter(
          ({ _id }) => !photosToDelete.includes(_id.toString()),
        );

        try {
          await project.updateOne({
            photos: newPhotos,
          });
        } catch {
          res.status(500).json({
            error: "Error al actualizar las fotos",
          });
          return;
        }
      }

      if (!project) {
        res.status(404).json({
          error: "El proyecto no existe",
        });
        return;
      } else {
        res.status(200).json({
          mensaje: "Proyecto actualizado",
        });
        return;
      }
    } catch (error) {
      res.status(500).json({
        error: error,
      });
      return;
    }
  },
);

export default router;
