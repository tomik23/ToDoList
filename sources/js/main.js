const classes = {
  dataId: 'data-id',
  dataNotChecked: '[data-id]:not(.checked)',
  left: '.left',
  todoRemove: '.todo-remove',
  todoDescription: '.todo-description',
  todoTitle: '.todo-title',
  more: 'more',
  checked: 'checked',
  unchecked: 'unchecked',
  form: 'form',
  novalid: 'novalid',
  taskName: 'taskName',
  taskDescription: 'taskDescription',
  taskList: 'taskList',
  taskForm: 'taskForm'
}

class PersonForm {

  constructor(options) {
    this.formName = options;
  };

  init() {
    this.renerToDoList();
    this.submitForm();
  };

  localStorageLengthSort(type) {
    let array = [];
    for (let i = 0; i < localStorage.length; i++) {
      array.push(localStorage.key(i));
    }
    array = (type === 'sort') ? array.sort((a, b) => a - b) : (array.length > 0) ? Math.max(...array) : 0;
    return array;
  }

  countCheckItems() {
    let dataId = document.querySelectorAll(`[${classes.dataId}]`);
    let left = document.querySelector(classes.left);
    for (let i = 0; i < dataId.length; i++) {
      dataId[i].addEventListener('click', function () {
        let countChecked = document.querySelectorAll(classes.dataNotChecked).length;
        if (countChecked > 0) {
          left.style.visibility = 'visible';
          left.innerHTML = `${countChecked} item left`;
        } else {
          left.removeAttribute('style');
        }
      });
    }

    let countChecked = document.querySelectorAll(classes.dataNotChecked).length;
    if (countChecked > 0) {
      left.style.visibility = 'visible';
      left.innerHTML = `${countChecked} item left`;
    }
  }

  renerToDoList() {
    document.getElementById(classes.taskList).innerHTML = '';

    let keyLocalStorage = this.localStorageLengthSort('sort');

    for (let key in keyLocalStorage) {
      let keyId = keyLocalStorage[key];
      let value = localStorage[keyId];
      let itemsLocal = JSON.parse(value);
      let taskName = itemsLocal[0];
      let taskDescription = (itemsLocal[1]) ? `<p class="todo-description" title="show more">${itemsLocal[1]}</p>` : '';
      let taskCheck = (itemsLocal[2] === 'checked') ? 'checked' : '';

      let htmlTemplate = `
        <p class="todo-title">${taskName}</p>
        ${taskDescription}
        <span class="todo-remove" title="remove task"></span>
      `;

      this.appendItemsToList({ htmlTemplate, keyId, taskCheck });
    }

    this.removeTask();
    this.doneCheckOrChecked();
    this.showMore();
    this.countCheckItems();
  };

  appendItemsToList(options) {
    let div = document.createElement('div');
    let attribute = {
      'data-id': options.keyId,
      style: 'position: relative',
      class: options.taskCheck
    };

    for (let key of Object.keys(attribute)) {
      div.setAttribute(key, attribute[key]);
    }
    div.innerHTML = options.htmlTemplate;
    document.getElementById(classes.taskList).appendChild(div);
  }

  removeTask() {
    let items = document.querySelectorAll(classes.todoRemove);

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener('click', function () {
        let key = this.parentNode.getAttribute(classes.dataId);
        localStorage.removeItem(key);
        document.querySelector(`[data-id="${key}"]`).remove();
      });
    }
  };

  showMore() {
    let getShowMore = document.querySelectorAll(classes.todoDescription);
    for (let i = 0; i < getShowMore.length; i++) {
      getShowMore[i].addEventListener('click', function () {
        this.classList.toggle(classes.more);
      });
    };
  }

  doneCheckOrChecked() {
    let checkDone = document.querySelectorAll(classes.todoTitle);

    for (let i = 0; i < checkDone.length; i++) {
      checkDone[i].addEventListener('click', function () {
        this.parentNode.classList.toggle(classes.checked);
        let key = this.parentNode.getAttribute(classes.dataId);

        let data = localStorage.getItem(key);
        let itemsLocal = JSON.parse(data);

        (itemsLocal.pop() === 'unchecked') ? itemsLocal.push(classes.checked) : itemsLocal.push(classes.unchecked);

        localStorage.setItem(key, JSON.stringify(itemsLocal));
      });
    }
  }

  submitForm() {
    document.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();

      let numberItems = this.localStorageLengthSort();

      let taskID = numberItems === 0 ? 1 : numberItems + 1;

      let taskName = document.getElementById(classes.taskName).value;
      let taskNameTrim = taskName.replace(/(^\s+|\s+$)/g, '');
      document.getElementById(classes.taskName).value = taskNameTrim;
      let taskDescription = document.getElementById(classes.taskDescription).value;

      if (taskNameTrim) {
        document.getElementById(this.formName).classList.remove(classes.novalid);
        let personItem = [taskName, taskDescription, classes.unchecked];

        localStorage.setItem(taskID, JSON.stringify(personItem));

        document.getElementById(this.formName).reset();
        this.renerToDoList();
      } else {
        document.getElementById(this.formName).classList.add(classes.novalid);
      }
    });
  };
};

new PersonForm(classes.taskForm).init();