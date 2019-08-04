const buttons = {
  insertId: 'typeInsert',
  buttonToolbar: 'button-toolbar',
  typeText: 'text',
  typeHtml: 'html',
  rowClass: 'toolbar',
  taskDescription: '.taskDescription',
  buttons: [
    { type: 'text', key: 'text', tooltip: 'Inserted as text' },
    { type: 'bold', key: 'b', tooltip: 'Bold' },
    { type: 'italic', key: 'i', tooltip: 'Italic' },
    { type: 'insertUnorderedList', key: 'u', tooltip: 'Bullet list' },
    { type: 'insertOrderedList', key: 'o', tooltip: 'Numbered list' },
    // { type: 'createLink', key: 'a', tooltip: 'Create Link' },
    { type: 'removeFormat', key: 'clear', tooltip: 'Remove format' },
    // { type: 'storage', key: 'save locally', tooltip: 'Save locally' },
  ],
};

export default buttons;
