<?php

if ($_GET['user']) {

	$userId = $_GET['user'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	$res = $bdd->query("SELECT id, name, game_id, credit, nbGares, nbCompagnies FROM users WHERE id = $userId");

	$response = $res->fetch();
	unset($response['0']);
	unset($response['1']);
	unset($response['2']);
	unset($response['3']);
	unset($response['4']);
	unset($response['5']);

	echo json_encode($response);

	$res->closeCursor();

}

?>