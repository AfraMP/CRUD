import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
export interface Todo {
  id: number;
  todoItem: string;
}
interface GetTodoListRes {
  status: boolean;
  data: Todo[];
  message: string
}
interface TodoItemRes {
  status: boolean;
  data: Todo | null;
  message: string
}
@Injectable({
  providedIn: 'root'
})

export class TodoService {
  todoItemList!: Todo;
  constructor(private http: HttpClient) { }
  getTodoList = async() => {
    let response = await lastValueFrom(this.http.get<GetTodoListRes>('http://localhost:8080/todo'));
    if(response.status) {
      return response.data;
    } else {
      alert('Failed to fetch todo list')
      return [];
    }
  };
  addTodoItem = async(data: Todo) => {
    let response = await lastValueFrom(this.http.post<TodoItemRes>('http://localhost:8080/todo/add', data));
    if(response.status) {
      return response.data;
    } else {
      alert('Failed to add todo item')
      return null;
    }
  }
  deleteTodoItem = async(todoId: number) => {
    let response = await lastValueFrom(this.http.get<TodoItemRes>(`http://localhost:8080/todo/${todoId}`));
    if(response.status) {
      alert('Todo item deleted successfully');
    } else {
      alert('Failed to delete todo item');
    }
    return response.status;
  }
  updateTodoItem = async(data: Todo) => {
    let response  = await lastValueFrom(this.http.post<TodoItemRes>(`http://localhost:8080/todo/${data.id}`, {todoItem: data.todoItem}));
    if(response.status) {
      return response.data;
    } else {
      alert('Failed to update todo item')
      return null;
    }
  }
}
