export function getBucketFromS3Url(s3Uri: string): string {
  let splitByDoubleSlash = s3Uri.split('//')
  return splitByDoubleSlash[1]
}