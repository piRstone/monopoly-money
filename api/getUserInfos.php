<?php

if ($_GET['user']) {

	$userId = $_GET['user'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	$res = $bdd->query("SELECT * FROM users WHERE id = $userId");

	$response = array();

	while ($data = $res->fetch()) {
		array_push($response, $data);
	}

	echo json_encode($response);

	$res->closeCursor();

}

?>