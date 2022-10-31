import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { getUserId } from '../utils';


import { createAttachmentPresignedUrl, saveAttachmentUrl } from '../../businessLogic/todos'

const bucketName = process.env.ATTACHMENT_S3_BUCKET;


export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId

    const url = await createAttachmentPresignedUrl(todoId)
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id

    await saveAttachmentUrl(getUserId(event), todoId, bucketName);

    return {
      statusCode: 200,
      body: JSON.stringify({
        uploadUrl: url
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
