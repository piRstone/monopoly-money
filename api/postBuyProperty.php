<?php
include 'config.php';

if ($_POST['user'] && $_POST['property']) {

	$userId = $_POST['user'];
	$propertyId = $_POST['property'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', $password);

	// Get property
	$req = $bdd->query("SELECT * FROM properties WHERE id = $propertyId");
	$resp = $req->fetch();
	$id = $resp['id'];
	$price = $resp['price'];
	$type = $resp['type'];
	$owner_id = $resp['owner_id'];
	$color = $resp['color'];

	// Get user credit
	$req2 = $bdd->query("SELECT credit FROM users WHERE id = $userId");
	$resp2 = $req2->fetch();
	$currentCredit = $resp2['credit'];
	$newCredit = $currentCredit - $price;
	if ($newCredit < 0) {
		return http_response_code(401);
	}

	if ($owner_id == null) {
		// Set property to user and retire credit
		$res = $bdd->exec("UPDATE properties SET owner_id = $userId WHERE id = $propertyId");
		$res = $bdd->exec("UPDATE users SET credit = credit - $price WHERE id = $userId");

		if ($type == 'gare') {
			$bdd->exec("UPDATE users SET nbGares = nbGares + 1 WHERE id = $userId");
		}
		if ($type == 'compagnie') {
			$bdd->exec("UPDATE users SET nbCompagnies = nbCompagnies + 1 WHERE id = $userId");
		}

		// Check if all properties are bought to double rental
		$req3 = $bdd->query("SELECT * FROM properties WHERE color = '$color' AND id != $id");
		$result = array();
		while ($data = $req3->fetch()) {
			array_push($result, $data);
		}
		$req3->closeCursor();

		$count = 0;
		foreach ($result as $r) {
			if ($r['owner_id'] != NULL && $r['owner_id'] == $userId) {
				$count++;
			} else {
				break;
			}
		}
		if ($count == count($result)) {
			$bdd->exec("UPDATE properties SET doubled = 1 WHERE id = $id");
			foreach ($result as $r) {
				$rid = $r['id'];
				$bdd->exec("UPDATE properties SET doubled = 1 WHERE id = $rid");
			}
		}

		echo json_encode($res);
	} else {
		http_response_code(409);
	}

	$req->closeCursor();
	$req2->closeCursor();
}

?>