<?php
include 'config.php';

if ($_POST['user'] && $_POST['property']) {

	$userId = $_POST['user'];
	$propertyId = $_POST['property'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', $password);

	$qHypotheque = $bdd->query("SELECT hypotheque FROM properties WHERE id = $propertyId");
	$rHypotheque = $qHypotheque->fetch();
	$hypotheque = $rHypotheque['hypotheque'];

	$res = $bdd->exec("UPDATE properties SET nbHouses = 0, hypothecated = 1 WHERE id = $propertyId");
	$res2 = $bdd->exec("UPDATE users SET credit = credit + $hypotheque WHERE id = $userId");

	$qHypotheque->closeCursor();

	if ($res == 1 && $res2 == 2) {
		return http_response_code(200);
	}
}

?>