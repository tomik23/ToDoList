import ToDoListController from './controller/ToDoListController';
import StorageService from "./service/StorageService";
import CounterService from "./service/CounterService";
import ButtonsService from './service/ButtonService';

import _counter from './constants/counter';
import _buttons from './constants/buttons';

import options from '../../config/config';

document.addEventListener('DOMContentLoaded', () => {
  const storage = new StorageService(options);
  const counter = new CounterService(_counter);
  const buttons = new ButtonsService(_buttons);
  const todolist = new ToDoListController(storage, counter, buttons);

  todolist.initTodoList();
})