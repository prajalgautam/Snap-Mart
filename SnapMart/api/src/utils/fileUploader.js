import { v2 as cloudinary } from "cloudinary";

async function uploadFile(files) {
  const uploadedFiles = [];

  for (const file of files) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "20260320",
            allowed_formats: ["jpg", "png", "webp"],
            secure: true,
          },
          (error, data) => {
            if (error) return reject(error);

            resolve(data);
          },
        )
        .end(file.buffer);
    });

    // Prefer HTTPS URLs so uploaded assets work with Next/Image and are not
    // downgraded when the storefront is served over HTTPS.
    uploadedFiles.push({ ...result, url: result.secure_url || result.url });
  }

  return uploadedFiles;
}

export default uploadFile;
