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
    this.countButton = this.buttons.length;
  }

  buttonCreate() {
    const row = document.createElement('div');

    row.setAttribute('class', `${this.rowClass}`);

    this.buttons.forEach((button, index) => {
      const typeInsert = document.createElement('button');

      typeInsert.setAttribute('type', 'button');
      typeInsert.setAttribute(
        'class',
        `${this.buttonToolbar} button-${button.type}`
      );

      typeInsert.setAttribute('data-tooltip', button.tooltip);
      typeInsert.setAttribute('data-position', 'top center');
      typeInsert.setAttribute('data-inverted', '');
      typeInsert.setAttribute('data-command', button.type);
      typeInsert.textContent = button.key;
      typeInsert.value = button.key;

      typeInsert.dataset.show =
        index > 0 && index < this.countButton - 1 ? 'hidden' : 'show';

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
        let type;
        let textTooltip;

        const command = target.getAttribute('data-command');
        const buttonText = document.querySelector('.button-text');
        // https://stackoverflow.com/a/23891233/10424385
        // const linkURL = prompt('Enter a URL:', 'http://');
        // editorWindow.document.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + sText + '</a>');
        document.execCommand(command, false, null);

        // console.log(this.typeText);

        if (target.value === this.typeText || target.value === this.typeHtml) {
          if (target.value === this.typeText) {
            type = this.typeHtml;
            textTooltip = 'Inserted as html';
          } else {
            type = this.typeText;
            textTooltip = 'Inserted as text';
          }

          buttonText.value = type;
          buttonText.textContent = type;
          buttonText.dataset.tooltip = textTooltip;
        }
      });
    });

    this.showHide();
  }

  showHide() {
    const toolbarButtons = document.querySelectorAll('.button-toolbar');
    const buttonText = document.querySelector('.button-text');

    buttonText.addEventListener('click', () => {
      const buttonTextType = buttonText.value;
      toolbarButtons.forEach((bToolbar, index) => {
        const btoolbar = bToolbar;
        const count = index > 0 && index < toolbarButtons.length - 1;
        if (buttonTextType === 'html') {
          btoolbar.dataset.show = 'show';
        } else if (count) {
          btoolbar.dataset.show = 'hidden';
        }
      });
    });
  }
}

export default ButtonsService;
