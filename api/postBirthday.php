<?php

if ($_POST['user'] && $_POST['player']) {

	$userId = $_POST['user'];
	$playerId = $_POST['player'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	$res = $bdd->exec("UPDATE users SET credit = credit - 10 WHERE id = $userId");
	$res2 = $bdd->exec("UPDATE users SET credit = credit + 10 WHERE id = $playerId");

	if ($res == 1 && $res2 == 2) {
		return http_response_code(200);
	}

	$qAmount->closeCursor();
}

?>