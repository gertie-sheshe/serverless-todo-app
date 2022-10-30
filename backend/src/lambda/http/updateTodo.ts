import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'
import { TodoItem } from '../../models/TodoItem'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const updatedTodo: TodoItem = JSON.parse(event.body)
    console.log(updatedTodo)
    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    await updateTodo(event.pathParameters.todoId, getUserId(event), updatedTodo)
    return {
      statusCode: 200,
      body: JSON.stringify({})
    }
  })

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
