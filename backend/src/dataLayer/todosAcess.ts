import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
const AWSXRay = require('aws-xray-sdk')

import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';


const XAWS = AWSXRay.captureAWS(AWS)


const logger = createLogger('TodosAccess')

// // TODO: Implement the dataLayer logic
const todosTable = process.env.TODOS_TABLE;
const docClient: DocumentClient = createDynamoDBClient()

export async function createTodo(todo: TodoItem): Promise<TodoItem> {
  logger.info('Creating a todo item');
  await docClient.put({
    TableName: todosTable,
    Item: todo
  }).promise()

  return todo
}

export async function deleteTodoById(todoId: string, userId: string): Promise<void> {
  logger.info('Deleting a todo item');

  await docClient.delete({
    TableName: todosTable,
    Key: {
      todoId,
      userId
    }
  }).promise()
}

export async function updateTodoById(todoId: string, userId: string, updatedTodo: UpdateTodoRequest): Promise<void> {
  logger.info('Updating a todo item');

  await docClient.update({
    TableName: todosTable,
    Key: {
      todoId,
      userId
    },
    UpdateExpression: "set #name = :n, dueDate = :d, done = :done",
    ExpressionAttributeValues: {
      ":n": updatedTodo.name,
      ":d": updatedTodo.dueDate,
      ":done": updatedTodo.done
    },
    ExpressionAttributeNames: {
      "#name": "name"
    }
  }).promise()
}

export async function saveImageAttachment(userId: string, todoId: string, bucketName: string): Promise<void> {
  logger.info('Updating database with attachment url');
  await docClient.update({
        TableName: todosTable,
        Key: { userId, todoId },
        ConditionExpression: 'attribute_exists(todoId)',
        UpdateExpression: 'set attachmentUrl = :attachmentUrl',
        ExpressionAttributeValues: {
          ':attachmentUrl': `https://${bucketName}.s3.amazonaws.com/${todoId}`
        }
      }).promise();
}

export async function getUserTodos(userId: string): Promise<TodoItem[]> {
  logger.info('Getting all todos');

  const result = await docClient.query({
    TableName: todosTable,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': userId
    }
  }).promise()

  const items = result.Items
  return items as TodoItem[]
}


function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance');

    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}
