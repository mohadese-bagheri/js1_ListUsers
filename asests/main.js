

// نمایش لیست کاربرها
async function LoadUser() {
    try{
        const res= await fetch('https://jsonplaceholder.typicode.com/users');
        if (!res.ok) throw new error(`خطا در واکشی کاربران : ${res.status}`);
        
        const data = await res.json();
        


            document.getElementById("table").style.opacity = "1";
            tbody.innerHTML = " ";

            data.forEach(user => {

                tbody.innerHTML += ` <tr id="user-${user.id}"> 
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.address.city}, ${user.address.street}</td>
                <td>${user.phone}</td>
                <td>${user.email}</td>
                <td><button onclick="deletUser(${user.id})"  >حذف</button>
                <button onclick="EditUser(${user.id}, '${user.name}', '${user.email}')" > ویرایش </button></td>
                </tr>`;

            });
    } catch (error){                 پ
        alert("خطا در بارگزاری کاربران:" + error.message  );
    }
}


// اصافه کردن کاربر
function AddUser() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({ name: name, email: email }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((res) => res.json())
        .then(user => {
            alert(`کاربر ذخیره شد اما نشان نمیدهد چون apiتستی است.`);
            console.log("postrespone:", user);

            tbody.innerHTML += ` <tr > 
                <td> </td>
                <td>${user.name}</td>
                <td> </td>
                <td>${user.email}</td>
                <td>  </td>
                <td><button>حذف</button></td>
                </tr>`;

        });
}


// حذف کردن کاربر
function deletUser(id) {
    fetch('https://jsonplaceholder.typicode.com/users/${id}', {
        method: `DELETE`
    }
    )
        .then(() => {
            alert(`این کاربر با آی دی ${id}حذف شد`);
            LoadUser();
            //  بازخوانی لیست
        }

        );

}

// ویرایش کاربر
function EditUser(id, oldname, oldemail) {

    const newName = prompt("نام جدید را وارد کنید: , oldname");
    const newemail = prompt("ایمیل جدید را وارد کنید: , oldemail");

    if (!newName || !newemail) {
        alert("ورودی نامعتبر است ");
        return;
    }

    fetch('https://jsonplaceholder.typicode.com/users/${id}', {
        method: 'PATCH',
        body: JSON.stringify({ name: newName, email: newemail }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    })
        .then(rep => rep.json())
        .then(updated => {
            console.log(updated);
            alert(" ویرایش انجام شد ");

            // نمایش تغییرات بصورت الکی

            const row = document.getElementById(`user-${id}`);
            row.children[1].textContent = updated.name;
            row.children[4].textContent = updated.email;

        });








}