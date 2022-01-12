import { 
  _Object,
  ListObjectsV2Command,
  ListObjectsV2CommandInput,
  S3Client
} from '@aws-sdk/client-s3'
import { ConsoleLog } from '../..'

export interface recursiveListObjectsFromS3Input extends ListObjectsV2CommandInput {
  S3Client?: S3Client
}

export async function recursiveListObjectsFromS3(
  input: recursiveListObjectsFromS3Input
): Promise<_Object[]> {
  let ret: _Object[] = []
  let ourContiuationToken: string | undefined = undefined
  let s3Input: ListObjectsV2CommandInput = input

  let s3Client = input.S3Client || new S3Client({})
  let sdkCount = 0
  do {
    if (ourContiuationToken != undefined) {
      s3Input.ContinuationToken = ourContiuationToken
    }
    let s3Resp = await s3Client.send(new ListObjectsV2Command(s3Input))
    if (s3Resp.Contents) {
      ret = ret.concat(s3Resp.Contents)
    }
    if (s3Resp.NextContinuationToken) {
      ourContiuationToken = s3Resp.NextContinuationToken
    } else {
      ourContiuationToken = undefined
    }
    sdkCount = sdkCount + 1
    ConsoleLog.logObj(`SDK calls`, sdkCount)

  } while (ourContiuationToken != undefined)

  return ret
}