<?php
include 'config.php';

if ($_GET['user']) {

	$userId = $_GET['user'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', $password);

	$res = $bdd->exec("UPDATE users SET credit = credit + 200 WHERE id = $userId");

	if ($res == 1) {
		return http_response_code(200);
	}
}

?>