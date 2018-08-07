class PersonForm {

    constructor(options) {
        this.formName = options;
    };

    init() {
        this.renerToDoList();
        this.submitForm();
    };


    getKeyLength() {
        let arr = [];
        for (let i = 0; i < localStorage.length; i++) {
            arr.push(parseInt(localStorage.key(i)));
        }
        return arr;
    };

    renerToDoList() {

        for (let i = 0; i < localStorage.length; i++) {
            let keyId = localStorage.key(i);
            let value = localStorage[keyId];
            let jsonParse = JSON.parse(value);
            let unchecked = jsonParse.includes('checked') ? 'class="checked"' : '';

            let taskName = jsonParse.splice(0, 1);
            let taskDescription = jsonParse.splice(0, 1);

            let description = taskDescription.map(w => w.length) > 0 ? `<p class="todo-description" title="show more">${taskDescription}</p>` : '';

            let html = `
                <div data-id="${keyId}" style="position: relative;" ${unchecked}>
                    <p class="todo-title">${taskName}</p>
                    ${description}
                    <span class="todo-remove" title="remove task"></span>
                </div>
            `;
            document.getElementById('taskList').innerHTML += html;
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

                let key = this.parentNode.getAttribute('data-id');
                this.parentNode.classList.toggle('checked');

                let val = localStorage.getItem(key)
                let keyId = localStorage.key(i);
                let value = localStorage[keyId];
                let jsonParse = JSON.parse(value);

                let unchecked = jsonParse.includes('unchecked');

                let splice = (JSON.parse(val).splice(0, 2));
                let check = ['checked'];
                let uncheck = ['unchecked'];

                if (unchecked) {
                    localStorage.setItem(key, JSON.stringify([...splice, ...check]));
                } else {
                    localStorage.setItem(key, JSON.stringify([...splice, ...uncheck]));
                }
            })
        }

    }

    submitForm() {

        document.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();

            let numberItems = this.getKeyLength();
            let numberKey = Math.max(...numberItems);

            let taskID = numberItems.length === 0 ? 1 : numberKey + 1;

            let personForm = {
                'taskName': document.getElementById('taskName').value,
                'taskDescription': document.getElementById('taskDescription').value
            };

            if (document.querySelector('.error') !== null) {
                document.querySelector('.error').remove();
            }

            if (personForm.taskName !== "") {
                let personItem = [personForm.taskName, personForm.taskDescription, 'unchecked'];

                localStorage.setItem(taskID, JSON.stringify(personItem));

                document.getElementById(this.formName).reset();
                location.reload();

            } else {

                let formPerson = document.getElementById(this.formName);
                formPerson.classList.add('novalid');
            }

        });

    };


};

new PersonForm('taskForm').init();