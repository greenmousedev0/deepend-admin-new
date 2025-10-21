// import * as Cloudinary from "cloudinary";

// const cloud = Cloudinary;
export const uploadToCloudinary = async (files: FileList) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const uploads = Array.from(files).map(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData },
    );

    const data = await response.json();

    // Return both URL and path (derived from public_id)
    return {
      url: data.secure_url,
      path: data.public_id, // e.g. "deepend/qiink4egpvm9wcu5qbqr"
    };
  });

  return Promise.all(uploads);
};
