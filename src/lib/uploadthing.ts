import type { MyFileRouter } from './../app/api/uploadthing/core';
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

export const UploadButton = generateUploadButton<MyFileRouter>();
export const UploadDropzone = generateUploadDropzone<MyFileRouter>();
