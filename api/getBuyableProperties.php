<?php

$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

$res = $bdd->query('SELECT * FROM properties WHERE owner_id IS NULL ORDER BY type DESC');

$response = array();

while ($data = $res->fetch()) {
	array_push($response, $data);
}

echo json_encode($response);

$res->closeCursor();

?>