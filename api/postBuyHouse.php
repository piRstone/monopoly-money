<?php

if ($_POST['user'] && $_POST['property']) {

	$userId = $_POST['user'];
	$propertyId = $_POST['property'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	// Get property
	$req = $bdd->query("SELECT * FROM properties WHERE id = $propertyId");
	$resp = $req->fetch();
	$price = $resp['house'];
	$nbHouses = $resp['nbHouses'];

	// Get user credit
	$req = $bdd->query("SELECT credit FROM users WHERE id = $userId");
	$resp = $req->fetch();
	$currentCredit = $resp['credit'];
	$newCredit = $currentCredit - $price;
	// Set new user credit
	$res = $bdd->exec("UPDATE users SET credit = $newCredit WHERE id = $userId");

	// Add new house to property
	$res = $bdd->exec("UPDATE properties SET nbHouses = nbHouses + 1 WHERE id = $propertyId");

	echo json_encode($res);

	$req->closeCursor();
}

?>