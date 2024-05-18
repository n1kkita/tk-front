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
fetch(`https://2fd2-31-128-77-84.ngrok-free.app/tasks/group/${idGroup}`,{method: "GET",
    headers: new Headers({
        "ngrok-skip-browser-warning": "69420",
    })})
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

