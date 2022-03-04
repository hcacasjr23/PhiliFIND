<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// include_once ("core.php")
$connect = mysqli_connect("localhost", "root", "", "philifind");
if ($connect){

    

<<<<<<< HEAD:Client/src/api/GetData/getFoundData.php
    $sql = "SELECT * FROM `found_table` WHERE fd_status = 'show' ORDER BY `id` ASC";
=======
    $sql = "SELECT * FROM `found_table` ORDER BY `id` ASC" ;
>>>>>>> 7dc2f9f84278579f476725f58c7fe5bfa00706d2:Client/src/api/getFoundData.php
    $result = @mysqli_query($connect, $sql);
    $json_array = array();
    
    while($row = mysqli_fetch_assoc($result)) {
        $json_array[]=$row;
    }
    echo json_encode($json_array, JSON_PRETTY_PRINT);
    
    
    
    
    mysqli_close($connect);


}
else{
    echo 'Failed to connect to Server: ' . mysqli_connect_error( );
}
?>