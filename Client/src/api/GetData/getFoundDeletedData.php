<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// include_once ("core.php")
$connect = mysqli_connect("localhost", "root", "", "philifind");

if ($connect){

    

    $sql_found = "SELECT * FROM `found_table` WHERE fd_status = 'deleted' ORDER BY `id` ASC";
    $found = @mysqli_query($connect, $sql_found);
    $json_array = array();
    
    while($row = mysqli_fetch_assoc($found)) {
        $json_array[]=$row;
    }
    echo json_encode($json_array, JSON_PRETTY_PRINT);
    
    mysqli_close($connect);


}
else{
    echo 'Failed to connect to Server: ' . mysqli_connect_error( );
}
?>