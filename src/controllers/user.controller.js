import { prismaClient } from "../applications/databases.js";
import { logger } from "../applications/logging.js";
import Jwt from "jsonwebtoken";

export const userLogin = async (req, res) => {
  try {
    const { username, password } = await req.body;

    if (!username || !password)
      return res.status(401).json({ message: "data required" });
    const checkDataUser = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!checkDataUser)
      return res.status(401).json({
        message: "username not register",
      });

    const validate = checkDataUser.password === password ? true : false;
    if (!validate)
      return res.status(401).json({
        message: "password incorect",
      });

    const token = await Jwt.sign(
      { username: checkDataUser.username },
      process.env.JWT_SCRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token);
    res.status(200).json({
      message: "successfuly login",
      token: token,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "server error" });
  }
};
