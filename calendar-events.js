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

    fetch(`https://2fd2-31-128-77-84.ngrok-free.app/tasks`, {
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