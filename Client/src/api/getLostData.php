<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// include_once ("core.php")
$connect = mysqli_connect("localhost", "root", "", "philifind");
if ($connect){

    $sql = "SELECT * FROM `lost_table` ORDER BY `id` ASC";
    $result = @mysqli_query($connect, $sql);
    $json_array = array();
    
    while($row = mysqli_fetch_assoc($result)) {
        $json_array[]=$row;
    }
    echo json_encode($json_array, JSON_PRETTY_PRINT);
    
    
    mysqli_close($connect);


}
else{
    echo 'Failed to connect to Server: ' . mysqli_connect_error();
}
?>