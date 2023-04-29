function toggleUserType(event) {
    const cardHeader = document.querySelector('.card-header');
    event.preventDefault();
    if (event.target.matches('#student')) {
        event.target.className = 'nav-link active';
        cardHeader.querySelector('#teacher').className = 'nav-link';
        document.querySelector('#user').value = 'student';
    } else if (event.target.matches('#teacher')) {
        event.target.className = 'nav-link active';
        cardHeader.querySelector('#student').className = 'nav-link';
        document.querySelector('#user').value = 'teacher';
    }
}

function validateLogin(event) {

    document.querySelector('#username-err').style.display = 'none';
    document.querySelector('#password-err').style.display = 'none';
    if (document.querySelector('#validation-err')) {
        document.querySelector('#validation-err').style.display = 'none';
    }

    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    let flag = true;
    if (username == '' || username === null){
        document.querySelector('#username-err').style.display = 'block';
        flag = false;
    } else if (password == '' || password === null) {
        document.querySelector('#password-err').style.display = 'block';
        flag = false;
    }

    if (!flag) {
        event.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.card-header').addEventListener('click', toggleUserType);

    document.querySelector('#login-form').addEventListener('submit', validateLogin);

});
