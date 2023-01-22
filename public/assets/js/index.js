const myModal = new bootstrap.Modal("#register-modal");
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

checkLogged()

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.querySelector('#input-email').value;
    const password = document.querySelector('#input-password').value;
    const checkSession = document.querySelector('#session-check').checked;

    const account = getAccount(email);

    if (!account) {
        alert('Ops! Verifique seu usuário ou a senha.');
        return;
    }

    if (account) {
        if (account.password != password) {
            alert('Ops! Verifique seu usuário ou a senha.');
            return;
        }

        saveSession(email,checkSession);

        window.location.href = 'home.html';
    }
})

document.getElementById('create-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.querySelector('#create-email-input').value;
    const password = document.querySelector('#create-password-input').value;

    if (email.length < 5) {
        alert('Preencha o campo com um email válido.');
        return;
    }

    if (password.length < 4) {
        alert('Crie um senha com no mínimo 4 dígitos!');
        return;
    }

    saveAccount({
        email: email,
        password: password,
        transactions: []
    })

    alert('Sua conta foi criada com sucesso.');
    myModal.hide();

});

function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }

    if (logged)  {
        saveSession(logged, session);

        window.location.href = 'home.html';
    }
}

function saveAccount(user) {
    localStorage.setItem(user.email, JSON.stringify(user));
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem('session', data);
    }

    sessionStorage.setItem('logged', data);
}

function getAccount(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return '';
}