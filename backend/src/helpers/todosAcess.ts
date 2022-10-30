import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import * as AWSXRay from 'aws-xray-sdk'

// import { DocumentClient } from 'aws-sdk/clients/dynamodb'
// import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
// import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)


// const logger = createLogger('TodosAccess')

// // TODO: Implement the dataLayer logic
const todosTable = process.env.TODOS_TABLE;
const docClient: DocumentClient = createDynamoDBClient()

export async function createTodo(todo: TodoItem): Promise<TodoItem> {
  await docClient.put({
    TableName: todosTable,
    Item: todo
  }).promise()

  return todo
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    console.log('Creating a local DynamoDB instance')
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8000'
    })
  }

  return new XAWS.DynamoDB.DocumentClient()
}


// export class TodoAccess {

//   constructor(
//     private readonly docClient: DocumentClient = createDynamoDBClient(),
//     private readonly todosTable = process.env.TODOS_TABLE) {
//   }

//   async getAllTodos(): Promise<TodoItem[]> {
//     // console.log('Getting all groups')
//     logger.info('Getting all groups')

//     const result = await this.docClient.scan({
//       TableName: this.todosTable
//     }).promise()

//     const items = result.Items
//     return items as TodoItem[]
//   }

//   async createTodo(todo: TodoItem): Promise<TodoItem> {
//     await this.docClient.put({
//       TableName: this.todosTable,
//       Item: todo
//     }).promise()

//     return todo
//   }

//   async updateTodo(todo: TodoUpdate): Promise<[]> {
//     await this.docClient.put({
//       TableName: this.todosTable,
//       Item: todo
//     }).promise()

//     return []
//   }

//   async deleteTodo(id: string): Promise<[]> {
//     await this.docClient.delete({
//       TableName: this.todosTable,
//       Key: {
//         todoId: id
//       }
//     }).promise()

//     return []
//   }
// }

