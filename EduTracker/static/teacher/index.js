document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#my-account').addEventListener('click', () => {
        history.pushState({view: 'profile'}, "", "");
        loadProfile();
    });
    document.querySelector('#mentee').addEventListener('click', () => {
        history.pushState({view: 'mentee'}, "", '');
        loadMentee();
    })
    document.querySelector('#subject').addEventListener('click', () => {
        history.pushState({view: 'subject'}, "", '');
        loadSubject();
    })

    // Profile view
    document.addEventListener('click', (event) => {
        if (event.target.matches('#update-contact')) {

            loadUpdateContact();

        } else if (event.target.matches('#close-form')) {

            document.getElementById('form-overlay').style.display = 'none';
            document.getElementById('form-dialog').style.display = 'none';

        } else if (event.target.matches('#save-form')) {

            document.getElementById('update-form-err').style.display = 'none';
            updateContactDetails();

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
    });

    // Mentee view
    document.addEventListener('click', (event) => {
        if (event.target.matches('#mentee-mark')) {

            const studentId = event.target.dataset.studentid;
            loadMenteeMark(studentId);

        } else if (event.target.matches('#close-mentee-mark')) {

            document.getElementById('mentee-overlay').style.display = 'none';
            document.getElementById('mentee-mark-dialog').style.display = 'none';

        } else if(event.target.matches('#mentee-edit')) {

            const studentId = event.target.dataset.studentid;
            loadMenteeEdit(studentId);

        } else if (event.target.matches('#close-mentee-edit')) {

            document.getElementById('mentee-overlay').style.display = 'none';
            document.getElementById('mentee-edit-dialog').style.display = 'none';

        } else if(event.target.matches('#save-mentee-edit')) {

            document.getElementById('mentee-edit-err').style.display = 'none';
            updateMenteeEdit();

        } else if(event.target.matches('#mentee-attendance')) {

            const studentId = event.target.dataset.studentid;
            const name = event.target.dataset.name;
            loadMenteeAttendance(studentId, name);

        } else if (event.target.matches('#close-mentee-attendance')) {

            document.getElementById('mentee-overlay').style.display = 'none';
            document.getElementById('mentee-attendance-dialog').style.display = 'none';

        } else if(event.target.matches('#save-mentee-attendance')) {

            document.getElementById('mentee-attendance-err')
            updateMenteeAttendance();

        } else if(event.target.matches('#mentee-create')) {

            loadMenteeCreate();

        } else if(event.target.matches('#close-mentee-create')) {

            document.getElementById('mentee-overlay').style.display = 'none';
            document.getElementById('mentee-create-dialog').style.display = 'none';

        } else if (event.target.matches('#save-mentee-create')) {

            document.getElementById('mentee-create-err').style.display = 'none';
            menteeCreate();            

        } else if(event.target.matches('#mentee-delete')) {

            document.getElementById('mentee-overlay').style.display = 'block';
            document.getElementById('mentee-delete-dialog').style.display = 'block';
            document.getElementById('mentee-delete-yes').dataset.studentid = event.target.dataset.studentid;

        } else if(event.target.matches('#close-mentee-delete')) {

            document.getElementById('mentee-overlay').style.display = 'none';
            document.getElementById('mentee-delete-dialog').style.display = 'none';

        } else if(event.target.matches('#mentee-delete-no')) {

            document.getElementById('mentee-overlay').style.display = 'none';
            document.getElementById('mentee-delete-dialog').style.display = 'none';

        } else if(event.target.matches('#mentee-delete-yes')) {

            const studentId = event.target.dataset.studentid;
            deleteMentee(studentId);

        } else if (event.target.matches('#mentee-overlay')) {

            document.getElementById('mentee-overlay').style.display = 'none';
            document.getElementById('mentee-mark-dialog').style.display = 'none';
            document.getElementById('mentee-edit-dialog').style.display = 'none';
            document.getElementById('mentee-create-dialog').style.display = 'none';
            document.getElementById('mentee-attendance-dialog').style.display = 'none';

        }
    });

    // Subject view
    document.addEventListener('click', (event) => {
        if(event.target.matches('#subject-marks-btn')) {

            loadSubjectMarks();

        } else if (event.target.matches('#subject-mark-create')) {
            
            loadSubjectMarksCreate();

        } else if (event.target.matches('#close-mark-create')) {

            document.getElementById('subject-overlay').style.display = 'none';
            document.getElementById('mark-create-dialog').style.display = 'none';

        } else if (event.target.matches('#save-mark-create')) {

            document.querySelector('#subject-mark-create-err').style.display = 'none';
            createSubjectMark();

        } else if(event.target.matches('#subject-mark-edit')) {

            const markId = event.target.dataset.markid;
            const name = event.target.dataset.name;
            const mark = event.target.dataset.mark;
            loadSubjectMarkEdit(markId, name, mark);

        } else if(event.target.matches('#close-mark-edit')) {

            document.querySelector('#subject-overlay').style.display = 'none';
            document.querySelector('#mark-edit-dialog').style.display = 'none';

        } else if (event.target.matches('#save-mark-edit')) {

            document.getElementById('subject-mark-edit-err').style.display = 'none';
            updateSubjectMarkEdit();

        } else if(event.target.matches('#subject-mark-delete')) {

            document.getElementById('subject-overlay').style.display = 'block';
            document.getElementById('mark-delete-dialog').style.display = 'block';
            document.getElementById('mark-delete-yes').dataset.markid = event.target.dataset.markid;

        } else if(event.target.matches('#close-mark-delete')) {

            document.getElementById('subject-overlay').style.display = 'none';
            document.getElementById('mark-delete-dialog').style.display = 'none';

        } else if(event.target.matches('#mark-delete-no')) {

            document.getElementById('subject-overlay').style.display = 'none';
            document.getElementById('mark-delete-dialog').style.display = 'none';

        } else if(event.target.matches('#mark-delete-yes')) {

            const markId = event.target.dataset.markid;
            deleteMark(markId);

        } else if (event.target.matches('#subject-overlay')) {

            document.getElementById('subject-overlay').style.display = 'none';
            document.getElementById('mark-create-dialog').style.display = 'none';
            document.getElementById('mark-edit-dialog').style.display = 'none';
            document.getElementById('mark-delete-dialog').style.display = 'none';

        }
    })

    // Profile view
    document.getElementById('update-phone-no').oninput = validateUpdate;
    document.getElementById('update-email').oninput = validateUpdate;

    document.getElementById('old-password').oninput = validateChangePassword;
    document.getElementById('new-password').oninput = validateChangePassword;
    document.getElementById('confirm-password').oninput = validateChangePassword;
    document.getElementById('show-password').oninput = toggleViewPassword;

    // Mentee view
    document.getElementById('mentee-edit-firstname').oninput = validateMenteeEdit;
    document.getElementById('mentee-edit-lastname').oninput = validateMenteeEdit;
    document.getElementById('mentee-edit-username').oninput = validateMenteeEdit;
    document.getElementById('mentee-edit-email').oninput = validateMenteeEdit;
    document.getElementById('mentee-edit-phone-no').oninput = validateMenteeEdit;
    document.getElementById('mentee-edit-dob').oninput = validateMenteeEdit;
    document.getElementById('mentee-edit-yoa').oninput = validateMenteeEdit;

    document.getElementById('mentee-attendance-semester').oninput = getAttendance;
    document.getElementById('mentee-attendance-attendance').oninput = validateMenteeAttendance;

    document.querySelector('#mentee-create-firstname').oninput = validateMenteeCreate;
    document.querySelector('#mentee-create-lastname').oninput = validateMenteeCreate;
    document.querySelector('#mentee-create-username').oninput = validateMenteeCreate;
    document.querySelector('#mentee-create-password').oninput = validateMenteeCreate;
    document.querySelector('#mentee-create-email').oninput = validateMenteeCreate;
    document.querySelector('#mentee-create-phone-no').oninput = validateMenteeCreate;
    document.querySelector('#mentee-create-dob').oninput = validateMenteeCreate;
    document.querySelector('#mentee-create-yoa').oninput = validateMenteeCreate;
    
    // Subject view
    document.querySelector('#subject-term').oninput = validateSubjectMarksFilter;
    document.querySelector('#subject-semester').oninput = validateSubjectMarksFilter;
    
    document.querySelector('#mark-create-semester').oninput = validateSubjectMarksCreate;
    document.querySelector('#mark-create-term').oninput = validateSubjectMarksCreate;
    document.querySelector('#mark-create-student').oninput = validateSubjectMarksCreate;
    document.querySelector('#mark-create-mark').oninput = validateSubjectMarksCreate;

    document.querySelector('#mark-edit-mark').oninput = validateSubjectMarksEdit;

    history.pushState({view: 'profile'}, "", "");
    loadProfile();
})

// My profile view
function loadProfile() {
    document.querySelector('#my-profile-view').style.display = 'block';
    document.querySelector('#mentee-view').style.display = 'none';
    document.querySelector('#subject-view').style.display = 'none';

    fetch(`/api/teacher/id/${teacherId}`)
    .then(response => response.json())
    .then(data => {
        const profile = document.querySelector('#my-profile-view');
        profile.innerHTML = `
            <div class="heading">Teacher Details</div>
            <div><strong>Name: </strong> ${data.first_name} ${data.last_name}<button class="btn btn-primary" style="float: right;" id="update-contact">Update Contact Details</button></div>
            <div><strong>Date of Birth: </strong> ${new Date(data.dob).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
            <div id="email"><strong>Email: </strong> ${data.email}</div>
            <div id="phone-no"><strong>Phone no: </strong> ${data.phone_no}</div>
            <div><strong>Subject: </strong> ${data.subject.name}</div>
        `;
    })
    .catch(err => console.log(err));
}

function loadUpdateContact() {
    document.getElementById('form-overlay').style.display = 'block';
    document.getElementById('form-dialog').style.display = 'block';
    document.getElementById('update-form-err').style.display = 'none';

    document.getElementById('update-form-err').style.display = 'none';

    fetch(`/api/teacher/id/${teacherId}`)
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

function updateContactDetails() {
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    const email = document.querySelector('#update-email').value;
    const phoneNo = document.querySelector('#update-phone-no').value;
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

    fetch(`api/teacher/id/${teacherId}`, {
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

    fetch(`api/password/teacher/${teacherId}`, {
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

// Mentee view
function loadMentee() {
    document.querySelector('#my-profile-view').style.display = 'none';
    document.querySelector('#mentee-view').style.display = 'block';
    document.querySelector('#subject-view').style.display = 'none';

    document.querySelector('#mentee-view').innerHTML = `
    <div class="heading">Mentee</div>
    <button class="btn btn-primary" style="margin-bottom: 10px;" id="mentee-create"><i class="fas fa-plus"></i> Add Mentee</button>
    `;

    fetch(`api/mentee/id/${teacherId}`)
    .then(response => response.json())
    .then(data => {
        const table = document.createElement('table');
        table.className = "table table-dark";
        table.innerHTML = `
        <tbody id="mentee-tbody">
        </tbody>
        `;
        document.querySelector('#mentee-view').append(table);

        if (Array.isArray(data)) {
            document.querySelector('#mentee-tbody').innerHTML = data.map(d => `
            <tr>
            <td>${d.first_name} ${d.last_name}</td>
            <td style="display:flex; flex-direction: row-reverse;">
                <div style="margin: 1px 5px;">
                    <i class="fas fa-trash-alt" id="mentee-delete" data-studentid="${d.id}" title="Delete Mentee"></i>
                </div>
                <div style="margin: 1px 5px;">
                    <i class="fas fa-edit" id="mentee-edit" data-studentid="${d.id}" title="Edit Mentee"></i>
                </div>
                <div style="margin: 1px 5px;">
                    <i class="far fa-calendar-check" id="mentee-attendance" data-name="${d.first_name} ${d.last_name}" data-studentid="${d.id}" title="Attendance"></i>
                </div>
                <div style="margin: 1px 5px;">
                    <i class="far fa-clipboard" id="mentee-mark" data-studentid="${d.id}" title="View Mark"></i>
                </div>
            </td>
        </tr>
            `).join('');
        } else {
            document.querySelector('#mentee-tbody').innerHTML = `
                <tr>
                    <td>${data.first_name} ${data.last_name}</td>
                    <td style="display:flex; flex-direction: row-reverse;">
                        <div style="margin: 1px 5px;">
                            <i class="fas fa-trash-alt" id="mentee-delete" data-studentId="${data.id}" title="Delete Mentee"></i>
                        </div>
                        <div style="margin: 1px 5px;">
                            <i class="fa fa-edit" id="mentee-edit" data-studentId="${data.id}" title="Edit Mentee"></i>
                        </div>
                        <div style="margin: 1px 5px;">
                            <i class="far fa-calendar-check" id="mentee-attendance" data-name="${data.first_name} ${data.last_name}" data-studentId="${data.id}" title="Attendance"></i>
                        </div>
                        <div style="margin: 1px 5px;">
                            <i class="far fa-clipboard" id="mentee-mark" data-studentId="${data.id}" title="View Mark"></i>
                        </div>
                    </td>
                </tr>
            `;
        }
    })
    .catch(err => console.log(err));

}

function loadMenteeAttendance(studentId, name) {

    document.getElementById('mentee-overlay').style.display = 'block';
    document.getElementById('mentee-attendance-dialog').style.display = 'block';
    document.getElementById('mentee-attendance-err').style.display = 'none';

    document.getElementById('mentee-attendance-attendance').value = '';
    document.getElementById('studentid-attendance').value = studentId;
    document.getElementById('mentee-attendance-name').value = name;
    document.getElementById('mentee-attendance-semester').selectedIndex = 0;

    getAttendance();

}

function getAttendance() {
    const sem = document.getElementById('mentee-attendance-semester').value;
    const studentId = document.getElementById('mentee-attendance-dialog').querySelector('#studentid-attendance').value;

    fetch(`api/attendance/id/${studentId}/sem/${sem}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('mentee-attendance-attendance').value = data.percentage;
        document.getElementById('save-mentee-attendance').title = 'No changes';
    })
} 

function validateMenteeAttendance() {

    const attendance = Number(document.getElementById('mentee-attendance-attendance').value);
    const sem = Number(document.getElementById('mentee-attendance-semester').value);
    let isValid = true;
    let message = "";

    if (sem < 1 || sem > 8) {
        isValid = false;
        message = "Invalid Semester";
    } else if (attendance == ""){
        isValid = false;
        message = "Enter Attendance";
    } else if (attendance < 0 || attendance > 100) {
        isValid = false;
        message = "Invalid Attendance";
    }

    const saveButton = document.querySelector("#save-mentee-attendance");
    saveButton.disabled = !isValid;
    saveButton.title = message || "Update";
    saveButton.style.cursor = isValid ? "pointer" : "not-allowed";

}

function updateMenteeAttendance() {

    const attendance = Number(document.getElementById('mentee-attendance-attendance').value);
    const sem = document.getElementById('mentee-attendance-semester').value;
    const studentId = document.getElementById('mentee-attendance-dialog').querySelector('#studentid-attendance').value;
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    const err = document.getElementById('mentee-attendance-err');

    if (sem < 1 || sem > 8) {
        err.style.display = 'block';
        err.innerHTML = "Invalid Semester";
        return
    } 
    if (attendance == ""){
        err.style.display = 'block';
        err.innerHTML = "Enter Attendance";
        return
    } 
    if (attendance < 0 || attendance > 100) {
        err.style.display = 'block';
        err.innerHTML = "Invalid Attendance";
        return
    }

    fetch(`api/attendance/id/${studentId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            sem: sem,
            attendance: attendance,
        })
    })
    .then(() => {
        document.getElementById('mentee-overlay').style.display = 'none';
        document.getElementById('mentee-attendance-dialog').style.display = 'none';
    })
    .then(() => {
        loadMentee();
    })
    .catch(err => console.log(err));
    
}

function loadMenteeCreate() {

    document.getElementById('mentee-overlay').style.display = 'block';
    document.getElementById('mentee-create-dialog').style.display = 'block';
    document.getElementById('mentee-create-err').style.display = 'none';

    document.getElementById('mentee-create-firstname').value = '';
    document.getElementById('mentee-create-lastname').value = '';
    document.getElementById('mentee-create-username').value = '';
    document.getElementById('mentee-create-password').value = '';
    document.getElementById('mentee-create-email').value = '';
    document.getElementById('mentee-create-phone-no').value = '';
    document.getElementById('mentee-create-dob').value = '';
    document.getElementById('mentee-create-yoa').value = '';

}

function validateMenteeCreate() {

    const fields = [
        {
            id: "mentee-create-firstname",
            error: "Enter first name",
            regex: /.+/,
        },
        {
            id: "mentee-create-lastname",
            error: "Enter last name",
            regex: /.+/,
        },
        {
            id: "mentee-create-username",
            error: "Enter username",
            regex: /.+/,
        },
        {
            id: "mentee-create-password",
            error: "Enter password",
            regex: /.+/,
        },
        {
            id: "mentee-create-email",
            error: "Enter a valid email",
            regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        },
        {
            id: "mentee-create-phone-no",
            error: "Enter a valid phone number",
            regex: /^\d{10}$/,
        },
        {
            id: "mentee-create-dob",
            error: "Enter date of birth",
            regex: /.+/,
        },
        {
            id: "mentee-create-yoa",
            error: "Enter year of admission",
            regex: /.+/,
        },
    ];
    let isValid = true;
    for (const field of fields) {
        const inputField = document.getElementById(field.id);
        if (!field.regex.test(inputField.value)) {
            isValid = false;
            document.querySelector("#save-mentee-create").disabled = true;
            document.querySelector("#save-mentee-create").title = field.error;
            document.querySelector("#save-mentee-create").style.cursor = "not-allowed";
            break;
        }
    }
    if (isValid) {
        document.querySelector("#save-mentee-create").disabled = false;
        document.querySelector("#save-mentee-create").title = "Update";
        document.querySelector("#save-mentee-create").style.cursor = "pointer";
    }
}

function menteeCreate() {
    const first = document.getElementById('mentee-create-firstname').value;
    const last = document.getElementById('mentee-create-lastname').value;
    const username = document.getElementById('mentee-create-username').value;
    const password = document.getElementById('mentee-create-password').value;
    const email = document.getElementById('mentee-create-email').value;
    const phoneNo = document.getElementById('mentee-create-phone-no').value;
    const dob = document.getElementById('mentee-create-dob').value;
    const yoa = document.getElementById('mentee-create-yoa').value;
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    const err = document.getElementById('mentee-create-err');
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneNoRegex = /^\d{10}$/;

    if (first === "" || first === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter First name';
        return
        
    }

    if (last === "" || last === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter Last name';
        return

    }

    if (username === "" || username === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter Username';
        return

    }

    if (password === "" || password === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter Password';
        return

    }

    if (!emailRegex.test(email)) {

        err.style.display = 'block';
        err.innerHTML = 'Enter Valid Email';
        return

    }

    if (!phoneNoRegex.test(phoneNo)) {

        err.style.display = 'block';
        err.innerHTML = 'Enter Valid Phone Number';
        return

    }

    if (dob === "" || dob === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter Date of Birth';
        return

    }

    if (yoa === "" || yoa === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter Year of Admission';
        return

    }

    fetch(`api/student`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            first_name: first,
            last_name: last,
            username: username,
            password: password,
            email: email,
            phone_no: phoneNo,
            dob: dob,
            year_of_admission: yoa,
            mentor: teacherId
        })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('mentee-overlay').style.display = 'none';
        document.getElementById('mentee-create-dialog').style.display = 'none';
    })
    .then(() => {
        loadMentee();
    })
    .catch(err => console.log(err));
}

function deleteMentee(studentId) {
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    
    fetch(`api/student/id/${studentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('mentee-overlay').style.display = 'none';
            document.getElementById('mentee-delete-dialog').style.display = 'none';
        } else {
            console.log('Error deleting student:', response.status);
            window.alert('Error deleting student:', response.status);
        }
    })
    .then(() => {
        loadMentee();
    })
    .catch(err => console.log(err));

}

function loadMenteeMark(studentId){
    document.getElementById('mentee-overlay').style.display = 'block';
    document.getElementById('mentee-mark-dialog').style.display = 'block';

    fetch(`/api/mark/id/${studentId}`)
    .then(response => response.json())
    .then(data => {
        const table = document.querySelector('#mentee-mark-dialog').querySelector('table');
        if (!table) {
            const table = document.createElement('table');
        table.className = "table";
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
        document.querySelector('#mentee-mark-dialog').append(table);
        } 

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

function loadMenteeEdit(studentId) {
    document.getElementById('mentee-overlay').style.display = 'block';
    document.getElementById('mentee-edit-dialog').style.display = 'block';
    document.getElementById('mentee-edit-err').style.display = 'none';
    document.getElementById('mentee-edit-dialog').querySelector('#studentid').value = studentId;

    fetch(`/api/student/id/${studentId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('mentee-edit-firstname').value = data.first_name;
        document.getElementById('mentee-edit-lastname').value = data.last_name;
        document.getElementById('mentee-edit-username').value = data.username;
        document.getElementById('mentee-edit-email').value = data.email;
        document.getElementById('mentee-edit-phone-no').value = data.phone_no;
        document.getElementById('mentee-edit-dob').value = data.dob;
        document.getElementById('mentee-edit-yoa').value = data.year_of_admission;
    })
    .catch(err => console.log(err));
}

function validateMenteeEdit() {
    const fields = [
        {
            id: "mentee-edit-firstname",
            error: "Enter first name",
            regex: /.+/,
        },
        {
            id: "mentee-edit-lastname",
            error: "Enter last name",
            regex: /.+/,
        },
        {
            id: "mentee-edit-username",
            error: "Enter username",
            regex: /.+/,
        },
        {
            id: "mentee-edit-email",
            error: "Enter a valid email",
            regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        },
        {
            id: "mentee-edit-phone-no",
            error: "Enter a valid phone number",
            regex: /^\d{10}$/,
        },
        {
            id: "mentee-edit-dob",
            error: "Enter date of birth",
            regex: /.+/,
        },
        {
            id: "mentee-edit-yoa",
            error: "Enter year of admission",
            regex: /.+/,
        },
    ];
    let isValid = true;
    for (const field of fields) {
        const inputField = document.getElementById(field.id);
        if (!field.regex.test(inputField.value)) {
            isValid = false;
            document.querySelector("#save-mentee-edit").disabled = true;
            document.querySelector("#save-mentee-edit").title = field.error;
            document.querySelector("#save-mentee-edit").style.cursor = "not-allowed";
            break;
        }
    }
    if (isValid) {
        document.querySelector("#save-mentee-edit").disabled = false;
        document.querySelector("#save-mentee-edit").title = "Update";
        document.querySelector("#save-mentee-edit").style.cursor = "pointer";
    }
}

function updateMenteeEdit() {
    const first = document.getElementById('mentee-edit-firstname').value;
    const last = document.getElementById('mentee-edit-lastname').value;
    const username = document.getElementById('mentee-edit-username').value;
    const email = document.getElementById('mentee-edit-email').value;
    const phoneNo = document.getElementById('mentee-edit-phone-no').value;
    const dob = document.getElementById('mentee-edit-dob').value;
    const yoa = document.getElementById('mentee-edit-yoa').value;
    const studentId = document.getElementById('mentee-edit-dialog').querySelector('#studentid').value;
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phoneNoRegex = /^\d{10}$/;
    const err = document.getElementById('mentee-edit-err')

    if (first === "" || first === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter First name';
        return
        
    }

    if (last === "" || last === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter Last name';
        return

    }

    if (username === "" || username === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter Username';
        return

    }

    if (!emailRegex.test(email)) {

        err.style.display = 'block';
        err.innerHTML = 'Enter Valid Email';
        return

    }

    if (!phoneNoRegex.test(phoneNo)) {

        err.style.display = 'block';
        err.innerHTML = 'Enter Valid Phone Number';
        return

    }

    if (dob === "" || dob === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter Date of Birth';
        return

    }

    if (yoa === "" || yoa === null) {
        
        err.style.display = 'block';
        err.innerHTML = 'Enter Year of Admission';
        return

    }

    fetch(`api/student/id/${studentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            first_name: first,
            last_name: last,
            username: username,
            email: email,
            phone_no: phoneNo,
            dob: dob,
            year_of_admission: yoa
        })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('mentee-overlay').style.display = 'none';
        document.getElementById('mentee-edit-dialog').style.display = 'none';
    })
    .then(() => {
        loadMentee();
    })
    .catch(err => console.log(err));
}

// Subject view
function loadSubject() {
    document.querySelector('#my-profile-view').style.display = 'none';
    document.querySelector('#mentee-view').style.display = 'none';
    document.querySelector('#subject-view').style.display = 'block';
}

function loadSubjectMarks() {
    const sem = document.querySelector('#subject-semester').value;
    const term = document.querySelector('#subject-term').value;

    if (sem === 'Semester') {

        document.querySelector('#subject-semester-err').style.display = 'block';
    
    }

    if (term === 'Term') {

        document.querySelector('#subject-term-err').style.display = 'block';

    } 
    
    if(sem !== 'Semester' && term !== 'Term') {

        document.querySelector('#subject-marks').innerHTML = `
        <table class="table table-dark">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Mark</th>
                    <th> </th>
                </tr>
            </thead>
            <tbody id="subject-tbody">
            </tbody>
        </table>
        `;

        fetch(`api/subject/teacher/${teacherId}/sem/${sem}/term/${term}`)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data)) {
                document.querySelector('#subject-tbody').innerHTML = data.map(d => {
                    const name = `${d.student.first_name} ${d.student.last_name}`;
                    return `
                        <tr>
                            <td>${name}</td>
                            <td>${d.mark}</td>
                            <td style="display:flex; flex-direction: row-reverse;">
                                <div style="margin: 1px 5px;">
                                    <i class="fas fa-trash-alt" id="subject-mark-delete" data-markid="${d.id}" title="Delete Mark"></i>
                                </div>
                                <div style="margin: 1px 5px;">
                                    <i class="fas fa-edit" id="subject-mark-edit" data-mark="${d.mark}" data-name="${name}" data-markid="${d.id}" title="Edit Mark"></i>
                                </div>
                            </td>
                        </tr>
                    `;
                }).join('');
            } else {
                document.querySelector('#subject-tbody').innerHTML = `
                    <tr>
                        <td>${data.student.first_name} ${data.student.last_name}</td>
                        <td>${data.mark}</td>
                        <td style="display:flex; flex-direction: row-reverse;">
                            <div style="margin: 1px 5px;">
                                <i class="fas fa-trash-alt" id="subject-mark-delete" data-markid="${data.id}" title="Delete Mentee"></i>
                            </div>
                            <div style="margin: 1px 5px;">
                                <i class="fas fa-edit" id="subject-mark-edit" data-mark="${data.mark}" data-name="${data.student.first_name} ${data.student.last_name}" data-markid="${data.id}" title="Edit Mentee"></i>
                            </div>
                        </td>
                    </tr>
                `;
            }

        })
        .catch(err => console.log(err));
    }
}

function validateSubjectMarksFilter() {

    const sem = document.querySelector('#subject-semester').value;
    const term = document.querySelector('#subject-term').value;
    let isValid = true;
    let message = "";

    if (sem === 'Semester') {

        isValid = false;
        message = "Select Semester";

    } else if (sem < 1 || sem > 8) {

        isValid = false;
        message = "Select Valid Semester";

    } else if (term === 'Term') {

        isValid = false;
        message = "Select Term";

    } else if (term < 1 || term > 2) {

        isValid = false;
        message = "Select Valid Term";

    }

    const saveButton = document.querySelector("#subject-marks-btn");
    saveButton.disabled = !isValid;
    saveButton.title = message || "Show";
    saveButton.style.cursor = isValid ? "pointer" : "not-allowed";
}

function loadSubjectMarksCreate() {
    document.getElementById('subject-overlay').style.display = 'block';
    document.getElementById('mark-create-dialog').style.display = 'block';
    document.getElementById('subject-mark-create-err').style.display = 'none';

    // document.getElementById('mark-create-student').selectedIndex = 0;
    document.getElementById('mark-create-student').value = '';
    document.getElementById('mark-create-semester').selectedIndex = 0;
    document.getElementById('mark-create-term').selectedIndex = 0;
    document.getElementById('mark-create-mark').value = '';
    document.getElementById('students').innerHTML = '';

    fetch(`api/student`)
    .then(response => response.json())
    .then(data => {
        data.map(d => {
            const option = document.createElement('option');
            option.value = `${d.first_name} ${d.last_name}`;
            option.dataset.studentid = `${d.id}`;
            document.querySelector('#students').append(option);
        })
    })
    .catch(err => console.log(err));
}

function validateSubjectMarksCreate() {

    const sem = document.querySelector('#mark-create-semester').value;
    const term = document.querySelector('#mark-create-term').value;
    const student = document.querySelector('#mark-create-student').value;
    const mark = document.querySelector('#mark-create-mark').value;
    let isValid = true;
    let message = "";

    if (student == '') {

        isValid = false;
        message = "Select Student";

    } else if (sem === 'Semester') {

        isValid = false;
        message = "Select Semester";

    } else if (sem < 1 || sem > 8) {

        isValid = false;
        message = "Select Valid Semester";

    } else if (term === 'Term') {

        isValid = false;
        message = "Select Term";

    } else if (term < 1 || term > 2) {

        isValid = false;
        message = "Select Valid Term";

    } else if (mark == '') {

        isValid = false;
        message = "Enter Mark";

    } else if (mark < 0 || mark > 100) {

        isValid = false;
        message = "Enter Valid Mark";

    }

    const saveButton = document.querySelector("#save-mark-create");
    saveButton.disabled = !isValid;
    saveButton.title = message || "Create";
    saveButton.style.cursor = isValid ? "pointer" : "not-allowed";
}

function createSubjectMark() {
    const err = document.querySelector('#subject-mark-create-err');
    const sem = document.querySelector('#mark-create-semester').value;
    const term = document.querySelector('#mark-create-term').value;
    // const mySelect = document.querySelector('#mark-create-student');
    // const selectedOption = mySelect.options[mySelect.selectedIndex];
    // const studentId = selectedOption.dataset.studentid;
    const student = document.querySelector('#mark-create-student').value;
    const selectedOption = document.querySelector('#students').querySelector(`option[value="${student}"`);
    if (!selectedOption) {

        err.style.display = 'block';
        err.innerHTML = "Select a valid Student";
        return

    }
    const studentId = selectedOption.dataset.studentid;
    const mark = document.querySelector('#mark-create-mark').value;
    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    
    if (student == '' || student == null) {

        err.style.display = 'block';
        err.innerHTML = "Select a Student";
        return

    } else if (studentId === null || studentId === undefined) {

        err.style.display = 'block';
        err.innerHTML = "Select a valid Student";
        return

    } else if (sem === 'Semester') {

        err.style.display = 'block';
        err.innerHTML = "Select Semester";
        return

    } else if (sem < 1 || sem > 8) {

        err.style.display = 'block';
        err.innerHTML = "Select Valid Semester";
        return

    } else if (term === 'Term') {

        err.style.display = 'block';
        err.innerHTML = "Select Term";
        return

    } else if (term < 1 || term > 2) {

        err.style.display = 'block';
        err.innerHTML = "Select Valid Term";
        return

    } else if (mark == '') {

        err.style.display = 'block';
        err.innerHTML = "Enter Mark";
        return

    } else if (mark < 0 || mark > 100) {

        err.style.display = 'block';
        err.innerHTML = "Enter Valid Mark";
        return

    }

    fetch(`api/subject/teacher/${teacherId}/sem/${sem}/term/${term}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            'studentId': studentId,
            'mark': mark
        })
    })
    .then(response => {
        if (response.status === 201) {
            document.querySelector('#subject-overlay').style.display = 'none';
            document.querySelector('#mark-create-dialog').style.display = 'none';

        } else if (response.status === 404) {

            err.style.display = 'block';
            err.innerHTML = 'Exam has not been created yet';

        } else if (response.status === 409) {

            err.style.display = 'block';
            err.innerHTML = 'Student is already assigned a mark. Please use edit mark.'
        
        }
    })
    .catch(err => console.log(err))
    
}

function loadSubjectMarkEdit(markId, name, mark) {

    document.querySelector('#subject-overlay').style.display = 'block';
    document.querySelector('#mark-edit-dialog').style.display = 'block';
    document.querySelector('#subject-mark-edit-err').style.display = 'none';
    document.querySelector('#mark-edit-dialog').querySelector('#mark-edit-mark').value = mark;
    document.querySelector('#mark-edit-dialog').querySelector('#markid').value = markId;
    document.querySelector('#mark-edit-name').value = name;

}

function updateSubjectMarkEdit() {

    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    const mark = document.getElementById('mark-edit-mark').value;
    const markId = document.getElementById('mark-edit-dialog').querySelector('#markid').value;
    const err = document.getElementById('subject-mark-edit-err');

    if (mark == '') {
        
        err.style.display = 'block';
        err.innerHTML = "Enter Mark";
        return

    } else if (mark < 0 || mark > 100)  {
        
        err.style.display = 'block';
        err.innerHTML = "Enter Valid Mark";
        return

    }

    fetch(`api/mark/id/${markId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken
        },
        body: JSON.stringify({
            mark: mark,
        })
    })
    .then(() => {
        document.getElementById('subject-overlay').style.display = 'none';
        document.getElementById('mark-edit-dialog').style.display = 'none';
    })
    .then(() => {
        document.getElementById('subject-marks-btn').click();
    })
    .catch(err => console.log(err));

}

function validateSubjectMarksEdit() {

    const mark = document.querySelector('#mark-edit-mark').value;
    let isValid = true;
    let message = "";

    if (mark == '') {
        
        isValid = false;
        message = "Enter Mark";

    } else if (mark < 0 || mark > 100)  {
        
        isValid = false;
        message = "Enter Valid Mark";

    }

    const saveButton = document.querySelector("#save-mark-edit");
    saveButton.disabled = !isValid;
    saveButton.title = message || "Update";
    saveButton.style.cursor = isValid ? "pointer" : "not-allowed";

}

function deleteMark(markId) {

    const csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    
    fetch(`api/mark/id/${markId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'X-CSRFToken': csrfToken
        }
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('subject-overlay').style.display = 'none';
            document.getElementById('mark-delete-dialog').style.display = 'none';
        } else {
            console.log('Error deleting mark:', response.status);
            window.alert('Error deleting mark:', response.status);
        }
    })
    .then(() => {
        document.getElementById('subject-marks-btn').click();
    })
    .catch(err => console.log(err));

}

window.onpopstate = (event) => {
    if (event.state.view === 'profile') {
        loadProfile();
    } else if (event.state.view === 'mentee') {
        loadMentee();
    } else if (event.state.view === 'subject') {
        loadSubject();
    }
};