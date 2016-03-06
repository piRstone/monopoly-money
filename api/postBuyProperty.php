<?php

if ($_POST['user'] && $_POST['property']) {

	$userId = $_POST['user'];
	$propertyId = $_POST['property'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	$res = $bdd->exec("UPDATE properties SET owner_id = $userId WHERE id = $propertyId");

	echo json_encode($res);

}

?>