"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetObjectInfoFromS3EventRecord = void 0;
/**
 * Takes an S3 event notification record and gets object info
 */
function GetObjectInfoFromS3EventRecord(record) {
    let ret = undefined;
    let bucketName = undefined;
    let objKey = undefined;
    if (record.s3 !== undefined) {
        if (record.s3.bucket !== undefined) {
            if (record.s3.bucket.name !== undefined) {
                bucketName = record.s3.bucket.name;
            }
        }
        if (record.s3.object !== undefined) {
            if (record.s3.object.key !== undefined) {
                objKey = record.s3.object.key;
            }
        }
    }
    if (bucketName !== undefined) {
        if (objKey !== undefined) {
            ret = {
                BucketName: bucketName,
                Key: objKey,
                S3Uri: `s3://${bucketName}/${objKey}`
            };
        }
    }
    return ret;
}
exports.GetObjectInfoFromS3EventRecord = GetObjectInfoFromS3EventRecord;
/*
SAMPLE RECORD
{
    "eventVersion": "2.1",
    "eventSource": "aws:s3",
    "awsRegion": "us-east-1",
    "eventTime": "2021-08-31T15:27:25.259Z",
    "eventName": "ObjectCreated:Copy",
    "userIdentity": {
        "principalId": "AWS:AROAXHXWSMKXEGHQMK7HM:david.sheffield@cloudticity.com"
    },
    "requestParameters": {
        "sourceIPAddress": "24.112.118.207"
    },
    "responseElements": {
        "x-amz-request-id": "2ADFKW8QEGVAS4NF",
        "x-amz-id-2": "nsxJKx2p+Ik2yJ7bwx8KcjjxM5Fehc0mhGnaqCedqd64x9pxg0VE6XB0r3SEn3qWtL2NXunT/s3lf5oU09QZWHvrwXNWKJQYYjIZfKLrw78="
    },
    "s3": {
        "s3SchemaVersion": "1.0",
        "configurationId": "incrementalEclrsFile",
        "bucket": {
            "name": "test-bodega-sftp-us-east-1",
            "ownerIdentity": {
                "principalId": "A2ALJD3OACEJPK"
            },
            "arn": "arn:aws:s3:::test-bodega-sftp-us-east-1"
        },
        "object": {
            "key": "sMPI-DOHMPI/IncrementalECLRS/sMPICovidFile202105241200_01.csv",
            "size": 859913,
            "eTag": "c405bfd7bc848df0c8fb71b2923e7b91",
            "sequencer": "00612E4A662D3F6140"
        }
    }
}
*/ 
//# sourceMappingURL=get-object-info-from-s3-event-record.util.js.map