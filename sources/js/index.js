import ToDoListController from './controller/ToDoListController';
import StorageService from './service/StorageService';
import CounterService from './service/CounterService';
import ButtonsService from './service/ButtonService';
import LightService from './service/LightService';

import _counter from './constants/counter';
import _buttons from './constants/buttons';
import _light from './constants/light';
import options from '../../config/config';

document.addEventListener('DOMContentLoaded', () => {
  const storage = new StorageService(options);
  const counter = new CounterService(_counter);
  const buttons = new ButtonsService(_buttons);
  const light = new LightService(_light);

  const todolist = new ToDoListController(storage, counter, buttons, light);

  todolist.initTodoList();
});
