// Importa los request para obtener usuarios, actualizar y eliminar un usuario.
import { getUsers, updateUser, deleteUser } from './usersService.js';

// Objetos DOM de la tabla 'users'.
const fullUsersTable = document.getElementById('fullUsersTable');
const frmUpdate = document.getElementById('frmUpdate');
const frmDelete = document.getElementById('frmDelete');
const msgDialog = document.getElementById('msgsDialog');

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

// Carga los usuarios registrados en la tabla 'users' de la base de datos 'store' dentro de la tabla 'fullUsersTable' en html.
const fillFullUsersTable = () => {

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

                const colActions = document.createElement('td');
                colActions.setAttribute('class', 'users-data');

                const updateBtn = document.createElement('button');
                updateBtn.innerHTML = 'Actualizar';
                updateBtn.addEventListener('click', function () {
                    showFrmUpdate(user);
                });

                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'Eliminar';
                deleteBtn.addEventListener('click', function () {
                    confirmDeleteUser(user);
                });

                colActions.appendChild(updateBtn);
                colActions.appendChild(deleteBtn);
                row.appendChild(colActions);
                tbody.appendChild(row);
                fullUsersTable.appendChild(tbody);
            });
        })
        .catch((error) => {
            showMessages('Error: No se pudo obtener la lista de usuarios!', 'fail');
        });
}

// Muestra dialog con formulario para actualizar usuario (no toma en cuenta los intereses).
const showFrmUpdate = (user) => {
    const { id, userName, email, birthDate, gender } = user;
    const idSpan = frmUpdate.querySelector('#idSpan');
    const inputName = frmUpdate.querySelector('#inputName');
    const inputEmail = frmUpdate.querySelector('#inputEmail');
    const inputBirthDate = frmUpdate.querySelector('#birthDate');
    const genderSelect = frmUpdate.querySelector('#genderSelect');

    idSpan.innerHTML = id;
    inputName.value = userName;
    inputEmail.value = email;
    inputBirthDate.value = birthDate;
    genderSelect.value = gender;

    const doUpdateBtn = document.getElementById('doUpdateBtn');
    doUpdateBtn.addEventListener('click', goUpdateUser);

    const cancelUpdateBtn = document.getElementById('cancelUpdateBtn');
    cancelUpdateBtn.addEventListener('click', closeFrmUpdate);

    frmUpdate.showModal();
}

const closeFrmUpdate = () => {
    frmUpdate.close();
}

// Request actualizar usuario.
const goUpdateUser = () => {
    const idSpan = frmUpdate.querySelector('#idSpan');
    const inputName = frmUpdate.querySelector('#inputName');
    const inputEmail = frmUpdate.querySelector('#inputEmail');
    const inputBirthDate = frmUpdate.querySelector('#birthDate');
    const genderSelect = frmUpdate.querySelector('#genderSelect');

    const user = {
        id: idSpan.innerHTML,
        email: inputEmail.value,
        name: inputName.value,
        birthDate: inputBirthDate.value,
        gender: genderSelect.value
    }

    try {
        updateUser(user);
        frmUpdate.close();
        showMessages('Usuario actualizado correctamente!', 'success');
        setTimeout(() => {
            fillFullUsersTable();
        }, 300);
    } catch (error) {
        showMessages('Error: El registro no se actualizo!', 'fail');
    }
}

// Muestra dialog con información de usuario y botón para eliminar el usuario (no toma en cuenta los intereses).
const confirmDeleteUser = (user) => {
    const { id, userName, email, birthDate, gender } = user;

    const idHidden = document.getElementById('idHiddenDelete');
    idHidden.value = id;

    const nameSpan = document.getElementById('nameSpan');
    nameSpan.innerHTML = userName;
    const emailSpan = document.getElementById('emailSpan');
    emailSpan.innerHTML = email;
    const birthDateSpan = document.getElementById('birthDateSpan');
    birthDateSpan.innerHTML = birthDate;

    const genderSpan = document.getElementById('genderSpan');
    if (gender === 1) {
        genderSpan.innerHTML = 'Hombre';
    } else {
        genderSpan.innerHTML = 'Mujer';
    }

    frmDelete.showModal();

    const doDeleteBtn = document.getElementById('doDeleteBtn');
    doDeleteBtn.addEventListener('click', goDeleteUser);

    const cancelDltBtn = document.getElementById('cancelDltBtn');
    cancelDltBtn.addEventListener('click', function () {
        frmDelete.close();
    });
}

// Limpia la tabla 'usersTable' dentro de html (elimina los td con la clase 'users-data').
const clearUsersTable = () => {
    const usersData = document.getElementsByClassName('users-data');
    const arrayData = [...usersData];
    arrayData.map((data) => data.remove());
}

// Request para eliminar usuario.
const goDeleteUser = () => {
    const id = document.getElementById('idHiddenDelete').value;

    try {
        deleteUser(id);
        frmDelete.close();
        showMessages('Usuario eliminado correctamente!', 'success');
        setTimeout(() => {
            fillFullUsersTable();
        }, 300);
    } catch (error) {
        showMessages('Error: No se pudo eliminar el registro!', 'fail');
    }
}

const body = document.body;
body.addEventListener('load', fillFullUsersTable());
