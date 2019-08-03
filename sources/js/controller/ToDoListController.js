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
    this.date = new Date();

    this.storage = storage;
    this.counter = counter;
    this.buttons = buttons;
    this.light = light;

    const formView = new FormView();
    formView.renderView('.app-todo');
  }

  initTodoList() {
    const saveTask = document.getElementById('save');

    saveTask.addEventListener('click', e => {
      e.preventDefault();

      const id = this.getLastId();

      const nameTask = document.querySelector(this.taskName);
      const description = document.querySelector(this.taskDescription);

      const typeInsert = document.querySelector(this.buttonText).value;

      const insertType =
        typeInsert === 'text' ? description.textContent : description.innerHTML;

      if (nameTask.value.trim()) {
        const list = {
          id,
          name: nameTask.value.trim(),
          info: insertType,
          check: false,
        };
        description.innerHTML = '';
        this.createLocalStorage(list);
      } else {
        this.requireInput(nameTask);
      }
    });

    this.output();
    this.light.switchLight();
    this.buttons.buttonCreate();

    // this.saveStorageToFile();
  }

  requireInput(nameTask) {
    nameTask.setAttribute(
      'style',
      'border: 1px solid red; box-shadow: 0 0 15px 2px rgba(255,0,0,0.2);'
    );

    nameTask.addEventListener('input', () => {
      nameTask.removeAttribute('style');
    });
  }

  saveStorageToFile() {
    const storageSave = document.querySelector('.button-storage');

    storageSave.addEventListener('click', () => this.saveStorageToFile());

    const digits = Math.floor(Math.random() * 9000000000) + 1000000000;
    const lengthStorage = this.storage.getItemFromStorage(this.todolist);
    const a = document.createElement('a');
    a.setAttribute(
      'href',
      `data:text/plain;charset=utf-u,${encodeURIComponent(
        JSON.stringify(lengthStorage)
      )}`
    );
    a.setAttribute(
      'download',
      `${this.date.toLocaleDateString()}-${digits}.txt`
    );
    a.click();
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
