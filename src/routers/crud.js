import express from "express";
import { verifyToken } from "../middlewares/verify.js";
import {
  createProduk,
  deleteProduk,
  getAllProduk,
  getUniqueProduk,
  updateProduk,
} from "../controllers/crud.controllers.js";

const router = express.Router();
router.use(verifyToken);
router.post("/create", createProduk);
router.post("/update", updateProduk);
router.get("/search", getAllProduk);
router.get("/search/:id", getUniqueProduk);
router.delete("/delete/:id", deleteProduk);
export default router;
