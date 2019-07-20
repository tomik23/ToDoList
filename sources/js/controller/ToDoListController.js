import formTemplate from "../view/FormView";

class ToDoListController {
  constructor(storage, counter, buttons) {
    this.todolist = 'todolist';
    this.taskList = '#taskList';
    this.item = 'item';
    this.checked = 'checked';
    this.taskForm = 'taskForm';
    this.dataId = 'data-id';
    this.more = 'more';
    this.light = 'light';

    this.storage = storage;
    this.counter = counter;
    
    const app = document.querySelector('.app-todo');
    app.innerHTML = formTemplate;
    buttons.buttonCreate();
  }

  initTodoList() {
    const save = document.getElementById('save');

    save.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      const id = this.getLastId();

      const name = document.querySelector('#taskName').value.trim();
      const description = document.querySelector('#taskDescription');

      const typeInsert = document.querySelector('#typeInsert').value;

      const insertType = typeInsert === 'text' ? description.innerText : description.innerHTML;

      if (name) {
        const list = {
          id, name, info: insertType, check: false,
        };
        description.innerHTML = '';
        this.createLocalStorage(list);
      }
    });
    this.output();
    this.switchLight();
  }

  getLastId() {
    const lengthStorage = this.storage.getItemFromStorage(this.todolist);
    const id = [];
    if (lengthStorage) {
      lengthStorage.forEach((item) => {
        id.push(item.id);
      });
    }

    const idNumber = id.length === 0 ? 1 : Math.max(...id) + 1;
    return idNumber;
  }

  createLocalStorage(list) {
    const store = this.storage.getItemFromStorage(this.todolist) ? this.storage.getItemFromStorage(this.todolist) : [];

    store.push(list);

    this.storage.removeItemFromStorage(this.todolist);
    this.storage.setToStorage(this.todolist, store);

    this.output();
    document.getElementById(this.taskForm).reset();
  }

  // storageE() {
  //   const store = JSON.parse(localStorage.getItem(this.todolist));
  //   return store;
  // }

  // saveToLocarstore(store) {
  //   localStorage.removeItem(this.todolist);
  //   localStorage.setItem(this.todolist, JSON.stringify(store));
  // }

  output() {
    // this.storageE()
    document.querySelector(this.taskList).innerHTML = '';
    const storage = this.storage.getItemFromStorage(this.todolist);

    if (storage) {
      storage.map(({
        id, name, info, check,
      }) => {
        const div = document.createElement('div');
        const infoTask = info;
        // const infoTask = info.replace(new RegExp('\r?\n', 'g'), '<br>');
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
          <div class="todo-title">${name}</div>${taskDescription}
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
    const todoItem = document.querySelectorAll('.item');

    todoItem.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const { currentTarget, target: { parentNode, className } } = e;
        const id = Number(parentNode.getAttribute(this.dataId));

        const store = this.storage.getItemFromStorage(this.todolist);

        switch (className) {
          case 'todo-title': {
            // console.log('todo-title:', className);
            currentTarget.classList.toggle(this.checked);

            const getObject = store.filter(o => o.id === id)
              .map((obj) => {
                const newCheck = obj.check !== true;
                return { ...obj, check: newCheck };
              });

            const object = store.map(obj => getObject.find(o => o.id === obj.id) || obj);

            this.storage.removeItemFromStorage(this.todolist);
            this.storage.setToStorage(this.todolist, object);

            this.output();
            break;
          }
          case 'todo-description': {
            // console.log('todo-description:', className);
            currentTarget.classList.toggle(this.more);
            break;
          }
          case 'todo-remove': {
            // console.log('todo-remove:', className);
            const object = store.filter(o => o.id !== id);
            // this.saveToLocarstore(newObj);

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

  createLightButton() {
    const switchColor = document.querySelector('.app-todo');
    const addLightOnOff = document.createElement('div');
    addLightOnOff.id = this.light;
    addLightOnOff.innerText = this.light;
    switchColor.appendChild(addLightOnOff);
  }

  switchLight() {
    this.createLightButton();
    const light = document.querySelector(`#${this.light}`);
    light.addEventListener('click', () => {
      const container = document.body.style.backgroundColor;
      if (container === 'whitesmoke') {
        document.body.style.backgroundColor = '#363636';
        document.body.classList.add('is-on');
        document.body.classList.remove('is-off');
      } else {
        document.body.style.backgroundColor = 'whitesmoke';
        document.body.classList.add('is-off');
        document.body.classList.remove('is-on');
      }
    });
  }
}

export default ToDoListController;