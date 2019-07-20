const formTemplate = 
  `<form id="taskForm">
    <div class="row">
      <h1>To Do List <span class="leftTask"></span></h1>
      <label for="taskName">Task:</label>
      <input id="taskName" class="u-full-width" name="taskName" type="text" placeholder="required field" required>
    </div>
    <label for="taskDescription">Message</label>
    <div class="u-full-width taskDescription" placeholder="Task description" id="taskDescription" contenteditable="true"></div>
    <input class="button-primary" id="save" type="submit" value="SAVE TASK">
    </form>
    <div id="taskList"></div>`;

  export default formTemplate;