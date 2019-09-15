class FormView {
  renderView(appContent) {
    const template = `
      <div class="header">
        <div class="header-date">
          <div class="header-day"></div>
          <div class="header-month"></div>
        </div>
        <div class="task-left"></div>
        <button class="show-form">+</button>
        <div class="form-group" data-show="hidden">
          <button class="close-form">close</button>
          <button type="submit" id="save" class="save-form">save task</button>
        </div>
      </div>
      <form class="task-form">
        <div class="row">
          <input id="taskName" class="full-width task-name" name="taskName" type="text" placeholder="required field" required>
        </div>
        <div class="full-width taskDescription" id="taskDescription" contenteditable="true"></div>
        <!-- <button type="submit" class="button-primary" id="save" value="SAVE TASK">SAVE TASK</button> -->
      </form>
      <div class="taskList"></div>
    `;
    document.querySelector(appContent).innerHTML = template;
  }
}

export default FormView;
