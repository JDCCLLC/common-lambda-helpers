import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Credentials } from "@aws-sdk/types";

interface getStringFromS3Input {
  bucketName: string,
  key: string,
  credentials?: Credentials,
  region?: string
}

export async function getStringFromS3Object(
  props: getStringFromS3Input
): Promise<any> {
  // get file from s3
  if (props.region == undefined) {
    props.region = 'us-east-1'
  }
  let s3Client = new S3Client({
    region: props.region
  })
  if (props.credentials != undefined) {
    s3Client = new S3Client({
      region: props.region,
      credentials: props.credentials
    })
  }
  let getObjResp = await s3Client.send(new GetObjectCommand({
    Bucket: props.bucketName,
    Key: props.key,
  }))
  return new Promise(function(resolve, reject) {
    if (getObjResp.Body) {
      let item = getObjResp.Body
      let dataAsStr = '';
      if ('on' in item) {
        if (typeof item.on === 'function') {
          try {
            item.on('data', function (chunk: any) {
              dataAsStr += chunk;
            });
            item.on('end', function () {
              try {
                resolve(dataAsStr);
              } catch(err) {
                reject(err)
              }
            });
            item.on('error', function (err: any) {
              reject(err);
            });
          } catch(err) {
            reject(err);
          }
        } else {
          reject('unable to get object body from s3')
        }
      }
    } else {
      reject(`i dont know how to read this from s3 yet`)
    }
  })
}