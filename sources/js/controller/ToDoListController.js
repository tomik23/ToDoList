import FormView from '../view/FormView';

class ToDoListController {
  constructor(storage, counter, buttons, light) {
    this.todolist = 'todolist';
    this.taskList = '.taskList';
    this.item = 'item';
    this.checked = 'checked';
    this.taskForm = '.taskForm';
    this.dataId = 'data-id';
    this.more = 'more';
    this.taskName = '#taskName';
    this.taskDescription = '#taskDescription';
    this.buttonText = '.button-text';

    this.storage = storage;
    this.counter = counter;
    this.buttons = buttons;
    this.light = light;

    const formView = new FormView();
    formView.renderView('.app-todo');
  }

  initTodoList() {
    const save = document.getElementById('save');

    save.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();

      const id = this.getLastId();

      const name = document.querySelector(this.taskName).value.trim();
      const description = document.querySelector(this.taskDescription);

      const typeInsert = document.querySelector(this.buttonText).value;

      const insertType =
        typeInsert === 'text' ? description.textContent : description.innerHTML;

      if (name) {
        const list = {
          id,
          name,
          info: insertType,
          check: false,
        };
        description.innerHTML = '';
        this.createLocalStorage(list);
      }
    });
    this.output();
    this.light.switchLight();
    this.buttons.buttonCreate();
  }

  getLastId() {
    const lengthStorage = this.storage.getItemFromStorage(this.todolist);
    const id = [];
    if (lengthStorage) {
      lengthStorage.forEach(item => {
        id.push(item.id);
      });
    }

    const idNumber = id.length === 0 ? 1 : Math.max(...id) + 1;
    return idNumber;
  }

  createLocalStorage(list) {
    const store = this.storage.getItemFromStorage(this.todolist)
      ? this.storage.getItemFromStorage(this.todolist)
      : [];

    store.push(list);

    this.storage.removeItemFromStorage(this.todolist);
    this.storage.setToStorage(this.todolist, store);

    this.output();
    document.querySelector(this.taskForm).reset();
  }

  output() {
    // this.storageE()
    document.querySelector(this.taskList).innerHTML = '';
    const storage = this.storage.getItemFromStorage(this.todolist);

    if (storage) {
      storage.map(({ id, name, info, check }) => {
        const div = document.createElement('div');
        const infoTask = info;
        const idNumber = id === null ? 1 : id;
        const checked = check === true ? this.checked : '';
        const taskList = document.querySelector(this.taskList);
        const taskDescription = info
          ? `<div class="todo-description" title="show ${this.more}">
              ${infoTask}
            </div>`
          : '';
        div.setAttribute(this.dataId, idNumber);
        div.setAttribute('class', `${this.item} ${checked}`);
        div.setAttribute('style', 'position: relative');

        const row = `
          <div class="todo-title">${name}</div>
          ${taskDescription}
          <span class="todo-remove" title="remove task"></span>
        `;
        div.innerHTML = row;

        return taskList.appendChild(div);
      });
    }
    this.handleEvent();
    this.counter.renderCounter();
  }

  handleEvent() {
    const todoItem = document.querySelectorAll(`.${this.item}`);

    todoItem.forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        const {
          currentTarget,
          target: { parentNode, className },
        } = e;
        const id = Number(parentNode.getAttribute(this.dataId));

        const store = this.storage.getItemFromStorage(this.todolist);

        switch (className) {
          case 'todo-title': {
            currentTarget.classList.toggle(this.checked);

            const getObject = store
              .filter(o => o.id === id)
              .map(obj => {
                const newCheck = obj.check !== true;
                return { ...obj, check: newCheck };
              });

            const object = store.map(
              obj => getObject.find(o => o.id === obj.id) || obj
            );

            this.storage.removeItemFromStorage(this.todolist);
            this.storage.setToStorage(this.todolist, object);

            this.output();
            break;
          }
          case 'todo-description': {
            currentTarget.classList.toggle(this.more);
            break;
          }
          case 'todo-remove': {
            const object = store.filter(o => o.id !== id);

            this.storage.removeItemFromStorage(this.todolist);
            this.storage.setToStorage(this.todolist, object);

            this.output();
            break;
          }
          default:
            break;
        }
      });
    });
  }
}

export default ToDoListController;
