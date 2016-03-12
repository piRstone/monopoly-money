<?php

if ($_POST['user'] && $_POST['property']) {

	$userId = $_POST['user'];
	$propertyId = $_POST['property'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	// Get property
	$req = $bdd->query("SELECT * FROM properties WHERE id = $propertyId");
	$resp = $req->fetch();
	$price = $resp['price'];
	$type = $resp['type'];
	$owner_id = $resp['owner_id'];

	// Get user credit
	$req2 = $bdd->query("SELECT credit FROM users WHERE id = $userId");
	$resp2 = $req2->fetch();
	$currentCredit = $resp2['credit'];
	$newCredit = $currentCredit - $price;
	if ($newCredit < 0) {
		return http_response_code(401);
	}

	if ($owner_id == null) {
		$res = $bdd->exec("UPDATE properties SET owner_id = $userId WHERE id = $propertyId");
		$res = $bdd->exec("UPDATE users SET credit = credit - $price WHERE id = $userId");

		if ($type == 'gare') {
			$bdd->exec("UPDATE users SET nbGares = nbGares + 1 WHERE id = $userId");
		}
		if ($type == 'compagnie') {
			$bdd->exec("UPDATE users SET nbCompagnies = nbCompagnies + 1 WHERE id = $userId");	
		}

		echo json_encode($res);
	} else {
		http_response_code(409);
	}

	$req->closeCursor();
	$req2->closeCursor();
}

?>