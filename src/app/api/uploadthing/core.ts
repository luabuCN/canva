import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { UTApi } from "uploadthing/server";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
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
