import { ConsoleLog } from ".."
import { getKeyFromS3Url } from "../aws-sdk-helpers/s3-helper/get-key-from-s3-uri.util"

test('get s3 key from s3 uri should be path1/path2/filename.json', () => {
  let resp = getKeyFromS3Url('s3://bucketName/path1/path2/filename.json')
  ConsoleLog.logObj(`resp`, resp)
  expect(resp).toBe('path1/path2/filename.json')
})