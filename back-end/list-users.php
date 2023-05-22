<?php
// Permite recibir peticiones desde cualquier dirección
header("Access-Control-Allow-Origin:*");

// Creando un objeto conexión para obtener los datos desde la db de mysql
$dsn = "mysql:dbname=store;host=localhost:3306";
$username = "root";
$password = "";
$connection = new PDO($dsn, $username, $password);

// Query para obtener el registro de usuarios desde la db
$query = "SELECT * FROM users;";
$result = $connection->query($query, PDO::FETCH_OBJ);

$users = [];

foreach ($result as $item) {
    $users[] = $item;
}

print json_encode($users);