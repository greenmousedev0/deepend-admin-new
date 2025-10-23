import type { HotelInfo } from "@/api/types";
import { XCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface UpdateImagesProps {
  images: { url: string; path: string }[];
  setNew: (item: any) => any;
  setPrev: (item: any) => any;
}

export default function UpdateImages({
  images,
  setNew,
  setPrev,
}: UpdateImagesProps) {
  const [prevImages, setPrevImages] =
    useState<{ url: string; path: string }[]>(images);
  const [newImages, setNewImages] = useState<FileList | []>([]);
  useEffect(() => {
    setNew(newImages);
  }, [newImages]);
  useEffect(() => {
    setPrev(prevImages);
  }, [prevImages]);

  const removeNewImage = (indexToRemove: number) => {
    if (newImages) {
      // Convert FileList to array, filter out the file at indexToRemove
      const filesArray = Array.from(newImages);
      const filteredFiles = filesArray.filter(
        (_, index) => index !== indexToRemove,
      );

      // Create a new FileList using DataTransfer
      const dataTransfer = new DataTransfer();
      filteredFiles.forEach((file) => dataTransfer.items.add(file));
      setNewImages(dataTransfer.files); // Update state with new FileList
    }
  };
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
        <div className="h-40 flex">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            name=""
            id="new-images"
            onChange={(e) => {
              const files = e.target.files;
              setNewImages((prev) => [...prev, ...files]);
            }}
          />
          <label
            htmlFor="new-images"
            className="flex-1 p-2 grid place-items-center text-xl font-bold"
          >
            <span>Upload Image</span>
          </label>
        </div>
        {prevImages.map((image, index) => (
          <div key={image.path} className="relative h-40 w-full">
            <button
              type="button"
              className="btn btn-circle btn-error absolute right-0 top-0 m-2 z-10"
              onClick={() => {
                setPrevImages((prev) =>
                  prev.filter((img) => img.path !== image.path),
                );
              }}
            >
              <XCircle />
            </button>
            <img
              className="size-full object-cover rounded-lg"
              src={image.url}
              alt={`Existing image ${index + 1}`}
            />
          </div>
        ))}

        {newImages &&
          Array.from(newImages).map((image, index) => (
            <div key={image.name + index} className="relative h-40 w-full">
              <button
                type="button"
                className="btn btn-circle btn-error absolute right-0 top-0 m-2 z-10"
                onClick={() => {
                  removeNewImage(index);
                }}
              >
                <XCircle />
              </button>
              <img
                className="size-full object-cover rounded-lg"
                src={URL.createObjectURL(image)}
                alt={`New image ${index + 1}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
