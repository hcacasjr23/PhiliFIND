<?php

// Headers to connect localhost:3000 to localhost phpmyadmin
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Method for getting files
$rest_json = file_get_contents("php://input");
//Post Method
$_POST = json_decode($rest_json, true);
// Connection
$conn = mysqli_connect("localhost", "root", "", "philifind");

//Verify connectivity
if ($conn)
{
    // Insert Values
    $query = "INSERT INTO lost_table (lt_item, lt_brand, 
    lt_email, lt_pcontact, lt_name, lt_place,
    lt_category, lt_color, lt_addinfo, lt_scontact, lt_date, lt_time, lt_image
    )
    values(
    '" . $_POST['lt_item'] . "',
    '" . $_POST['lt_brand'] . "',
    '" . $_POST['lt_email'] . "',
    '" . $_POST['lt_pcontact'] . "',
    '" . $_POST['lt_name'] . "',
    '" . $_POST['lt_place'] . "',
    '" . $_POST['lt_category'] . "',
    '" . $_POST['lt_color'] . "',
    '" . $_POST['lt_addinfo'] . "',
    '" . $_POST['lt_scontact'] . "',
    '" . $_POST['lt_date'] . "',
    '" . $_POST['lt_time'] . "',
    '" . $_POST['lt_image'] . "'
    )";
    
    // Trim extra spaces 
    $item = trim($_POST['lt_item']);
    $brand = trim($_POST['lt_brand']);
    $color = trim($_POST['lt_color']);
    $name = trim($_POST['lt_name']);
    $email = trim($_POST['lt_email']);
    $pContact = trim($_POST['lt_pcontact']);
    
    
    // Validate empty values
    if (!empty($item) AND !empty($brand) AND !empty($color)
    AND !empty($name) AND !empty($email) AND !empty($pContact)){

        $result = @mysqli_query($conn, $query);
        if ($result) 
        {
            echo json_encode(["sent" => 1, ]);
        } 
        else 
        {
            echo json_encode(["sent" => 0, ]);
        }
    }
    else{
        echo json_encode(["Data Invalid"]);
    }

}
else 
{
    echo 'Failed to connect to Server: ' . mysqli_connect_error();
}


?>