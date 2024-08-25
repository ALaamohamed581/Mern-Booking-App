import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../../types";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageSection = () => {
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const fileReaders = acceptedFiles.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
        });
      });

      Promise.all(fileReaders).then((files) => {
        setPreviews(files);
        const fileList = new DataTransfer();
        acceptedFiles.forEach((file) => fileList.items.add(file));
        setValue("Images", fileList.files); // Set the value of the Images field
      });
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div
        className="border rounded p-4 flex flex-col gap-4"
        {...getRootProps()}
      >
        <input
          type="file"
          {...getInputProps({ multiple: true })}
          {...register("Images", {
            validate: (files) => {
              if (files.length === 0) {
                return "At least one image is required";
              }
              if (files.length > 6) {
                return "Maximum number of images is 6";
              }
              return true;
            },
          })}
          accept="image/*"
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {previews.map((preview, index) => (
          <div key={index} className="w-24 h-24">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {errors.Images && (
        <span className="text-red-500 text-sm">{errors.Images.message}</span>
      )}
    </div>
  );
};

export default ImageSection;
