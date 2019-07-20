class CounterService {
  constructor(options) {
    this.options = options;
  }

  renderCounter() {
    const { checked, item, leftTask, taskLeftText } = this.options;
    const countChecked = document.querySelectorAll(checked).length;
    const taskItem = document.querySelectorAll(item).length;
    const taskLeft = document.querySelector(leftTask);

    let textLeft;
    if (taskItem === 0 && countChecked === 0) {
      textLeft = '';
    } else if (countChecked === 0) {
      textLeft = `${taskItem} ${taskLeftText}`;
    } else {
      textLeft = `${taskItem - countChecked} ${taskLeftText}`;
    }

    taskLeft.innerText = textLeft;
  }
}

export default CounterService;
