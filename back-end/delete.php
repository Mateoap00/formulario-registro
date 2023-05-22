<?php
header("Access-Control-Allow-Origin:*");

$id = $_GET['id'];

$dsn = "mysql:host=localhost:3306;dbname=store;";
$user = "root";
$psw = "";

try {
    $connection = new PDO($dsn, $user, $psw);
} catch (Exception $ex) {
    print json_encode($ex);
}

$sqlQuery = "DELETE FROM users WHERE id = $id;";

try {
    $connection->query($sqlQuery);
    print json_encode("deleted successfully");
} catch (Exception $ex) {
    print json_encode($ex);
}