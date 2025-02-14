import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const myFileRouter = {
  imageUploader: f({
    image: {
      maxFileCount: 1,
      maxFileSize: "4MB"
    }
  })
    .onUploadComplete(async ({file}) => {
      console.log("Upload is complete: ", file.ufsUrl, file);

      return {metadata: file.ufsUrl}
  })
} satisfies FileRouter

export type MyFileRouter = typeof myFileRouter