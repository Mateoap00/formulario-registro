const email = document.getElementById('inputEmail');
const name = document.getElementById('inputName');
const birthDate = document.getElementById('birthDate');
const gender = document.getElementById('genderSelect');
const allInterests = document.querySelectorAll('#interestsItem');
const btnRegistrar = document.getElementById('btnRegistrar');

email.setAttribute('placeholder', 'Escriba aqui el email...');
name.setAttribute('placeholder', 'Escriba aqui el nombre completo...');

// Valida que un campo del formulario no este vacio
const validateNotEmpty = (inputObj) => {
    if (inputObj.value === '') {
        inputObj.setAttribute('class', 'form-control is-invalid');
        return false;
    }
    return true;
}

//Valida que al menos un interes se ha seleccionado
const validateInterests = () => {
    let resp = false;
    allInterests.forEach((interest) => {
        if (interest.checked) {
            resp = true;
        }
    });
    return resp;
}

// Muestra todos los errores del formulario
const showErrors = (errors) => {
    let i = 0;
    let fullErrors = errors.reduce((acu, curr) => acu + `${++i}. ${curr}\n`, '');
    alert(`Se encontraron los siguientes errores en el formulario: \n${fullErrors}`);
}

// Funcion para guardar la informacion del formulario de registro
const getDataForm = () => {

    let errors = [];

    if (!validateNotEmpty(email)) {
        errors.push('Debe escribir un correo electronico');
    }
    if (!validateNotEmpty(name)) {
        errors.push('Debe escribir un nombre completo');
    }
    if (!validateNotEmpty(birthDate)) {
        errors.push('Debe elegir una fecha de nacimiento');
    }
    if (gender.value === '0') {
        errors.push('Debe elegir un genero');
        gender.setAttribute('class', 'form-select is-invalid');
    }
    if (!validateInterests()) {
        errors.push('Debe seleccionar por lo menos un interes');
    }

    if (errors.length > 0) {
        showErrors(errors);
        return
    } else {
        let selectedInterests = [];
        allInterests.forEach((interest) => {
            if (interest.checked) {
                selectedInterests.push(interest.value);
            }
        });

        const datosFormulario = {
            email: email.value,
            name: name.value,
            birthDate: birthDate.value,
            gender: gender.value,
            interests: selectedInterests
        }
        console.log(datosFormulario);

        alert('Usted se ha registrado satisfactoriamente!');
    }
}

btnRegistrar.addEventListener('click', function () {
    getDataForm();
});

// Valida si un campo del formulario esta vacio ya cambia el estilo del campo segun su estado
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