document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#my-account').addEventListener('click', () => {
        history.pushState({view: 'profile'}, "", "");
        loadProfile()
    });
    document.querySelector('#marks').addEventListener('click', () => {
        history.pushState({view: 'marks'}, "", "");
        loadMarks()
    });
    document.querySelector('#attendance').addEventListener('click', () => {
        history.pushState({view: 'attendance'}, "", "");
        loadAttendance()
    });

    document.addEventListener('click', (event) => {

        if (event.target.matches('#update-contact')) {

            loadUpdateContact();

        } else if (event.target.matches('#close-form')) {

            document.getElementById('form-overlay').style.display = 'none';
            document.getElementById('form-dialog').style.display = 'none';

        }  else if (event.target.matches('#save-form')) {

            const email = document.querySelector('#update-email').value;
            const phoneNo = document.querySelector('#update-phone-no').value;
            document.getElementById('update-form-err').style.display = 'none';
            updateContactDetails(email, phoneNo);

        } else if (event.target.matches('#change-password')) {

            loadChangePassword();

        } else if (event.target.matches('#close-change-password')) {

            document.getElementById('form-overlay').style.display = 'none';
            document.getElementById('change-password-dialog').style.display = 'none';

        } else if (event.target.matches('#save-change-password')) {

            document.getElementById('change-password-err').style.display = 'none';
            updatePassword();

        } else if (event.target.matches('#form-overlay')) {

            document.getElementById('form-overlay').style.display = 'none';
            document.getElementById('change-password-dialog').style.display = 'none';
            document.getElementById('form-dialog').style.display = 'none';

        }  

    })


    
    document.querySelector('#update-phone-no').oninput = validateUpdate;
    document.querySelector('#update-email').oninput = validateUpdate;

    document.getElementById('old-password').oninput = validateChangePassword;
    document.getElementById('new-password').oninput = validateChangePassword;
    document.getElementById('confirm-password').oninput = validateChangePassword;
    document.getElementById('show-password').oninput = toggleViewPassword;


    history.pushState({view: 'profile'}, "", "");
    loadProfile();
});

function loadProfile() {
    document.querySelector('#my-profile-view').style.display = 'block';
    document.querySelector('#marks-view').style.display = 'none';
    document.querySelector('#attendance-view').style.display = 'none';

    fetch(`/api/student/id/${studentId}`)
    .then(response => response.json())
    .then(data => {
        const profile = document.querySelector('#my-profile-view');
        profile.innerHTML = `
            <div class="heading">Student Details</div>
            <div><strong>Name: </strong> ${data.first_name} ${data.last_name}<button class="btn btn-primary" style="float: right;" id="update-contact">Update Contact Details</button></div>
            <div><strong>Date of Birth: </strong> ${new Date(data.dob).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
            <div id="email"><strong>Email: </strong> ${data.email}</div>
            <div id="phone-no"><strong>Phone no: </strong> ${data.phone_no}</div>
            <div><strong>Year of admission: </strong> ${data.year_of_admission}</div>
            <div><strong>Mentor: </strong> ${data.mentor.first_name} ${data.mentor.last_name}</div>
        `;
    })
    .catch(err => console.log(err));
}

function loadMarks() {
    document.querySelector('#my-profile-view').style.display = 'none';
    document.querySelector('#marks-view').style.display = 'block';
    document.querySelector('#attendance-view').style.display = 'none';

    document.querySelector('#marks-view').innerHTML = '<div class="heading">Marks</div>';

    fetch(`/api/mark/id/${studentId}`)
    .then(response => response.json())
    .then(data => {
        const table = document.createElement('table');
        table.className = "table table-dark";
        table.innerHTML = `
        <thead>
            <tr>
                <th>Subject</th>
                <th>Semester</th>
                <th>Exam number</th>
                <th>Mark</th>
            </tr>
        </thead>
        <tbody id="marks-tbody">
        </tbody>
        `;
        document.querySelector('#marks-view').append(table);

        document.querySelector('#marks-tbody').innerHTML = data.map(d => `
            <tr>
                <td>${d.exam.subject.name}</td>
                <td>${d.exam.semester}</td>
                <td>${d.exam.number}</td>
                <td>${d.mark}</td>
            </tr>
        `).join('');
    })
    .catch(err => console.log(err));
}

function loadAttendance() {
    document.querySelector('#my-profile-view').style.display = 'none';
    document.querySelector('#marks-view').style.display = 'none';
    document.querySelector('#attendance-view').style.display = 'block';

    document.querySelector('#attendance-view').innerHTML = '<div class="heading">Attendance</div>';

    fetch(`/api/attendance/id/${studentId}`)
    .then(response => response.json())
    .then(data => {
        const table = document.createElement('table');
        table.className = "table table-dark";
        table.innerHTML = `
        <thead>
            <tr>
                <th>Semester</th>
                <th>Attendance</th>
            </tr>
        </thead>
        <tbody id="attendance-tbody">
        </tbody>
        `;
        document.querySelector('#attendance-view').append(table);

        document.querySelector('#attendance-tbody').innerHTML = data.map(d => `
            <tr>
                <td>${d.semester}</td>
                <td>${d.percentage} %</td>
            </tr>
        `).join('');
    })
    .catch(err => console.log(err));
}

function loadUpdateContact() {
    document.getElementById('form-overlay').style.display = 'block';
    document.getElementById('form-dialog').style.display = 'block';
    document.getElementById('update-form-err').style.display = 'none';

    fetch(`/api/student/id/${studentId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('update-phone-no').value = data.phone_no;
        document.getElementById('update-email').value = data.email;
    })
    .catch(err => console.log(err));
    
}

function validateUpdate() {
    const fields = [
        {
            id: "update-phone-no",
            error: "Enter a valid phone number",
            regex: /^\d{10}$/,
        },
        {
            id: "update-email",
            error: "Enter a valid email",
            regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        }
    ];
    let isValid = true;
    for (const field of fields) {
        const inputField = document.getElementById(field.id);
        if (!field.regex.test(inputField.value)) {
            isValid = false;
            document.querySelector("#save-form").disabled = true;
            document.querySelector("#save-form").title = field.error;
            document.querySelector("#save-form").style.cursor = "not-allowed";
            break;
        }
    }
    if (isValid) {
        document.querySelector("#save-form").disabled = false;
        document.querySelector("#save-form").title = "Update";
        document.querySelector("#save-form").style.cursor = "pointer";
    }
}

function updateContactDetails(email, phoneNo) {
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneNoRegex = /^\d{10}$/;

    if (!phoneNoRegex.test(phoneNo)) {

        document.getElementById('update-form-err').innerHTML = "Invalid Phone Number";
        document.getElementById('update-form-err').style.display = 'block';
        return

    }

    if (!emailRegex.test(email)) {

        document.getElementById('update-form-err').innerHTML = "Invalid Email";
        document.getElementById('update-form-err').style.display = 'block';
        return

    }

    fetch(`api/student/id/${studentId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            email: email,
            phone_no: phoneNo,
        })
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('#email').innerHTML = `<strong>Email: </strong> ${data.email}`;
        document.querySelector('#phone-no').innerHTML = `<strong>Phone no: </strong> ${data.phone_no}`;
    })
    .then(() => {
        document.getElementById('form-overlay').style.display = 'none';
        document.getElementById('form-dialog').style.display = 'none';
    })
    .catch(err => console.log(err));
}

function loadChangePassword() {

    document.getElementById('form-overlay').style.display = 'block';
    document.getElementById('change-password-dialog').style.display = 'block';
    document.getElementById('change-password-err').style.display = 'none';

    document.getElementById('old-password').value = '';
    document.getElementById('new-password').value = '';
    document.getElementById('confirm-password').value = '';

}

function validateChangePassword() {

    const oldPass = document.getElementById('old-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;
    let isValid = true;
    let message = "";

    if (oldPass == "" || oldPass === null) {

        isValid = false;
        message = "Enter Old Password";

    } else if (newPass == "" || newPass === null){

        isValid = false;
        message = "Enter New Password";

    } else if (confirmPass == "" || confirmPass === null) {

        isValid = false;
        message = "Confirm New Password";

    }

    const saveButton = document.querySelector("#save-change-password");
    saveButton.disabled = !isValid;
    saveButton.title = message || "Update";
    saveButton.style.cursor = isValid ? "pointer" : "not-allowed";

}

function toggleViewPassword() {

    const oldInp = document.getElementById('old-password');
    const newInp = document.getElementById('new-password');
    const confirmInp = document.getElementById('confirm-password');
    const check = document.getElementById('show-password');

    if (check.checked === false) {

        oldInp.type = 'password';
        newInp.type = 'password';
        confirmInp.type = 'password';

    } else {

        oldInp.type = 'text';
        newInp.type = 'text';
        confirmInp.type = 'text';

    }

}

function updatePassword() {

    const oldPass = document.getElementById('old-password').value;
    const newPass = document.getElementById('new-password').value;
    const confirmPass = document.getElementById('confirm-password').value;
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    const err = document.getElementById('change-password-err');
    
    if (oldPass == "" || oldPass === null) {

        err.style.display = 'block';
        err.innerHTML = "Enter Old Password";
        return

    } else if (newPass == "" || newPass === null){

        err.style.display = 'block';
        err.innerHTML = "Enter New Password";
        return

    } else if (confirmPass == "" || confirmPass === null) {

        err.style.display = 'block';
        err.innerHTML = "Confirm New Password";
        return

    } else if (newPass !== confirmPass) {

        err.style.display = 'block';
        err.innerHTML = "Passwords do not match";
        return

    } else if (newPass === oldPass) {

        err.style.display = 'block';
        err.innerHTML = "New password cannot be the same as old password";
        return

    }

    fetch(`api/password/student/${studentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            oldPass: oldPass,
            newPass: newPass,
        })
    })
    .then(response => {
        if (response.status === 204) {
            document.querySelector('#form-overlay').style.display = 'none';
            document.querySelector('#change-password-dialog').style.display = 'none';

        } else if (response.status === 406) {

            err.style.display = 'block';
            err.innerHTML = 'Old password is incorrect';

        }
    })
    .catch(err => console.log(err));

}

window.onpopstate = (event) => {
    if (event.state.view == 'profile') {
        loadProfile();
    } else if (event.state.view == 'marks') {
        loadMarks();
    } else if (event.state.view == 'attendance') {
        loadAttendance();
    }
};
