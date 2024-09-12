import { Router, Request, Response } from "express";
import fs from "fs";

import isAuthMiddleware from "../middlewares/isAuthMiddleware";

const router = Router();
// Load utils

/**
 * @route POST /update
 * @desc Send Admin Invitation user
 * @params email
 * @access Private
 */
router.post("/update", isAuthMiddleware, async (req: Request, res: Response) => {
    const { texts } = req.body;
    try {
        fs.writeFileSync(__dirname + '/../public/text.json', JSON.stringify(texts), {encoding:'utf8',flag:'w'});
    } catch (e) {
        console.log(e);
    }
    res.status(200).json(texts);
});


  export default router;
