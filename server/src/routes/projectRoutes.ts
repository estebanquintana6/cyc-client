import { Router, Request, Response } from "express";
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
    storage: multerStorage
});

/**
 * @route GET /
 * @desc Fetch all projects
 * @params none
 * @access Private
 */
router.get("/", isAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({});
    res.status(200).send(projects);
  } catch {
    res.status(500).json({
        error: "Error en servicio. Intentar más tarde."
    });
  }
});


/**
 * @route GET /projects/:id
 * @desc Fetch a project by id
 * @params id
 * @access Private
 */
router.get("/get/:id", isAuthMiddleware, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);
      res.status(200).send(project);
    } catch {
      res.status(500).json({
          error: "Error en servicio. Intentar más tarde."
      });
    }
});

/**
 * @route POST /projects/register
 * @desc Create a new event
 * @params name, date, capacity, price
 * @access Private
 */
router.post("/register", upload.array("photos", 5), isAuthMiddleware, async (req: Request, res: Response) => {
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
            error: "Datos faltantes o incompletos"
        });
        return;
    }

    const files= req.files as Express.Multer.File[];

    const parsedDescriptions : Array<{ url: string, originalName: string, description: string}> = JSON.parse(imageDescriptions);

    const photos : Array<{ url: string, description: string}> = [];

    for (const file of files) {
        const imageDesc = parsedDescriptions.find(({ originalName }) => originalName === file.originalname);
        console.log(file);
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
        photos
    });

    newProject.save().then(({ _id }) => {
        if (_id) { 
            res.status(200).json({
                success: true
            });
            return;
        }
    }).catch((err) => {
        res.status(400).json({
            error: err
        });
    });

});

export default router;