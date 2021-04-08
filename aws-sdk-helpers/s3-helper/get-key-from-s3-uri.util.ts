export function getKeyFromS3Url(s3Uri: string): string {
  let splitByDoubleSlash = s3Uri.split('//')
  let splitBucketAndKeyBySlash = splitByDoubleSlash[1].split('/')
  let count = 0
  let key = ``
  for (let i of splitBucketAndKeyBySlash) {
    if (count > 0) {
      key += i
      if (count < (splitBucketAndKeyBySlash.length-1)) {
        key += '/'
      }
    }
    count = count + 1
  }
  return key
}