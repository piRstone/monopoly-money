<?php
include 'config.php';

$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', $password);

$res = $bdd->query('SELECT * FROM properties');

$response = array();

while ($data = $res->fetch()) {
	array_push($response, $data);
}

echo json_encode($response);

$res->closeCursor();

?>