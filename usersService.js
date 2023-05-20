// CRUD de usuarios.

// GET request al servidor PHP en localhost:9001 para OBTENER los usuarios registrados en la tabla 'users' de la base de datos 'store'.
const getUsers = () => {
    return fetch('http://localhost:9001/api-php/list-users.php')
        .then(response => response.json())
        .then(data => {
            const users = data;
            const decodedUsers = users.map((usr) => {
                return {
                    id: usr.id,
                    userName: usr.userName,
                    email: usr.email,
                    birthDate: usr.birthDate,
                    gender: usr.gender,
                    interests: JSON.parse(usr.interests)
                }
            });
            return decodedUsers;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

// POST request al servidor PHP en localhost:9001 para AGREGAR un nuevo usuario en la tabla 'users' de la base de datos 'store'.
const addUser = (user) => {
    fetch('http://localhost:9001/api-php/insert.php', { method: 'POST', body: JSON.stringify(user) })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.log(error);
            throw error;
        });
}

// Request al servidor PHP en localhost:9001 para ACTUALIZAR un usuario registrado con un 'id' exacto en la tabla 'users' 
// de la base de datos 'store'.
const updateUser = (user) => {
    fetch('http://localhost:9001/api-php/update.php', { method: 'post', body: JSON.stringify(user) })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

// Request al servidor PHP en localhost:9001 para ELIMINAR un usuario registrado con un 'id' exacto en la tabla 'users' 
// de la base de datos 'store'.
const deleteUser = (id) => {
    fetch(`http://localhost:9001/api-php/delete.php?id=${id}`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error(error);
            throw error;
        });
}

export { getUsers, addUser, updateUser, deleteUser };
