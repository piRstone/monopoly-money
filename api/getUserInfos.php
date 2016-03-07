<?php

if ($_GET['user']) {

	$userId = $_GET['user'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	$res = $bdd->query("SELECT * FROM users WHERE id = $userId");

	$response = array();

	while ($data = $res->fetch()) {
		$user = array();
		$user['id'] = $data['id'];
		$user['name'] = $data['name'];
		$user['game_id'] = $data['game_id'];
		$user['credit'] = $data['credit'];
		array_push($response, $user);
	}

	echo json_encode($response);

	$res->closeCursor();

}

?>