import multer from "multer";
import sharp from "sharp";
import { Request, Response, NextFunction } from "express";
import AppError from "../../helpers/AppError";
import path from "path";

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
  const directory = path.join(__dirname, "../../public/images/users");
  if (!req.file) return next();

  req.file.filename = `${req.params.userId}--${
    Math.random() * Date.now() * 26484 * 2
  }--main.jpeg`;
  await sharp(req.file.buffer)
    .resize({ width: 500, height: 500 })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${directory}/${req.file.filename}`);
  return next();
};
