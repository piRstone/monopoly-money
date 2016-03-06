<?php

if ($_POST['user'] && $_POST['credit']) {

	$userId = $_POST['user'];
	$credit = $_POST['credit'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	$qAmount = $bdd->query("SELECT credit FROM users WHERE id = $userId");
	$amount = $qAmount->fetch();

	$newValue = $amount['credit'] + $credit;

	$res = $bdd->exec("UPDATE users SET credit = $newValue WHERE id = $userId");

	echo json_encode($res);

	$qAmount->closeCursor();
}

?>