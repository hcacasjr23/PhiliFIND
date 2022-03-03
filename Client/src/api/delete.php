<?php

// Headers to connect localhost:3000 to localhost phpmyadmin
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Method for getting files
$rest_json = file_get_contents("php://input");
//Post Method
// Connection
$conn = mysqli_connect("localhost", "root", "", "philifind");

$id = $_GET['id'];
echo $id;


$query = "UPDATE found_table SET fd_status = 'deleted' WHERE id = $id";

$result = mysqli_query($conn, $query);


if ($result) {
    echo $result;
}
else {
    echo mysqli_connect_error();
};

?>