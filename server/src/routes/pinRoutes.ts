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
    cb(null, `projects/${Date.now()}_${file.originalname}`);
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

// Create a new pin
router.post("/create", isAuthMiddleware, async (req: Request, res: Response) => {
  const { title, lat, lng, link } = req.body;

  const newPin = new Pin({
    title,
    lat,
    lng,
    link,
  });
  
  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
});

// Delete a pin by ID
router.delete(
  "/pins/:id",
  isAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      const pin = await Pin.findByIdAndDelete(req.params.id);
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

export default router;
