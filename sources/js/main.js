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

    renerToDoList() {

        let keyLocalStorage = this.localStorageLengthSort('sort');

        for (let key in keyLocalStorage) {
            let keyId = keyLocalStorage[key];
            let value = localStorage[keyId];
            let itemsLocal = JSON.parse(value);

            let taskName = itemsLocal[0];
            let taskDescription = (itemsLocal[1]) ? `<p class="todo-description" title="show more">${itemsLocal[1]}</p>` : '';
            let taskCheck = (itemsLocal[2] === 'checked') ? 'class="checked"' : '';

            let htmlTemplate = `
                <div data-id="${keyId}" style="position: relative;" ${taskCheck}>
                    <p class="todo-title">${taskName}</p>
                    ${taskDescription}
                    <span class="todo-remove" title="remove task"></span>
                </div>
            `;
            document.getElementById('taskList').innerHTML += htmlTemplate;
        }

        this.removeTask();
        this.doneCheckOrChecked();
        this.showMore();

    };

    removeTask() {
        let items = document.querySelectorAll('.todo-remove');

        for (let i = 0; i < items.length; i++) {
            items[i].addEventListener('click', function () {
                let key = this.parentNode.getAttribute('data-id');
                localStorage.removeItem(key);
                document.querySelector(`[data-id="${key}"]`).remove();
            });
        }
    };

    showMore() {
        let getShowMore = document.querySelectorAll('.todo-description');
        for (let i = 0; i < getShowMore.length; i++) {
            getShowMore[i].addEventListener('click', function () {
                this.classList.toggle('more');
            });
        };
    }

    doneCheckOrChecked() {

        let checkDone = document.querySelectorAll('.todo-title');

        for (let i = 0; i < checkDone.length; i++) {

            checkDone[i].addEventListener('click', function () {

                this.parentNode.classList.toggle('checked');
                let key = this.parentNode.getAttribute('data-id');

                let data = localStorage.getItem(key);
                let itemsLocal = JSON.parse(data);

                (itemsLocal.pop() === 'unchecked') ? itemsLocal.push('checked'): itemsLocal.push('unchecked');

                localStorage.setItem(key, JSON.stringify(itemsLocal));

            })
        }

    }

    submitForm() {

        document.querySelector('form').addEventListener('submit', e => {
            e.preventDefault();

            let numberItems = this.localStorageLengthSort();

            let taskID = numberItems === 0 ? 1 : numberItems + 1;

            let taskName = document.getElementById('taskName').value;
            let taskNameTrim = taskName.replace(/(^\s+|\s+$)/g, '');
            document.getElementById('taskName').value = taskNameTrim;
            let taskDescription = document.getElementById('taskDescription').value;

            if (taskNameTrim) {
                let personItem = [taskName, taskDescription, 'unchecked'];

                localStorage.setItem(taskID, JSON.stringify(personItem));

                document.getElementById(this.formName).reset();
                location.reload();

            } else {

                document.getElementById(this.formName).classList.add('novalid');
            }

        });
    };
};

new PersonForm('taskForm').init();