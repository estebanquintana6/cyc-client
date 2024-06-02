import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { secretKey } from "../config/config";

import isAuthMiddleware from "../middlewares/isAuthMiddleware";

import { validatePassword } from "../utils/validators";

import { hashPassword, verifyPassword } from "../utils/passwordUtils";

const router = Router();

import User from "../models/User";
// Load utils
import { transformUserToPayload } from "../utils/userToJWTPayload";

/**
 * @route GET /users
 * @desc Send Admin Invitation user
 * @params email
 * @access Private
 */
router.get("/", isAuthMiddleware, async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select(["-password"]);
    res.status(200).send(users);
  } catch {
    res.status(500).send("Error en servicio. Intentar más tarde.");
  }
});

/**
 * @route POST /users/register
 * @desc Registers user
 * @params name, last_name, email, telephone, password, code (Campus Code), role (Role name)
 * @access Public
 */
router.post(
  "/create",
  isAuthMiddleware,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const validPassword = validatePassword(password);

    if (!validPassword) {
      res.status(400).json({
        error: "Datos faltantes o incorrectos",
      });
      return;
    }

    const userExist = await User.findOne({ username });

    if (userExist) {
      res.status(400).json({
        error: "Ya hay un usuario registrado con este username",
      });
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);
      const user = new User({
        username,
        password: hashedPassword,
      });
      const newUser = await user.save();
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json({
        error: "Error en servidor",
      });
    }
    return;
  },
);

/**
 * @route POST /users/login
 * @desc Retrieves user JWT, so we can store user data by decrypting the JWT in the frontend
 * @params email, password
 * @access Public
 */
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.status(400).json({
      error: "Datos incorrectos",
    });
    return;
  }

  const isMatchingPassword = await verifyPassword(password, user.password);

  if (isMatchingPassword) {
    const payload = transformUserToPayload(user.toObject());

    jwt.sign(
      payload,
      secretKey,
      {
        expiresIn: 86400,
      },
      (error, encoded) => {
        if (error) {
          res.status(401).json({
            message: "Usuario no autorizado.",
          });
          return;
        }

        res.status(200).json({
          success: true,
          encoded,
        });
      },
    );
    return;
  } else {
    res.status(400).json({ error: "Datos incorrectos" });
    return;
  }
});

export default router;
