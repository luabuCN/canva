import { auth } from "@/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth();
      if (!session) throw new UploadThingError("Unauthorized");
      return { userId: session.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { url: file.url };
    }),
} satisfies FileRouter;

const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export const uploadRemoteImage = async (fileUrl: string) => {
  const result = await utapi.uploadFilesFromUrl(fileUrl);
  if (!result) {
    throw new Error("Uploadthing 未返回任何结果");
  }
  return result.data;
};
export type OurFileRouter = typeof ourFileRouter;
