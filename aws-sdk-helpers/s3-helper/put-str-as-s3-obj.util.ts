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

  let s3Resp: PutObjectCommandOutput | undefined = undefined
  try {
    s3Resp = await s3Client.send(new PutObjectCommand(s3PutParams))
  } catch(err) {
    ConsoleLog.logObj(`error putting to s3`, err)
  }

  return new Promise(function(resolve, reject) {
    if (s3Resp != undefined) {
      resolve(s3Resp)
    } else {
      reject(`error putting str to s3`)
    }
  })

  
}