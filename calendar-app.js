document.addEventListener('DOMContentLoaded', function() {
    calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        selectable: true,
        locale: 'uk',
        droppable: true,
        eventStartEditable: true,
        eventTextColor: 'white',

        select: function(info) {
            taskFormCreate.reset();

            let start = new Date(info.start);
            let end = new Date(info.end);
            start.setDate(start.getDate() + 1);
            end.setDate(end.getDate() + 1);

            document.getElementById('start-date-create').value = start.toISOString().split("T")[0];
            document.getElementById('end-date-create').value = end.toISOString().split("T")[0];

            taskModalCreate.style.display = 'block';
        },
        eventClick: function(info) {
            const event = info.event;
            taskForm.reset();
            taskModal.style.display = 'block';
            displayTaskInfo(event.title, event.extendedProps.description, event.start, event.end);
        }
    });

    fetch(`https://11e3-176-241-157-85.ngrok-free.app/tasks/group/${idGroup}`, {
        method: "GET",
        headers: new Headers({
            "ngrok-skip-browser-warning": "69420",
        })
    })
        .then(response => response.json())
        .then(tasks => {
            const events = tasks.map(task => ({
                title: task.title,
                start: task.dateOfStart,
                end: task.dateOfEnd,
                description: task.description,
                allDay: true,
                backgroundColor: 'green',
                textColor: 'white',
            }));
            calendar.addEventSource(events);
        });

    calendar.render();
});


