<?php

$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

$res = $bdd->query('SELECT * FROM properties WHERE properties.owner_id = null');

$response = array();

while ($data = $res->fetch()) {
	array_push($response, $data);
}

echo json_encode($response);

?>