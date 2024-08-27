import { useFormContext } from "react-hook-form";
import { HotelFormData } from "../../../types";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsTrash } from "react-icons/bs";

const ImageSection = () => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("Images");
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (existingImageUrls)
      setPreviews((current) => [...current, ...existingImageUrls]);
  }, [existingImageUrls, setValue]);

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
        setPreviews((current) => [...current, ...files]);
        const fileList = new DataTransfer();
        acceptedFiles.forEach((file) => fileList.items.add(file));
        setValue("ImagesFiles", fileList.files);

        // Set the value of the Images field
      });
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    src: string
  ) => {
    event.preventDefault();
    setPreviews((current) => current.filter((url) => url !== src));
  };

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
          {...register("ImagesFiles", {})}
          accept="image/*"
        />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
      </div>
      <div className="grid grid-cols-6 gap-4">
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <img
              src={preview}
              alt={`Preview ${index}`}
              className="object-cover min-h-full"
            />
            <button
              onClick={(e) => handleDelete(e, preview)}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 text-white m-x-2 text-5xl"
            >
              <BsTrash color="red" />
            </button>
          </div>
        ))}
      </div>

      {errors.ImagesFiles && (
        <span className="text-red-500 text-sm">
          {errors.ImagesFiles.message}
        </span>
      )}
    </div>
  );
};

export default ImageSection;
