document.addEventListener("DOMContentLoaded", function() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const sideNav = document.querySelector('.sidenav');

    toggleBtns.forEach(button=> {
        button.addEventListener('click', function() {
            sideNav.style.width = sideNav.style.width === '100%' ? '0' : '100%'; // Toggle side nav width
        });
    });
});