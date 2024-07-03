import { Component } from '@angular/core';
import { Todo, TodoService } from 'src/services/todo.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD_App';
  todoList!: Todo[];
  inputValue: string = '';
  updateField!: number | undefined;
  constructor(private todoService: TodoService) {}
  async ngOnInit() {
    this.todoList = await this.todoService.getTodoList();
  
  }
  async deleteItem(id: number) {
     let response = await this.todoService.deleteTodoItem(id);
     if(response) {
      this.todoList = this.todoList.filter((data) => data.id != id);
     }
  }
  addItem = async() => {
    if(this.inputValue.length > 0) {

      let response: Todo | null  = await this.todoService.addTodoItem({id: this.todoList.length + 1, todoItem: this.inputValue});
      if(response) {
        this.todoList.push(response);
      }
    }
  }
  edit(id: number) {
    this.updateField = id;
  }
   onUpdate = async(data: Todo) => {
    let response = await this.todoService.updateTodoItem(data);
    if(response) {
      this.updateField = undefined;
    }

  }
} 
