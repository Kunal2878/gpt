'use Server'
import { S3Client, GetObjectCommand, PutObjectCommand,ListObjectsCommand } from "@aws-sdk/client-s3"
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner"



// function FetchBucketData(){



export default async function FetchExistingImage(username: string): Promise<string[] | null> {
  const s3Client = new S3Client({
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY!,
      },
    });
  const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET, // Replace with your S3 bucket name
      Prefix: `${username}/`, // Prefix the search with the username
  };
  try {
      const data = await s3Client.send(new ListObjectsCommand(params));
      if (data.Contents) {
          const images = data.Contents.filter(
              (object) => object.Key && object.Key.includes(username) && object.Key.endsWith('.jpg') // Adjust the file extension if needed
          ).map(object => object.Key as string);
          return images;
      }
      return null;
  } catch (error) {
      console.error('Error fetching images:', error);
      return null;
  }
}





