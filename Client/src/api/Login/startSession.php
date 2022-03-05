<?php
// Headers to connect localhost:3000 to localhost phpmyadmin
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");


session_start();


$_SESSION = true;

echo "Session is now Live";

$username = $_POST['username'];
$password = $_POST['password'];


if ($username === 'admin'){
    echo "This is username";
}
else {
    echo "this is an error";
}

$_SESSION['user'] = $username;

echo $_SESSION['user'];


// if (isset($_POST['userName']) && isset($_POST['password']))
// {
//     $_SESSION['status'] = false;

//     if (!isset($_SESSION['status']))
//     {
//         if($username === 'admin' && $password === 'admin')
//         {
//             $_SESSION['status'] = true;
//             $_SESSION['user'] = $username;
//             $_SESSION['pass'] = $password;
//             exit();
//         }
//     }

// }
// else {
//     echo ("Hello error");
//     echo $_SESSION;
// }

// echo $_SESSION['user'] = $username;

?>