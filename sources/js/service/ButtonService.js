class ButtonsService {
  constructor({ insertId, insertClassMode, insertClassType, typeText, typeHtml, rowClass, taskDescription }) {
    this.insertId = insertId;
    this.insertClassMode = insertClassMode;
    this.insertClassType = insertClassType;
    this.typeText = typeText;
    this.typeHtml = typeHtml;
    this.rowClass = rowClass;
    this.taskDescription = taskDescription;
  }

  buttonCreate() {
    const typeInsert = document.createElement('input');
    typeInsert.setAttribute('id', this.insertId);
    typeInsert.setAttribute('type', 'button');
    typeInsert.setAttribute('class', `${this.insertClassMode} ${this.insertClassType}`);
    typeInsert.value = this.typeText;

    const row = document.createElement('div');
    row.setAttribute('class', `${this.rowClass}`);
    row.append(typeInsert);

    const task = document.querySelector(this.taskDescription);
    task.parentNode.insertBefore(row, task.nextSibling);

    this.buttonType();
  }

  buttonType() {
    const buttonType = document.querySelector(`.${this.insertClassType}`);

    buttonType.addEventListener('click', () => {
      const buttonvalue = buttonType.getAttribute('value');
      const test = buttonvalue === this.typeText ? this.typeHtml : this.typeText;
      buttonType.setAttribute('value', test);
    });
  }

}

export default ButtonsService;