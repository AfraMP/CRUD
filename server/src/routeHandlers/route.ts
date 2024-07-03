import express, { Application, Request, Response } from "express";
import * as TodoList from './controller';

 const router = express.Router();

router.get('/todo/:id', TodoList.deleteTodoItem);
router.post('/todo/add', TodoList.addTodoItem);
router.get('/todo', TodoList.getTodoList);
router.post('/todo/:id', TodoList.updateTodoItem);

module.exports = router;