import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import type { uploadThingsFileRouter } from "../app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<uploadThingsFileRouter>();

export const { useUploadThing } =
  generateReactHelpers<uploadThingsFileRouter>();
