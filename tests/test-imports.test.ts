import { ConsoleLog } from '../index'
import {S3Helper} from '../index'


test('simpe test', () => {
  let resp = S3Helper.getBucketFromS3Url('s3://test/path1/key.json')
  ConsoleLog.logObj(`resp`, resp)
  expect(resp).toBe('test')
})