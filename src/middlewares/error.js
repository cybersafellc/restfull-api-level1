import { logger } from "../applications/logging.js";

export const pageNotFound = async (req, res, next) => {
  try {
    res.status(404).json({ message: "page not found" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const errorHandling = async (err, req, res, next) => {
  try {
    if (!err) return;
    await logger.error(err);
    res.status(500).json({ message: "server error" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ message: "server error" });
  }
};
