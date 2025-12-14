import { put } from "@vercel/blob";
import fs from "fs";
import path from "path";
import "dotenv/config";

// CONFIGURATION
const LOCAL_FOLDER_PATH = "/Users/noah/Pictures/Hochzeit/fotobox/fullsize"; // The local folder you want to upload
const BLOB_FOLDER_PREFIX =
  "Fotobox_86DA43B1-6020-4073-9751-97907B4216E6/fullsize"; // Optional: Prefix in the blob storage (e.g. 'v1/images')

async function getFilesRecursively(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFilesRecursively(res) : res;
    }),
  );
  return files.flat();
}

async function uploadFolder() {
  try {
    console.log(`📂 Scanning folder: ${LOCAL_FOLDER_PATH}...`);

    // 1. Get all file paths
    const allFilePaths = await getFilesRecursively(LOCAL_FOLDER_PATH);
    console.log(`Found ${allFilePaths.length} files. Starting upload...`);

    // 2. Upload files concurrently
    const uploadPromises = allFilePaths.map(async (filePath) => {
      const fileBuffer = await fs.promises.readFile(filePath);

      // Calculate relative path to keep folder structure
      // e.g. local: /Users/me/project/assets/css/style.css -> blob: my-assets/css/style.css
      const relativePath = path.relative(LOCAL_FOLDER_PATH, filePath);
      const blobPath = path.join(BLOB_FOLDER_PREFIX, relativePath);

      console.log(`⬆️ Uploading: ${relativePath}`);

      return put(blobPath, fileBuffer, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: false,
      });
    });

    // 3. Wait for all uploads to finish
    const results = await Promise.all(uploadPromises);

    console.log("---");
    console.log(`✅ Successfully uploaded ${results.length} files!`);
    // console.log(results); // Uncomment to see full blob details
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
}

uploadFolder();
