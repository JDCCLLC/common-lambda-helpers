import { 
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client
} from "@aws-sdk/client-s3";

interface putStrAsS3ObjInput {
  bucketName: string,
  key: string,
  str: string,
  s3Client?: S3Client,
}

export async function putStrAsS3Obj(
  props: putStrAsS3ObjInput
): Promise<PutObjectCommandOutput> {
  
  let s3Client = props.s3Client || new S3Client({})

  let s3PutParams: PutObjectCommandInput = {
    Body: Buffer.from(props.str), 
    Bucket: props.bucketName, 
    Key: props.key, 
    ServerSideEncryption: "AES256"
  };

  return await s3Client.send(new PutObjectCommand(s3PutParams))
  
}