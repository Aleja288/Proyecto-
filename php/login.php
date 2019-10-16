<?php

require_once("DbPDO.class.php");

// Instancia de la clase DbPDO
$mipdo = new DbPDO();

//Datos del inicio de sesion
$pass = $_POST['passUsuario'];
$username = $_POST['nomUsuario'];
$type_user = $_POST['isSecretary'];


if ($type_user == "true") {

  $query = $mipdo->query("SELECT * FROM secretario WHERE usuario = :usuario", array("usuario" => $username));
  if($query[0]["pass"] == $pass){
    echo 'Password Matches sec';
  }else{
    echo "Fail password sec";
  }
} else {

  $query = $mipdo->query("SELECT * FROM usuario WHERE usuario = :usuario", array("usuario" => $username));
  validatePass($pass,$query);
}

function validatePass($password, $data){

if (count($data) > 0) {
  //Verificar contrasenna
  if (password_verify($password, $data[0]["pass"])) {
    //Success!
    $_SESSION['login_user'] = $data[0]["usuario"];
    echo 'Password Matches';
  } else {
    //Invalid credentials
    echo "Fail password";
  }
} else {

  echo "No esta registrado ese usuario";
}

}