import { prismaClient } from "../applications/databases.js";
import { logger } from "../applications/logging.js";

export const createProduk = async (req, res) => {
  try {
    const { nama, qty, harga, deskripsi } = await req.body;
    if (!nama || !qty || !harga || !deskripsi)
      return res.status(401).json({
        message: "data required",
      });

    const checkAllProduk = await prismaClient.produk.findMany({});
    const createProduk = await prismaClient.produk.create({
      data: {
        id: checkAllProduk.length + 1,
        nama: nama,
        qty: qty,
        harga: harga,
        deskripsi: deskripsi,
      },
    });

    res.status(200).json({
      message: "successfuly created",
      data: createProduk,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

export const updateProduk = async (req, res) => {
  try {
    const { id, nama, qty, harga, deskripsi } = await req.body;

    if (!id || !nama || !qty || !harga || !deskripsi)
      return res.status(401).json({
        message: "data required",
      });

    const exeUpdate = await prismaClient.produk.update({
      data: {
        nama: nama,
        qty: qty,
        harga: harga,
        deskripsi: deskripsi,
      },
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "successfuly update",
      data: exeUpdate,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

export const getAllProduk = async (req, res) => {
  try {
    const getDataProduk = await prismaClient.produk.findMany({});
    res.status(200).json({
      data: getDataProduk,
    });
  } catch (error) {
    logger.log(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

export const getUniqueProduk = async (req, res) => {
  try {
    const { id } = await req.params;
    const getUniqueProduk = await prismaClient.produk.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      data: getUniqueProduk,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};

export const deleteProduk = async (req, res) => {
  try {
    const { id } = await req.params;
    if (!id)
      return res.status(401).json({
        message: "id required",
      });

    const exeDeleted = await prismaClient.produk.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      message: "successfuly deleted",
      data: exeDeleted,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({
      message: "server error",
    });
  }
};
