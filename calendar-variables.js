let calendarEl = document.getElementById('calendar');

let taskForm = document.getElementById("task-form");
let taskFormCreate = document.getElementById("task-form-create");
const taskModalCreate = document.getElementById('task-modal-create');
const taskModal = document.getElementById('task-modal');

const urlParams = new URLSearchParams(window.location.search);
const nameGroup = urlParams.get('name');
const idGroup = urlParams.get('id');


document.getElementById('group-name').textContent = nameGroup;