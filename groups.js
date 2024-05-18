const createGroupForm = document.getElementById("create-group-form");
const availableGroups = document.getElementById("available-groups");


createGroupForm.addEventListener("submit",function (ev) {
    ev.preventDefault();

    let nameGroup = document.getElementById("group-name-create").value;
    let linkToNewGroupEl = document.createElement("div");

    let userData = JSON.parse(localStorage.getItem("userData"));

    const groupData = {
        name: nameGroup,
        ownerUsername: userData.username
    }
    console.log(groupData);

    fetch(`https://2fd2-31-128-77-84.ngrok-free.app/groups`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupData)
    }).then(r => r.json())
        .then(group => {
            linkToNewGroupEl.innerHTML =
                `<div class="text-container group-link">
            <div>
            <a>${group.name}</a>
            </div>
            <div>
            →
            </div>
        </div>`;
            linkToNewGroupEl.addEventListener("click", function () {
                window.location.href = `calendar?name=${group.name}&id=${group.id}`;

            });
            linkToNewGroupEl.addEventListener("click", function () {

                const urlParams = new URLSearchParams(window.location.search);
                const nameGroup = urlParams.get('name');


                console.log(nameGroup);
            });
            availableGroups.prepend(linkToNewGroupEl);
        })
});