let calendarEl = document.getElementById('calendar');

let taskForm = document.getElementById("task-form");
let taskFormCreate = document.getElementById("task-form-create");
const taskModalCreate = document.getElementById('task-modal-create');
const taskModal = document.getElementById('task-modal');

const urlParams = new URLSearchParams(window.location.search);
const nameGroup = urlParams.get('name');
const idGroup = urlParams.get('id');


document.getElementById('group-name').textContent = nameGroup;

let calendar = new FullCalendar.Calendar(calendarEl, {

    initialView: 'dayGridMonth',
    themeSystem:'bootstrap5',
    selectable: true,

    headerToolbar: {
        left: 'prev today',
        center: 'title',
        right: 'next'
    },
    locale: 'uk',
    droppable: true,

    eventStartEditable: true,
    expandRows:true,
    showNonCurrentDates: false,
    fixedWeekCount:false,
    navLinks: true,
    nowIndicator: false,
    eventTextColor: 'white',

    select: function(info) {
        let startDateEl = document.getElementById('start-date-create');
        let endDateEl = document.getElementById('end-date-create');

        taskFormCreate.reset();

        let start = new Date(info.start);
        let end = new Date(info.end);

        start.setDate(start.getDate() + 1);
        end.setDate(end.getDate()+1);

        console.log(start);
        console.log(end);

        const startDateFormatted =
            start.toISOString().split("T")[0];

        const endDateFormatted =
            end.toISOString().split("T")[0];


        startDateEl.value = startDateFormatted;
        endDateEl.value = endDateFormatted;

        taskModalCreate.style.display = 'block';
    },
    eventClick: function (info){
        const event = info.event;
        console.log(event);
        taskForm.reset();

        taskModal.style.display = 'block';
        displayTaskInfo(event.title,event.extendedProps.description,event.start,event.end);
    }
});
fetch(`https://2b75-31-128-76-55.ngrok-free.app/tasks/group/${idGroup}`)
    .then(r=>r.json())
    .then(tasks=>{
        tasks.forEach(task=>{
            calendar.addEvent({
                title: task.title,
                start: task.dateOfStart,
                end: task.dateOfEnd,
                description: task.description,
                allDay: true,
                backgroundColor: 'green',
                textColor: 'white',
            });
        });
    });

calendar.render();
taskFormCreate.addEventListener("submit", function (e){
    e.preventDefault();
    create();
});
function create(){
    let taskDescription = document.getElementById("task-description-create").value;
    let taskTitle = document.getElementById("task-title-create").value;
    let startDate = document.getElementById('start-date-create');
    let endDate = document.getElementById('end-date-create');
    const taskDto = {
        title: taskTitle,
        description: taskDescription,
        dateOfStart:startDate.value,
        dateOfEnd:endDate.value,
        groupId:idGroup,
    }

    console.log(taskDto);

    fetch(`https://2b75-31-128-76-55.ngrok-free.app/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskDto)
    }).then(r=>r.json())
        .then(task=>{
            calendar.addEvent({
                title: task.title,
                start: task.dateOfStart,
                end: task.dateOfEnd,
                description: task.description,
                allDay: true,
                backgroundColor: 'green',
                textColor: 'white',
            });
            taskModalCreate.style.display = 'none';
        })

}
function displayTaskInfo(title,description,start,end){

    let titleEl = document.getElementById("task-title");
    let descriptionEl = document.getElementById("task-description");
    let startEl = document.getElementById("start-date");
    let endEl = document.getElementById("end-date");
    titleEl.textContent = title;
    descriptionEl.textContent =description;
    startEl.textContent = formatDateForTaskModal(start);
    endEl.textContent = formatDateForTaskModal(end);
}
document.querySelectorAll(".close").forEach(span=>{
    span.onclick = function() {
        taskModalCreate.style.display = 'none';
        taskModal.style.display = 'none';
    }
});

function formatDateForTaskModal(date) {
    const months = [
        "січня",
        "лютого",
        "березня",
        "квітня",
        "травня",
        "червня",
        "липня",
        "серпня",
        "вересня",
        "жовтня",
        "листопада",
        "грудня"
    ];

    const currentDate = new Date();
    const messageDate = new Date(date);

    const day = messageDate.getDate();
    const month = months[messageDate.getMonth()];
    const year = messageDate.getFullYear();

    if (currentDate.getFullYear() === year) {
        return `${day} ${month}`;
    } else {
        return `${day} ${month}, ${year}`;
    }
}
