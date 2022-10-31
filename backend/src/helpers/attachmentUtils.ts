import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)
const bucketName = process.env.ATTACHMENT_S3_BUCKET;

const s3 = new XAWS.S3({
  signatureVersion: "v4",
})


// // TODO: Implement the fileStogare logic

export const generateUploadUrl = async (todoId: string): Promise<string> => {
  return s3.getSignedUrl('putObject', {
    Bucket: bucketName,
    Key: todoId,
    Expires: 300
  })
}