'use Server'
import { S3Client, GetObjectCommand, PutObjectCommand,ListObjectsCommand } from "@aws-sdk/client-s3"
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner"



// function FetchBucketData(){


const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY!,
    },
  });

export async function FetchExistingImage(username: string): Promise<string[] | null> {
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





//   try {
//     const params = {
//       Bucket: process.env.NEXT_PUBLIC_BUCKET,
//       Prefix: username,
//     }

//     const data = await s3Client.send(new GetObjectCommand(params))

//     if (data.Contents && data.Contents.length > 0) {
//       const matchingObject = data.Contents.find(obj => obj.Key?.includes(username))
      
//       if (matchingObject && matchingObject.Key) {
//         const getObjectParams = {
//           Bucket: "your-bucket-name",
//           Key: matchingObject.Key,
//         }

//         const command = new GetObjectCommand(getObjectParams)
//         const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
        
//         return signedUrl
//       }
//     }

//     return null
//   } catch (error) {
//     console.error("Error fetching existing image:", error)
//     return null
//   }
// }
// async function updateImage(username: string, newImageFile: File): Promise<boolean> {
//   try {
//     const fileContent = await newImageFile.arrayBuffer()
//     const params = {
//       Bucket: "your-bucket-name",
//       Key: `${username}-${Date.now()}.${newImageFile.name.split('.').pop()}`,
//       Body: Buffer.from(fileContent),
//       ContentType: newImageFile.type,
//     }

//     await s3Client.send(new PutObjectCommand(params))
//     return true
//   } catch (error) {
//     console.error("Error updating image:", error)
//     return false
//   }
// }
// }