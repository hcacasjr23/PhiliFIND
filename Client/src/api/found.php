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
    $query = "INSERT INTO found_table (fd_item, fd_brand, 
    fd_email, fd_pcontact, fd_name, fd_place,
    fd_category, fd_color, fd_addinfo, fd_scontact, fd_date, fd_time, fd_image
    )
    values(
    '" . $_POST['fd_item'] . "',
    '" . $_POST['fd_brand'] . "',
    '" . $_POST['fd_email'] . "',
    '" . $_POST['fd_pcontact'] . "',
    '" . $_POST['fd_name'] . "',
    '" . $_POST['fd_place'] . "',
    '" . $_POST['fd_category'] . "',
    '" . $_POST['fd_color'] . "',
    '" . $_POST['fd_addinfo'] . "',
    '" . $_POST['fd_scontact'] . "',
    '" . $_POST['fd_date'] . "',
    '" . $_POST['fd_time'] . "',
    '" . $_POST['fd_image'] . "'
    )";
    
    // Trim extra spaces 
    $item = trim($_POST['fd_item']);
    $brand = trim($_POST['fd_brand']);
    $color = trim($_POST['fd_color']);
    $name = trim($_POST['fd_name']);
    $email = trim($_POST['fd_email']);
    $pContact = trim($_POST['fd_pcontact']);
    
    
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