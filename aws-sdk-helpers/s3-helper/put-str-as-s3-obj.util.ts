import { 
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client
} from "@aws-sdk/client-s3";
import { ConsoleLog } from "../..";

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

  try {
    let s3Resp = await s3Client.send(new PutObjectCommand(s3PutParams))
    return Promise.resolve(s3Resp)
  } catch(err) {
    ConsoleLog.logObj(`error putting to s3`, err)
    return Promise.reject(err)
  }
  
}