import multer from "multer";
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

export const uploadArray = multer({
  storage: multerStorage,

  fileFilter: multerFiltter,
});

export const resizeImagesArray = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.files) return next();
    const directory = path.join(__dirname, "../../public/images/users");

    // 1)  make an array of buffers
    const imageFiles = req.files as Express.Multer.File[];
    const uplaodImagePromisie = imageFiles.map(async (image, i) => {
      //2) convert it to base 64 strings

      const b64 = Buffer.from(image.buffer).toString("base64");
      //3) new imagesNaems

      const dataUrl = `data:image/jpeg;base64,${b64}`;
      //4) upload to cloundinary

      const res = await cloudinary.uploader.upload(dataUrl);

      return res.url;
    });
    //5) await all it will reurtn an array of strings that you can save in db

    const imageURLS = await Promise.all(uplaodImagePromisie);

    req.body.Images = imageURLS;
    next();
  } catch (err) {
    return new AppError("falid to uplda images", 400);
  }
};
