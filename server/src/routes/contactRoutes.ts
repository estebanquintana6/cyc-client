import { Router, Request, Response } from "express";

import isAuthMiddleware from "../middlewares/isAuthMiddleware";

const router = Router();

import Contact from "../models/Contact";

/**
 * @route GET /contacts
 * @access Private
 */
router.get("/", isAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).send(contacts);
  } catch {
    res.status(500).send("Error en servicio. Intentar más tarde.");
  }
});

/**
 * @route POST /create
 * @access Public
 */
router.post("/create", async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const contact = new Contact({ email });
    const saved = contact.save();

    if (saved) {
      res.status(200).send({ message: "Contacto guardado" });
    } else {
      res.status(400).send({ error: "El contacto no fue guardado" });
    }
  } catch {
    res.status(500).send("Error en servicio. Intentar más tarde.");
  }
});

/**
 * @route DELETE /delete/:id
 * @access Private
 */
router.delete(
  "/delete/:id",
  isAuthMiddleware,
  async (req: Request, res: Response) => {
    try {
      await Contact.findByIdAndDelete(req.params.id);
      res.status(200).send({ message: "Contacto eliminado" });
    } catch {
      res.status(500).send("Error en servicio. Intentar más tarde.");
    }
  },
);

/**
 * @route POST /finish/:id
 * @access Private
 */
router.post(
  "/attend",
  isAuthMiddleware,
  async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      await Contact.findByIdAndUpdate(id, {
        attended: true,
      });
      res.status(200).send({ message: "Contacto actualizado" });
    } catch {
      res.status(500).send("Error en servicio. Intentar más tarde.");
    }
  },
);

export default router;
