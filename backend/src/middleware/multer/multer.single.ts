import multer from "multer";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import AppError from "../../helpers/AppError";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const multerStorage = multer.memoryStorage();
const multerFiltter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else
    cb(
      new AppError(`invalid image ${file.originalname} is not an image `, 400)
    );
};

export const upload = multer({
  storage: multerStorage,

  fileFilter: multerFiltter,
});

export const resizeUserPhoto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1)  make an array of buffers
  const imageFile = req.file as Express.Multer.File;
  //2) convert it to base 64 strings

  const b64 = Buffer.from(imageFile.buffer).toString("base64");
  //3) new imagesNaems

  const dataUrl = `data:image/jpeg;base64,${b64}`;
  //4) upload to cloundinary

  const img = await cloudinary.uploader.upload(dataUrl);

  const iamgeUrl = await Promise.resolve(img.url);

  req.body.image = iamgeUrl;

  next();
};
