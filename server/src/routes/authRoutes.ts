import { Router, Request, Response } from "express";

import isAuthMiddleware from "../middlewares/isAuthMiddleware";

const router = Router();

/**
 * @route GET /auth
 * @desc Check if an auth token is valid
 * @access Public
 */
router.get("/", isAuthMiddleware, (req: Request, res: Response) => {
    res.status(200).send("Usuario admitido");
});

export default router;