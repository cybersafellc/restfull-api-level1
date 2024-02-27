import { logger } from "../applications/logging.js";
import Jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token)
      return res.status(401).json({
        message: "token required on cookie",
      });

    await Jwt.verify(token, process.env.JWT_SCRET, (err, decode) => {
      if (err)
        return res.status(401).json({
          message: "invalid token",
        });

      req.username = decode;
      next();
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};
