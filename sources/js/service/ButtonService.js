class ButtonsService {
  constructor({
    insertId,
    buttonToolbar,
    typeText,
    typeHtml,
    rowClass,
    taskDescription,
    buttons,
  }) {
    this.insertId = insertId;
    this.buttonToolbar = buttonToolbar;
    this.typeText = typeText;
    this.typeHtml = typeHtml;
    this.rowClass = rowClass;
    this.taskDescription = taskDescription;
    this.buttons = buttons;
  }

  buttonCreate() {
    const row = document.createElement('div');
    row.setAttribute('class', `${this.rowClass}`);

    this.buttons.forEach(button => {
      const typeInsert = document.createElement('input');
      typeInsert.setAttribute('type', 'button');
      typeInsert.setAttribute(
        'class',
        `${this.buttonToolbar} button-${button.type}`
      );
      typeInsert.setAttribute('data-command', button.type);
      typeInsert.value = button.key;

      row.append(typeInsert);
    });

    const buttonItems = document.querySelector(this.taskDescription);
    buttonItems.parentNode.insertBefore(row, buttonItems.nextSibling);

    this.buttonEvent();
  }

  buttonEvent() {
    const buttons = document.querySelectorAll(`.${this.buttonToolbar}`);

    buttons.forEach(button => {
      button.addEventListener('click', e => {
        const { target } = e;

        const command = target.getAttribute('data-command');

        document.execCommand(command, false, null);

        const type =
          target.value === this.typeText ? this.typeHtml : this.typeText;

        document.querySelector('.button-text').value = type;
      });
    });
  }
}

export default ButtonsService;
