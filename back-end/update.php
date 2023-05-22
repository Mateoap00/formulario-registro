<?php
// Permite recibir peticiones desde cualquier dirección
header("Access-Control-Allow-Origin:*");

// Recibe datos enviados en el cuerpo de la petición
$rawData = file_get_contents("php://input");

// Creando un objeto conexión para guardar los datos en mysql
$dsn = "mysql:dbname=store;host=localhost:3306";
$username = "root";
$password = "";

try {
    $connection = new PDO($dsn, $username, $password);
} catch (Exception $ex) {
    print json_encode($ex);
}

// Transformar rawData en un objeto de PHP
$user = json_decode($rawData);

$id = $user->id;
$name = $user->name;
$email = $user->email;
$birthDate = $user->birthDate;
$gender = $user->gender;

$sqlQuery = "UPDATE users SET username = '$name', email = '$email', birthDate = '$birthDate', gender = '$gender'
        WHERE id = $id;";

// Crear query y guarda el objeto en la db
try {
    $connection->query($sqlQuery);
    print json_encode("updated successfully");
} catch (Exception $ex) {
    print json_encode($ex);
}