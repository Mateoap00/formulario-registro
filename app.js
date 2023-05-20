import { getUsers, addUser } from './usersService.js'; // Importa los request para obtener usuarios y agregar nuevo usuario.

// Objetos DOM del formulario.
const email = document.getElementById('inputEmail');
const name = document.getElementById('inputName');
const birthDate = document.getElementById('birthDate');
const gender = document.getElementById('genderSelect');
const allInterests = document.querySelectorAll('#interestsItem');
const registerBtn = document.getElementById('registerBtn');
const adminBtn = document.getElementById('adminBtn');
const usersTable = document.getElementById('usersTable');
const errorsDialog = document.getElementById('errorsDialog');
const msgDialog = document.getElementById('msgDialog');
const body = document.body;

// Valida que un campo del formulario no este vacío.
const validateNotEmpty = (inputObj) => {
    if (inputObj.value === '') {
        inputObj.setAttribute('class', 'form-control is-invalid');
        return false;
    }
    return true;
}

// Valida que al menos un interés se ha seleccionado.
const validateInterests = (allInterests) => {
    let resp = false;
    allInterests.forEach((interest) => {
        if (interest.checked) {
            resp = true;
        }
    });
    return resp;
}

// Valida que la edad ingresada sea mayor a 18 años.
const verifyAge = (birthDate) => {
    const date = new Date(birthDate);
    const now = new Date();
    const elapsedTime = now - date;
    const age = elapsedTime / (1000 * 60 * 60 * 24 * 365.25);
    if (age < 18) {
        return false;
    }
    return true;
}

// Valida si un campo del formulario esta vació, entonces cambia el estilo del campo según su estado.
const validateInputState = (inputObject, inputName) => {
    if (inputName === 'gender') {
        if (inputObject.value === '0') {
            inputObject.setAttribute('class', 'form-select is-invalid');
        }
        else {
            inputObject.setAttribute('class', 'form-select');
        }
    } else {
        if (inputObject.value === '') {
            inputObject.setAttribute('class', 'form-control is-invalid');
        } else {
            inputObject.setAttribute('class', 'form-control');
        }
    }
}

// Muestra todos los errores del formulario.
const showErrors = (errors) => {
    let i = 1;
    const errorsMsgs = document.getElementById('errorsMsgs');
    errors.forEach((error) => {
        const newP = document.createElement('p');
        newP.innerHTML = `${i}. ${error}`;
        errorsMsgs.appendChild(newP);
        i++
    });
    if (!errorsDialog.open) {
        errorsDialog.showModal();
    }
    const acceptErrorsBtn = document.getElementById('acceptErrorsBtn');
    acceptErrorsBtn.setAttribute('class', 'btn btn-danger');
    acceptErrorsBtn.addEventListener('click', function () {
        while (errorsMsgs.firstChild) {
            errorsMsgs.firstChild.remove();
        }
        errorsDialog.close();
    });
}

// Muestra mensajes o errores en la pagina.
const showMessages = (msg, type) => {
    type === 'success' ? msgDialog.setAttribute('class', 'alert alert-success') : msgDialog.setAttribute('class', 'alert alert-danger');
    const msgP = document.getElementById('msgP');
    msgP.innerHTML = msg;
    if (!msgDialog.open) {
        msgDialog.showModal();
    }
    const acceptMsgBtn = document.getElementById('acceptMsgBtn');
    type === 'success' ? acceptMsgBtn.setAttribute('class', 'btn btn-success') : acceptMsgBtn.setAttribute('class', 'btn btn-danger');
    acceptMsgBtn.addEventListener('click', function () {
        msgP.innerHTML = '';
        msgDialog.close();
    });
}

// Llena la tabla 'usersTable' con la información de los usuarios registrados.
const fillUsersTable = () => {

    // Request para obtener los usuarios.
    getUsers()
        .then((users) => {
            clearUsersTable();

            const tbody = document.createElement('tbody');
            users.forEach((user) => {
                const row = document.createElement('tr');
                for (const prop in user) {
                    const col = document.createElement('td');
                    if (prop == 'gender') {
                        col.innerHTML = user[prop] == 1 ? 'Hombre' : 'Mujer';
                    } else if (prop == 'interests') {
                        let totalInterests = '';
                        user[prop].forEach((interest) => {
                            let auxInterest;
                            switch (interest) {
                                case '1':
                                    auxInterest = 'Computers';
                                    break;
                                case '2':
                                    auxInterest = 'Sports';
                                    break;
                                case '3':
                                    auxInterest = 'Games';
                                    break;
                                case '4':
                                    auxInterest = 'Music';
                                    break;
                            }
                            totalInterests = totalInterests + `${auxInterest}, `;
                        });
                        col.innerHTML = totalInterests.slice(0, -2);;
                    } else {
                        col.innerHTML = user[prop];
                    }
                    col.setAttribute('class', 'users-data');
                    row.appendChild(col);
                }
                tbody.appendChild(row);
                usersTable.appendChild(tbody);
            });
        })
        .catch((error) => {
            showMessages('Error: No se pudo obtener la lista de usuarios!', 'fail');
        });
}

// Limpia la tabla 'usersTable' dentro de html (elimina los td con la clase 'users-data').
const clearUsersTable = () => {
    const data = document.getElementsByClassName('users-data');
    const arrayData = [...data];
    arrayData.map((field) => field.remove());
}

// Limpia los campos del formulario.
const restartForm = () => {
    email.value = '';
    name.value = '';
    birthDate.value = '';
    gender.value = 0;
    allInterests.forEach((interest) => {
        if (interest.checked) {
            interest.checked = false;
        }
    });
}

// Función principal para guardar la información de los campos del formulario de registro.
const getDataForm = () => {
    let errors = [];

    if (!validateNotEmpty(email)) {
        errors.push('Debe escribir un correo electrónico.');
    }
    if (!validateNotEmpty(name)) {
        errors.push('Debe escribir un nombre completo.');
    }
    if (!validateNotEmpty(birthDate)) {
        errors.push('Debe elegir una fecha de nacimiento.');
    }
    if (gender.value === '0') {
        errors.push('Debe elegir un genero.');
        gender.setAttribute('class', 'form-select is-invalid');
    }
    if (!verifyAge(birthDate.value)) {
        errors.push('Debe elegir una edad mayor o igual a 18 años.');
    }
    if (!validateInterests(allInterests)) {
        errors.push('Debe seleccionar por lo menos un interés.');
    }

    if (errors.length > 0) {
        showErrors(errors);
    } else {
        let selectedInterests = [];
        allInterests.forEach((interest) => {
            if (interest.checked) {
                selectedInterests.push(interest.value);
            }
        });

        const newUser = {
            email: email.value,
            name: name.value,
            birthDate: birthDate.value,
            gender: gender.value,
            interests: JSON.stringify(selectedInterests)
        }

        // Request para agregar nuevo usuario.
        try {
            addUser(newUser);
            restartForm();
            showMessages('Usuario registrado correctamente!', 'success');
            setTimeout(() => {
                fillUsersTable();
            }, 300);
        } catch (error) {
            showMessages('Error: No se pudo registrar el usuario!', 'fail');
        }
    }
}

// Agrega los handlers para eventos de los distintos elementos de la pagina.
email.addEventListener('blur', function () {
    validateInputState(email, 'email');
});

name.addEventListener('blur', function () {
    validateInputState(name, 'nombre completo');
});

birthDate.addEventListener('blur', function () {
    validateInputState(birthDate, 'fecha de nacimiento');
});

gender.addEventListener('blur', function () {
    validateInputState(gender, 'gender');
});

registerBtn.addEventListener('click', function () {
    getDataForm();
});

adminBtn.addEventListener('click', function () {
    window.location.href = "users.html";
});

body.addEventListener('load', fillUsersTable());