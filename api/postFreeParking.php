<?php

if ($_POST['user']) {

	$userId = $_POST['user'];

	$bdd = new PDO('mysql:host=localhost;dbname=monopoly;charset=utf8', 'root', '');

	$res = $bdd->query('SELECT amount FROM free_parking');
	$res2 = $res->fetch();
	$amount = $res2['amount'];

	$req = $bdd->exec("UPDATE users SET credit = credit + $amount WHERE id = $userId");
	$req2 = $bdd->exec("UPDATE free_parking SET amount = amount - $amount");

	$res->closeCursor();

	if ($req == 1 && $req2 == 1) {
		return http_response_code(200);
	}
}

?>