// import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
// import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
// import * as createError from 'http-errors'

// // TODO: Implement businessLogic

export const createTodoLogic = async (newTodo: CreateTodoRequest, userId: string): Promise<TodoItem> => {
  const todoId = uuid.v4()
  const todo = {
    todoId,
    userId,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: "",
    ...newTodo
  }

    return todo;
}
