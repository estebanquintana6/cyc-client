import { Router, Request, Response } from "express";
import { unlink } from "node:fs";
import multer from "multer";

import isAuthMiddleware from "../middlewares/isAuthMiddleware";
import Pin from "../models/Pin";

const router = Router();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, `pins/${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage: multerStorage,
});

// Fetch all pins
router.get("/", async (req: Request, res: Response) => {
  try {
    const pins = await Pin.find();
    res.json(pins);
  } catch (error) {
    res.status(500).json({
      error: "Hubo un error en el servidor. Intentalo mas tarde.",
    });
  }
});

// Fetch by id
router.get("/get/:id", async (req: Request, res: Response) => {
  try {
    const pin = await Pin.findById(req.params.id);
    if (!pin) {
      res.status(404).json({
        error: "El pin no existe",
      });
    } else {
      res.status(200).json(pin);
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
  upload.array("photos", 5),
  isAuthMiddleware,
  async (req: Request, res: Response) => {
    const { title, text, lat, lng, link, imageDescriptions, pinColor } = req.body;

    const files = req.files as Express.Multer.File[];

    const parsedDescriptions: Array<{
      url: string;
      originalName: string;
      description: string;
      position?: number;
    }> = JSON.parse(imageDescriptions);

    const photos: Array<{ url: string; description: string; position: number | undefined }> = [];

    for (const file of files) {
      const imageDesc = parsedDescriptions.find(
        ({ originalName }) => originalName === file.originalname,
      );
      photos.push({
        url: file.filename,
        description: imageDesc?.description || "",
        position: imageDesc?.position,
      });
    }

    const newPin = new Pin({
      title,
      text,
      lat,
      lng,
      link,
      photos,
      pin_color: pinColor,
    });

    try {
      const savedPin = await newPin.save();
      res.status(200).json(savedPin);
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
      const pin = await Pin.findByIdAndDelete(req.params.id);

      const { photos } = pin;

      photos.map(({ url }) => {
        unlink(`./public/${url}`, () => {
          console.log("DELETED FILE: ", url);
        });
      });

      if (!pin) {
        res.status(404).json({
          error: "El pin no existe",
        });
      } else {
        res.status(200).json({
          mensaje: "Pin eliminado",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  },
);

// Update pin
router.post(
  "/update",
  upload.array("newPhotos", 5),
  isAuthMiddleware,
  async (req: Request, res: Response) => {
    const {
      id,
      title,
      text,
      lat,
      lng,
      link,
      imageDescriptions,
      toDeletePhotos,
      photos,
      pinColor,
    } = req.body;
    try {
      const files = req.files as Express.Multer.File[];

      const parsedDescriptions: Array<{
        url: string;
        originalName: string;
        description: string;
        position?: number;
      }> = JSON.parse(imageDescriptions);

      const newPhotos: Array<{ url: string; description: string, position: number | undefined }> = [];

      for (const file of files) {
        const imageDesc = parsedDescriptions.find(
          ({ originalName }) => originalName === file.originalname,
        );
        newPhotos.push({
          url: file.filename,
          description: imageDesc?.description || "",
          position: imageDesc.position,
        });
      }

      const pin = await Pin.findByIdAndUpdate(id, {
        title,
        text,
        lat,
        lng,
        link,
        photos: [...JSON.parse(photos), ...newPhotos],
        pin_color: pinColor,
      });

      const photosToDelete = JSON.parse(toDeletePhotos);

      if (photosToDelete.length > 0) {
        const { photos } = pin;

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
          await pin.updateOne({
            photos: newPhotos,
          });
        } catch {
          res.status(500).json({
            error: "Error al actualizar las fotos",
          });
          return;
        }
      }

      if (!pin) {
        res.status(404).json({
          error: "El pin no existe",
        });
      } else {
        res.status(200).json({
          mensaje: "Pin actualizado",
        });
      }
    } catch (error) {
      res.status(500).json({
        error: "El pin no pudo ser actualizado.",
      });
    }
  },
);

export default router;
