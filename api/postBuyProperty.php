<?php

if ($_POST['user'] && $_POST['property']) {

	$userId = $_POST['user'];
	$propertyId = $_POST['property'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	// Get property
	$req = $bdd->query("SELECT * FROM properties WHERE id = $propertyId");
	$resp = $req->fetch();
	$price = $resp['price'];
	if ($resp['owner_id'] == null) {

		// Get user credit
		$req = $bdd->query("SELECT credit FROM users WHERE id = $userId");
		$resp = $req->fetch();
		$currentCredit = $resp['credit'];
		$newCredit = $currentCredit - $price;

		$res = $bdd->exec("UPDATE properties SET owner_id = $userId WHERE id = $propertyId");
		$res = $bdd->exec("UPDATE users SET credit = $newCredit WHERE id = $userId");

		echo json_encode($res);
	} else {
		http_response_code(409);
	}

	$req->closeCursor();
}

?>