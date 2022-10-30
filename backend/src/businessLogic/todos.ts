// import { TodosAccess } from './todosAcess'
// import { AttachmentUtils } from './attachmentUtils';
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
// import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'
import { createTodo, getUserTodos, deleteTodoById, updateTodoById } from '../dataLayer/todosAcess'
// import * as createError from 'http-errors'

// // TODO: Implement businessLogic

export const createUserTodo = async (newTodo: CreateTodoRequest, userId: string): Promise<TodoItem> => {
  const todoId = uuid.v4()
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
  return getUserTodos(userId);
}

export const deleteUserTodo = async (todoId: string, userId: string): Promise<void> => {
  return deleteTodoById(todoId, userId);
}

export const updateTodo = async (todoId: string, userId: string, updatedTodo: UpdateTodoRequest): Promise<void> => {
  return updateTodoById(todoId, userId, updatedTodo);
}