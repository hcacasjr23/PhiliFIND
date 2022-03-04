<?php

// Headers to connect localhost:3000 to localhost phpmyadmin
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");


$id = $_POST['id'];

// Connection
$conn = mysqli_connect("localhost", "root", "", "philifind");

$lost_query = "UPDATE `lost_table` SET `lt_status`='deleted' WHERE id = $id";
$result = mysqli_query($conn, $lost_query);

if ($result) {
    echo json_encode(["sent" => 1, ]);
}
else {
    echo mysqli_connect_error();
};

?>