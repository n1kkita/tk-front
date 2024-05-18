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