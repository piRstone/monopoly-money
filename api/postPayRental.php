<?php

if ($_POST['rental'] && $_POST['player'] && $_POST['user']) {

	$rental = $_POST['rental'];
	$playerId = $_POST['player'];
	$userId = $_POST['user'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	// Get user credit
	$req = $bdd->query("SELECT credit FROM users WHERE id = $userId");
	$resp = $req->fetch();
	$currentCredit = $resp['credit'];
	$newCredit = $currentCredit - $rental;
	if ($newCredit < 0) {
		return http_response_code(401);
	}

	// Get player credit
	$req2 = $bdd->query("SELECT credit FROM users WHERE id = $playerId");
	$resp2 = $req2->fetch();
	$playerCurrentCredit = $resp2['credit'];
	$newPlayerCredit = $playerCurrentCredit + $rental;

	// Set new credits
	$res = $bdd->exec("UPDATE users SET credit = $newPlayerCredit WHERE id = $playerId");
	$res = $bdd->exec("UPDATE users SET credit = $newCredit WHERE id = $userId");

	echo json_encode($res);

	$req->closeCursor();
	$req2->closeCursor();
}

?>