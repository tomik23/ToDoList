class FormView {
  renderView(appContent) {
    const template = `
      <form class="taskForm">
        <div class="row">
          <h1>To Do List <span class="leftTask"></span></h1>
          <label for="taskName">Task:</label>
          <input id="taskName" class="u-full-width" name="taskName" type="text" placeholder="required field" required>
        </div>
        <label for="taskDescription">Description</label>
        <div class="u-full-width taskDescription" id="taskDescription" contenteditable="true"></div>
        <button type="submit" class="button-primary" id="save" value="SAVE TASK">SAVE TASK</button>
      </form>
    
      <div class="taskList"></div>
    `;
    document.querySelector(appContent).innerHTML = template;
  }
}

export default FormView;
