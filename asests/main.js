


function LoadUser() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => {
            document.getElementById("table").style.opacity = "1";
            const tbody = document.getElementById("tbody");
            tbody.innerHTML = " ";

            data.forEach(user => {

                tbody.innerHTML += ` <tr> 
                <td>${user.name}</td>
                <td>${user.address.city}, ${user.address.street}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                </tr>`;

                console.log(user);

            });
        });
}