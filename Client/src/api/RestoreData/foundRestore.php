<?php

// Headers to connect localhost:3000 to localhost phpmyadmin
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");


$id = $_REQUEST['id'];

// Connection
$conn = mysqli_connect("localhost", "root", "", "philifind");


$query = "UPDATE `found_table` SET `fd_status`='show' WHERE id = $id";
$result = mysqli_query($conn, $query);



if ($result) {
    echo json_encode(["sent" => 1, ]);
}
else {
    echo mysqli_connect_error();
};

?>