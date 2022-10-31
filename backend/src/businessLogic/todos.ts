import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { createTodo, getUserTodos, deleteTodoById, updateTodoById } from '../dataLayer/todosAcess'
import { generateUploadUrl } from '../helpers/attachmentUtils'

// // TODO: Implement businessLogic
const logger = createLogger('TodosBusinessLogic')

export const createUserTodo = async (newTodo: CreateTodoRequest, userId: string): Promise<TodoItem> => {
  const todoId = uuid.v4()
  logger.info('Creating a todo item');

  const todo = {
    todoId,
    userId,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl: "",
    ...newTodo
  }

    return createTodo(todo);
}

export const getAllUserTodos = async (userId: string): Promise<TodoItem[]> => {
  logger.info('Getting all todos');
  return getUserTodos(userId);
}

export const deleteUserTodo = async (todoId: string, userId: string): Promise<void> => {
  logger.info('Deleting a todo item');
  return deleteTodoById(todoId, userId);
}

export const updateTodo = async (todoId: string, userId: string, updatedTodo: UpdateTodoRequest): Promise<void> => {
  logger.info('Updating a todo item');
  return updateTodoById(todoId, userId, updatedTodo);
}

export const createAttachmentPresignedUrl = async (todoId: string): Promise<string> => {
  logger.info('Creating a presigned url');
 return generateUploadUrl(todoId);
}