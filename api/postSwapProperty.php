<?php

if ($_POST['property'] && $_POST['player']) {

	$propertyId = $_POST['property'];
	$playerId = $_POST['player'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	$res = $bdd->exec("UPDATE properties SET owner_id = $playerId WHERE id = $propertyId");

	$req = $bdd->query('SELECT type FROM properties WHERE id = $propertyId');
	$resp = $req->fetch();

	if ($resp['type'] == 'gare') {
		$res2 = $bdd->exec("UPDATE users SET nbGares = nbGares + 1 WHERE id = $playerId");
	} else if ($resp['type'] == 'compagnie') {
		$res2 = $bdd->exec("UPDATE users SET nbCompagnies = nbCompagnies + 1 WHERE id = $playerId");
	}

	if ($res == 1) {
		return http_response_code(200);
	}
}

?>