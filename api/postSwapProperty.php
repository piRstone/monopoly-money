<?php

if ($_POST['property'] && $_POST['player']) {

	$propertyId = $_POST['property'];
	$playerId = $_POST['player'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	$res = $bdd->exec("UPDATE properties SET owner_id = $playerId WHERE id = $propertyId");

	if ($res == 1) {
		return http_response_code(200);
	}
}

?>