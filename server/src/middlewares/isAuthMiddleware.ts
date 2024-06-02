import { Request, Response } from "express";

import jwt from "jsonwebtoken";

const isAdmin = (req: Request, res: Response, next: () => void) => {
    const { headers } = req;
    const { authorization } = headers;

    const { JWT_SECRET: secretKey } = process.env;

    if(!authorization || !secretKey) {
        res.status(401).send("Acceso denegado");
        return;
    }

    try {
        const validToken = jwt.verify(authorization, secretKey);

        if (validToken) {
            return next();
        } else {
            res.status(401).json({
                error: "Acceso denegado"
            });
            return;
        }
    } catch(err) {
        res.status(500).json({
            error: "Fallo en servidor. Intentar más tarde."
        });
        return;
    }
}

export default isAdmin;